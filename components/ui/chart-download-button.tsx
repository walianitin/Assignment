"use client"

import { Download } from "lucide-react"
import { useState } from "react"

interface ChartDownloadButtonProps {
  chartRef: React.RefObject<HTMLDivElement | null>
  filename?: string
}

export function ChartDownloadButton({ chartRef, filename = "chart" }: ChartDownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadAsPNG = async () => {
    if (!chartRef.current || isDownloading) return
    setIsDownloading(true)

    try {
      const html2canvas = (await import("html2canvas")).default
      
      // Clone the element to avoid modifying the original
      const clone = chartRef.current.cloneNode(true) as HTMLElement
      clone.style.position = 'absolute'
      clone.style.left = '-9999px'
      document.body.appendChild(clone)
      
      // Replace any problematic colors in the clone
      const allElements = clone.querySelectorAll('*')
      allElements.forEach((el) => {
        const styles = window.getComputedStyle(el)
        const element = el as HTMLElement
        
        // Get computed colors and apply them directly
        if (styles.backgroundColor) {
          element.style.backgroundColor = styles.backgroundColor
        }
        if (styles.color) {
          element.style.color = styles.color
        }
        if (styles.borderColor) {
          element.style.borderColor = styles.borderColor
        }
      })

      const canvas = await html2canvas(clone, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
        removeContainer: true,
      })
      
      document.body.removeChild(clone)
      
      const link = document.createElement("a")
      link.download = `${filename}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Error downloading PNG:", error)
      // Fallback: try with SVG export
      fallbackDownload(filename, 'png')
    } finally {
      setIsDownloading(false)
    }
    setIsOpen(false)
  }

  const downloadAsJPG = async () => {
    if (!chartRef.current || isDownloading) return
    setIsDownloading(true)

    try {
      const html2canvas = (await import("html2canvas")).default
      
      const clone = chartRef.current.cloneNode(true) as HTMLElement
      clone.style.position = 'absolute'
      clone.style.left = '-9999px'
      document.body.appendChild(clone)
      
      const allElements = clone.querySelectorAll('*')
      allElements.forEach((el) => {
        const styles = window.getComputedStyle(el)
        const element = el as HTMLElement
        if (styles.backgroundColor) {
          element.style.backgroundColor = styles.backgroundColor
        }
        if (styles.color) {
          element.style.color = styles.color
        }
      })

      const canvas = await html2canvas(clone, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
      })
      
      document.body.removeChild(clone)
      
      const link = document.createElement("a")
      link.download = `${filename}.jpg`
      link.href = canvas.toDataURL("image/jpeg", 0.9)
      link.click()
    } catch (error) {
      console.error("Error downloading JPG:", error)
      fallbackDownload(filename, 'jpg')
    } finally {
      setIsDownloading(false)
    }
    setIsOpen(false)
  }

  const downloadAsPDF = async () => {
    if (!chartRef.current || isDownloading) return
    setIsDownloading(true)

    try {
      const html2canvas = (await import("html2canvas")).default
      const { jsPDF } = await import("jspdf")
      
      const clone = chartRef.current.cloneNode(true) as HTMLElement
      clone.style.position = 'absolute'
      clone.style.left = '-9999px'
      document.body.appendChild(clone)
      
      const allElements = clone.querySelectorAll('*')
      allElements.forEach((el) => {
        const styles = window.getComputedStyle(el)
        const element = el as HTMLElement
        if (styles.backgroundColor) {
          element.style.backgroundColor = styles.backgroundColor
        }
        if (styles.color) {
          element.style.color = styles.color
        }
      })

      const canvas = await html2canvas(clone, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
      })
      
      document.body.removeChild(clone)
      
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      })
      
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height)
      pdf.save(`${filename}.pdf`)
    } catch (error) {
      console.error("Error downloading PDF:", error)
      fallbackDownload(filename, 'pdf')
    } finally {
      setIsDownloading(false)
    }
    setIsOpen(false)
  }

  // Fallback for when html2canvas fails
  const fallbackDownload = (name: string, format: string) => {
    alert(`Unable to download as ${format.toUpperCase()}. Please try taking a screenshot instead.`)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 bg-white shadow-sm border border-gray-200"
        title="Download chart"
        disabled={isDownloading}
      >
        {isDownloading ? (
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Download size={16} />
        )}
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px]">
            <button
              onClick={downloadAsPNG}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
            >
              Download PNG
            </button>
            <button
              onClick={downloadAsJPG}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
            >
              Download JPG
            </button>
            <button
              onClick={downloadAsPDF}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
            >
              Download PDF
            </button>
          </div>
        </>
      )}
    </div>
  )
}

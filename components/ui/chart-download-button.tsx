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
    setIsOpen(false)

    try {
      const domtoimage = await import("dom-to-image-more")
      
      const dataUrl = await domtoimage.toPng(chartRef.current, {
        quality: 1,
        bgcolor: "#ffffff",
      })
      
      const link = document.createElement("a")
      link.download = `${filename}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error downloading PNG:", error)
      alert("Failed to download. Please try taking a screenshot instead.")
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadAsJPG = async () => {
    if (!chartRef.current || isDownloading) return
    setIsDownloading(true)
    setIsOpen(false)

    try {
      const domtoimage = await import("dom-to-image-more")
      
      const dataUrl = await domtoimage.toJpeg(chartRef.current, {
        quality: 0.95,
        bgcolor: "#ffffff",
      })
      
      const link = document.createElement("a")
      link.download = `${filename}.jpg`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error downloading JPG:", error)
      alert("Failed to download. Please try taking a screenshot instead.")
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadAsPDF = async () => {
    if (!chartRef.current || isDownloading) return
    setIsDownloading(true)
    setIsOpen(false)

    try {
      const domtoimage = await import("dom-to-image-more")
      const { jsPDF } = await import("jspdf")
      
      const dataUrl = await domtoimage.toPng(chartRef.current, {
        quality: 1,
        bgcolor: "#ffffff",
      })
      
      const img = new Image()
      img.src = dataUrl
      
      await new Promise((resolve) => {
        img.onload = resolve
      })
      
      const pdf = new jsPDF({
        orientation: img.width > img.height ? "landscape" : "portrait",
        unit: "px",
        format: [img.width, img.height],
      })
      
      pdf.addImage(dataUrl, "PNG", 0, 0, img.width, img.height)
      pdf.save(`${filename}.pdf`)
    } catch (error) {
      console.error("Error downloading PDF:", error)
      alert("Failed to download. Please try taking a screenshot instead.")
    } finally {
      setIsDownloading(false)
    }
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
              PNG
            </button>
            <button
              onClick={downloadAsJPG}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
            >
              JPG
            </button>
            <button
              onClick={downloadAsPDF}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
            >
              PDF
            </button>
          </div>
        </>
      )}
    </div>
  )
}

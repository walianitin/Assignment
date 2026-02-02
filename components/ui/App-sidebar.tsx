"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useFilterContext } from "@/lib/context/filter-context"
import { fetchIndicatorData, IndicatorType } from "@/lib/api/indicators"
import { Filter, BarChart3, Info, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

const filters = [
  "Business Location",
  "Utility Services",
  "Labor",
  "Financial Services",
  "International Trade",
  "Taxation",
  "Dispute Resolution",
  "Market Competition",
  "Business Insolvency",
]

export function AppSidebar() {
  const { 
    selectedFilters, 
    setSelectedFilters, 
    selectedCountries,
    setIndicatorData,
    setIsLoading 
  } = useFilterContext();

  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const toggleFilter = async (item: string) => {
    const isRemoving = selectedFilters.includes(item);
    
    setSelectedFilters((prev) =>
      prev.includes(item)
        ? prev.filter((f) => f !== item)
        : [...prev, item]
    );

    // Fetch data when adding a filter
    if (!isRemoving && selectedCountries.length > 0) {
      setIsLoading(true);
      try {
        const data = await fetchIndicatorData(item as IndicatorType);
        setIndicatorData((prev) => ({
          ...prev,
          [item]: data,
        }));
      } catch (error) {
        console.error(`Error fetching ${item}:`, error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Sidebar>
      {/* Main Header */}
      <SidebarHeader className="border-b pb-4 mt-2">
        <div className="flex items-center gap-2 px-2">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">World Bank </span>
        </div>
        <p className="text-xs text-gray-500 px-2 mt-1">World Bank Business Ready Indicators</p>
      </SidebarHeader>

      <SidebarContent>
        {/* Filters Section - Collapsible */}
        <SidebarGroup>
          <div className="px-3 py-2 m-2">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center justify-between w-full mb-3 hover:bg-gray-100 rounded-md p-1 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Add Filters
                </span>
              </div>
              {isFiltersOpen ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
            
            {isFiltersOpen && (
              <div className="flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-200">
                {filters.map((item) => {
                  const active = selectedFilters.includes(item)

                  return (
                    <SidebarMenuButton
                      key={item}
                      onClick={() => toggleFilter(item)}
                      className={`w-full justify-start rounded-md px-3 py-2 text-sm transition-all duration-200
                        ${active 
                          ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500 font-medium" 
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-l-4 border-transparent"
                        }
                      `}
                    >
                      {item}
                    </SidebarMenuButton>
                  )
                })}
              </div>
            )}
          </div>
        </SidebarGroup>

        {/* Info Section - Collapsible */}
        <SidebarGroup className="mt-4">
          <div className="px-3 py-2">
            <button
              onClick={() => setIsInfoOpen(!isInfoOpen)}
              className="flex items-center justify-between w-full mb-3 hover:bg-gray-100 rounded-md p-1 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Information
                </span>
              </div>
              {isInfoOpen ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
            
            {isInfoOpen && (
              <div className="bg-gray-50 rounded-md p-3 text-xs text-gray-600 space-y-2 animate-in slide-in-from-top-2 duration-200">
                <p>
                  <strong>How to use:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Select filters from above</li>
                  <li>Click on countries on the map</li>
                  <li>View comparison data below</li>
                </ul>
              </div>
            )}
          </div>
        </SidebarGroup>

        {/* Selected Summary */}
        <SidebarGroup className="mt-4">
          <div className="px-3 py-2">
            <div className="bg-blue-50 rounded-md p-3 text-xs">
              <p className="font-medium text-blue-800 mb-1">Selected:</p>
              <p className="text-blue-600">
                {selectedFilters.length} filter{selectedFilters.length !== 1 ? 's' : ''} • {selectedCountries.length} {selectedCountries.length !== 1 ? 'countries' : 'country'}
              </p>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t pt-3">
        <div className="px-3 py-2 text-xs text-gray-400 text-center">
          Data Source: World Bank B-Ready 2025
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

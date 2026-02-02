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
      <SidebarHeader>
        <SidebarMenuButton>Filters</SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className="flex flex-col gap-2 p-2">
            {filters.map((item) => {
              const active = selectedFilters.includes(item)

              return (
                <SidebarMenuButton
                  key={item}
                  onClick={() => toggleFilter(item)}
                  className={`w-full justify-start rounded-lg transition
                    ${active ? "bg-gray-500" : "bg-muted"}
                  `}
                >
                  {item}
                </SidebarMenuButton>
              )
            })}
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}

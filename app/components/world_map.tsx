"use client";

import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { X } from "lucide-react";
import { useFilterContext } from "@/lib/context/filter-context";
import { fetchIndicatorData, IndicatorType } from "@/lib/api/indicators";
import { getApiCountryName } from "@/lib/utils/country-mapping";

// Type for the simplified data we want to display
interface CountryIndicatorData {
  countryName: string;
  value: string;
}

// Add this type definition near the top with other interfaces
interface ApiDataItem {
  EconomyName: string;
  DatapointValue: string;
  EconomyCode?: string;
  DatapointLevel?: string;
  DataPointName?: string;
  IndicatorName?: string;
}

export default function WorldMap() {
  const chartRef = useRef(null);
  const polygonSeriesRef = useRef<am5map.MapPolygonSeries | null>(null);

  const {
    selectedFilters,
    selectedCountries,
    setSelectedCountries,
    indicatorData,
    setIndicatorData,
    isLoading,
    setIsLoading,
  } = useFilterContext();

  // Fetch data when countries or filters change
  useEffect(() => {
    const fetchData = async () => {
      if (selectedCountries.length > 0 && selectedFilters.length > 0) {
        setIsLoading(true);
        try {
          const promises = selectedFilters.map((filter) =>
            fetchIndicatorData(filter as IndicatorType)
          );
          const results = await Promise.all(promises);

          const newData: Record<string, unknown[]> = {};
          selectedFilters.forEach((filter, index) => {
            newData[filter] = results[index];
          });

          setIndicatorData(newData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedCountries, selectedFilters, setIndicatorData, setIsLoading]);

  // Filter and extract only country name and datapoint value
  const getFilteredData = (): Record<string, CountryIndicatorData[]> => {
    const filtered: Record<string, CountryIndicatorData[]> = {};

    // Convert selected map country names to API country names
    const apiCountryNames = selectedCountries.map(getApiCountryName);

    Object.entries(indicatorData).forEach(([indicator, data]) => {
      if (Array.isArray(data)) {
        const countryMap = new Map<string, CountryIndicatorData>();

        (data as ApiDataItem[])
          .filter((item) => apiCountryNames.includes(item.EconomyName))
          .forEach((item) => {
            if (!countryMap.has(item.EconomyName)) {
              countryMap.set(item.EconomyName, {
                countryName: item.EconomyName,
                value: parseFloat(item.DatapointValue).toFixed(2),
              });
            }
          });

        filtered[indicator] = Array.from(countryMap.values());
      }
    });

    return filtered;
  };

  const filteredData = getFilteredData();
  const hasAnyData = Object.values(filteredData).some((data) => data.length > 0);

  // Remove country from selection
  const removeCountry = (countryName: string) => {
    setSelectedCountries((prev) => prev.filter((c) => c !== countryName));

    if (polygonSeriesRef.current) {
      polygonSeriesRef.current.mapPolygons.each((polygon) => {
        const dataContext = polygon.dataItem?.dataContext as { name?: string } | undefined;
        if (dataContext?.name === countryName) {
          polygon.set("active", false);
        }
      });
    }
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedCountries([]);
    if (polygonSeriesRef.current) {
      polygonSeriesRef.current.mapPolygons.each((polygon) => {
        polygon.set("active", false);
      });
    }
  };

  useEffect(() => {
    const root = am5.Root.new("chartRef");

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        projection: am5map.geoNaturalEarth1(),
        minZoomLevel: 15,
        maxZoomLevel: 1,
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeriesRef.current = polygonSeries;

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0x84a9ac),
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x3b6978),
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: am5.color(0x204051),
    });

    // Fix: Use a separate click handler without toggleKey
    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      const target = ev.target;
      const dataItem = target.dataItem;
      const dataContext = dataItem?.dataContext as { name?: string } | undefined;
      const countryName = dataContext?.name;

      if (countryName) {
        // Toggle active state manually
        const isActive = target.get("active");
        target.set("active", !isActive);

        setSelectedCountries((prev) => {
          if (prev.includes(countryName)) {
            return prev.filter((c) => c !== countryName);
          } else {
            return [...prev, countryName];
          }
        });
      }
    });

    return () => {
      root.dispose();
    };
  }, [setSelectedCountries]);

  return (
    <div className="w-full">
      {/* Selected Countries */}
      {selectedCountries.length > 0 && (
        <div className="mb-4 p-3 bg-slate-100 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Selected Countries ({selectedCountries.length}):</span>
            <button
              onClick={clearAllSelections}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCountries.map((country, index) => (
              <span
                key={`${country}-${index}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {country}
                <button
                  onClick={() => removeCountry(country)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mb-4 p-3 bg-yellow-100 rounded-lg text-center">
          Loading data...
        </div>
      )}

      {/* Display Filtered Data */}
      {selectedCountries.length > 0 && selectedFilters.length > 0 && !isLoading && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <span className="font-semibold mb-2 block">Data for Selected Countries:</span>
          {!hasAnyData ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <span className="text-red-600 font-medium">
                Data not available for the selected countries
              </span>
            </div>
          ) : (
            Object.entries(filteredData).map(([indicator, data]) => (
              <div key={indicator} className="mb-3">
                <span className="text-sm font-medium text-gray-700">{indicator}:</span>
                <div className="mt-1 space-y-1">
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <div
                        key={`${indicator}-${item.countryName}-${index}`}
                        className="flex justify-between items-center bg-white p-2 rounded text-sm"
                      >
                        <span className="font-medium">{item.countryName}</span>
                        <span className="text-blue-600 font-semibold">{item.value}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm bg-gray-50 p-2 rounded">
                      No data available for this indicator
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div
        ref={chartRef}
        id="chartRef"
        style={{ width: "100%", height: "500px" }}
      />
    </div>
  );
}

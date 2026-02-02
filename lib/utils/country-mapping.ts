// Map from amCharts country names to World Bank API country names
export const countryNameMapping: Record<string, string> = {
  "United States of America": "United States",
  "Russia": "Russian Federation",
  "United Kingdom": "United Kingdom",
  "South Korea": "Korea, Rep.",
  "North Korea": "Korea, Dem. People's Rep.",
  "Iran": "Iran, Islamic Rep.",
  "Syria": "Syrian Arab Republic",
  "Venezuela": "Venezuela, RB",
  "Egypt": "Egypt, Arab Rep.",
  "Yemen": "Yemen, Rep.",
  "Democratic Republic of the Congo": "Congo, Dem. Rep.",
  "Republic of the Congo": "Congo, Rep.",
  "Tanzania": "Tanzania",
  "Czech Republic": "Czechia",
  "Slovakia": "Slovak Republic",
  "Ivory Coast": "Côte d'Ivoire",
  "Laos": "Lao PDR",
  "Vietnam": "Viet Nam",
  "Brunei": "Brunei Darussalam",
  "Gambia": "Gambia, The",
  "Bahamas": "Bahamas, The",
  "Kyrgyzstan": "Kyrgyz Republic",
  "Macedonia": "North Macedonia",
  "Turkey": "Türkiye",
  "Cape Verde": "Cabo Verde",
  "East Timor": "Timor-Leste",
  "Swaziland": "Eswatini",
};

// Get API-compatible country name
export function getApiCountryName(mapName: string): string {
  return countryNameMapping[mapName] || mapName;
}

// Get map-compatible country name (reverse lookup)
export function getMapCountryName(apiName: string): string {
  const entry = Object.entries(countryNameMapping).find(([, api]) => api === apiName);
  return entry ? entry[0] : apiName;
}

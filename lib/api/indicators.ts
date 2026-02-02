export type IndicatorType =
  | "Business Entry"
  | "Utility Services"
  | "Business Location"
  | "Labor"
  | "Financial Services"
  | "International Trade"
  | "Taxation"
  | "Dispute Resolution"
  | "Market Competition"
  | "Business Insolvency";

// Main fetch function - calls local API route to avoid CORS
export async function fetchIndicatorData(indicator: IndicatorType) {
  const encodedIndicator = encodeURIComponent(indicator);
  const url = `/api/indicators?indicator=${encodedIndicator}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data for indicator: ${indicator}`);
  }

  return response.json();
}

// Individual helper functions
export const fetchBusinessEntry = () => fetchIndicatorData("Business Entry");
export const fetchUtilityServices = () => fetchIndicatorData("Utility Services");
export const fetchBusinessLocation = () => fetchIndicatorData("Business Location");
export const fetchLabor = () => fetchIndicatorData("Labor");
export const fetchFinancialServices = () => fetchIndicatorData("Financial Services");
export const fetchInternationalTrade = () => fetchIndicatorData("International Trade");
export const fetchTaxation = () => fetchIndicatorData("Taxation");
export const fetchDisputeResolution = () => fetchIndicatorData("Dispute Resolution");
export const fetchMarketCompetition = () => fetchIndicatorData("Market Competition");
export const fetchBusinessInsolvency = () => fetchIndicatorData("Business Insolvency");

// Mapping for dynamic usage
export const indicatorMap: Record<string, () => Promise<unknown>> = {
  "Business Entry": fetchBusinessEntry,
  "Utility Services": fetchUtilityServices,
  "Business Location": fetchBusinessLocation,
  "Labor": fetchLabor,
  "Financial Services": fetchFinancialServices,
  "International Trade": fetchInternationalTrade,
  "Taxation": fetchTaxation,
  "Dispute Resolution": fetchDisputeResolution,
  "Market Competition": fetchMarketCompetition,
  "Business Insolvency": fetchBusinessInsolvency,
};

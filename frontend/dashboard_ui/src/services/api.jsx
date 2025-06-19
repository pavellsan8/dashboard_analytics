const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};

export const getKpiData = () => fetchData('/kpi-card-data');
export const getTopRegionData = (customEndpoint = '/top-region-data') => fetchData(customEndpoint);
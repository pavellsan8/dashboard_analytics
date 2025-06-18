const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getKpiData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/kpi-card-data`);
    if (!response.ok) {
      throw new Error('Failed to fetch KPI data');
    }
    const result = await response.json();
    return result.data; 
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    return [];
  }
};
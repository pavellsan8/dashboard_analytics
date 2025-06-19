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
export const getCustomerInsightData = (customEndpoint = '/customer-segment-data') => fetchData(customEndpoint);
export const getCategorySalesData = () => fetchData('/product-performance/category-stats');
export const getSubCategorySalesData = () => fetchData('/product-performance/sub-category-stats');
export const getTopProductsData = () => (customEndpoint = '/product-performance/top-products') => fetchData(customEndpoint);
export const getTotalSalesData = () => fetchData('/sales-trend/total-sales-stats');
export const getTotalOrderData = () => fetchData('/sales-trend/total-order-stats');
export const getShipModeData = () => fetchData('/sales-trend/ship-mode-stats');
export const getTransactionDetailData = () => fetchData('/detail-transactions');
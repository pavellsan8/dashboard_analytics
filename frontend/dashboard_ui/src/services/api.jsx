const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchData = async (endpoint, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};

export const getKpiData = () => fetchData('/kpi-card-data');
export const getTopRegionData = (params = {}) => fetchData('/top-region-data', params);
export const getCustomerInsightData = (params = {}) => fetchData('/customer-segment-data', params);
export const getCategorySalesData = () => fetchData('/product-performance/category-stats');
export const getSubCategorySalesData = () => fetchData('/product-performance/sub-category-stats');
export const getTopProductsData = (params = {}) => fetchData('/product-performance/top-products', params);
export const getTotalSalesData = () => fetchData('/sales-trend/total-sales-stats');
export const getTotalOrderData = () => fetchData('/sales-trend/total-order-stats');
export const getShipModeData = () => fetchData('/sales-trend/ship-mode-stats');
export const getTransactionDetailData = () => fetchData('/detail-transactions');
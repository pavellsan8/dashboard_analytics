import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';

const formatTitle = (value) => {
  const titles = {
    total_sales: 'Total Sales',
    total_customer: 'Total Customers', 
    total_order: 'Total Orders',
    average_order_value: 'Average Order Value'
  };
  return titles[value] || value;
};

const getIcon = (value) => {
  const iconMap = {
    total_sales: <DollarSign size={24} />,
    total_customer: <Users size={24} />,
    total_order: <ShoppingCart size={24} />,
    average_order_value: <TrendingUp size={24} />
  };
  return iconMap[value] || <TrendingUp size={24} />;
};

const formatValue = (value, type) => {
  if (type === 'total_sales' || type === 'average_order_value') {
    return value.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    });
  }
  return value.toLocaleString();
};

export const formatKpiData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) {
    return [];
  }
  
  return apiData.map((item) => ({
    key: item.value,
    title: formatTitle(item.value),
    value: formatValue(item.year2018, item.value),
    change: item.growthFormatted,
    isPositive: item.isPositive,
    icon: getIcon(item.value)
  }));
};
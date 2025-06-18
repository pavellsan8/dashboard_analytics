// src/components/KPI/KPIOverview.jsx
import KPICard from './KPICard';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';

const KPIOverview = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">Overview</h2>
        <div className="text-sm text-gray-500">Showing yearly data</div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((item, index) => (
          <KPICard
            key={index}
            title={item.title}
            value={item.value}
            change={item.change}
            isPositive={item.isPositive}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default KPIOverview;

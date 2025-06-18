// src/components/KPI/KPICard.jsx
const KPICard = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
            <div className="text-blue-500">
              {icon}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
        <span className={`text-sm ml-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          vs previous period
        </span>
      </div>
    </div>
  );
};

export default KPICard;
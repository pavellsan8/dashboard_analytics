const KPICard = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            <span
              className={`text-sm font-medium ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change}
            </span>
            <span
              className={`text-sm ml-1 ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              vs previous period
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          <div className={isPositive ? 'text-green-600' : 'text-red-600'}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
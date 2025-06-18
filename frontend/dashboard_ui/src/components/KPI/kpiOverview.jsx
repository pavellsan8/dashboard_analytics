import React, { useState, useEffect } from 'react';
import KPICard from '../../components/KPI/kpiCard';
import { getKpiData } from '../../services/api';
import { formatKpiData } from '../../utils/formatKpiCard';

const KPIOverview = () => {
  const [kpiData, setKpiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKpiData = async () => {
      setLoading(true);
      try {
        const apiData = await getKpiData();
        const formattedData = formatKpiData(apiData);
        setKpiData(formattedData);
      } catch (error) {
        console.error('Error fetching KPI data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKpiData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((item) => (
          <KPICard
            key={item.key}
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
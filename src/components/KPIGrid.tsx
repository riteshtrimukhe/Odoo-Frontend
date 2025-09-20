import React, { useState, useEffect } from 'react';
import { getMockKPIs } from '../services/mockApi';

interface KPIItem {
  label: string;
  valueKey: string;
}

interface KPIGridProps {
  items: KPIItem[];
}

export const KPIGrid: React.FC<KPIGridProps> = ({ items }) => {
  const [kpiData, setKpiData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKPIs();
  }, []);

  const loadKPIs = async () => {
    try {
      const data = getMockKPIs();
      setKpiData(data);
    } catch (error) {
      console.error('Error loading KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading KPIs...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-black mb-2">
            {kpiData[item.valueKey] || 0}
          </div>
          <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};
import React from 'react';
import { Table } from '../components/Table';

export const WorkCenterList: React.FC = () => {
  const columns = [
    { key: "name", label: "Work Center" },
    { key: "capacityPerDay", label: "Capacity (min/day)" },
    { key: "currentLoad", label: "Current Load" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Work Centers</h1>
        <p className="text-gray-600">Monitor work center capacity and current load</p>
      </div>
      
      <Table
        columns={columns}
        dataEndpoint="/mock/work-centers"
      />
    </div>
  );
};
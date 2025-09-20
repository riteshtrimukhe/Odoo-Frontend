import React, { useState, useEffect } from 'react';
import { Table } from '../components/Table';
import { Filters } from '../components/Filters';
import { Sidebar } from '../components/Sidebar';
import { ProfileDropdown } from '../components/ProfileDropdown';
import { Search } from 'lucide-react';
import { mockApiCall } from '../services/mockApi';

export const WorkOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [workOrders, setWorkOrders] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    loadWorkOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [workOrders, searchTerm, filters]);

  const loadWorkOrders = async () => {
    try {
      const response = await mockApiCall('/mock/work-orders');
      setWorkOrders((response as any).data);
    } catch (error) {
      console.error('Error loading work orders:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...workOrders];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(wo => 
        wo.operationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wo.workCenterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wo.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(wo => wo.status === filters.status);
    }

    // Apply work center filter
    if (filters.workCenter) {
      filtered = filtered.filter(wo => wo.workCenterName === filters.workCenter);
    }

    setFilteredData(filtered);
  };

  const columns = [
    { key: "operationName", label: "Operation" },
    { key: "workCenterName", label: "Work Center" },
    { key: "productName", label: "Product" },
    { key: "quantity", label: "Quantity" },
    { key: "expectedDuration", label: "Expected Duration" },
    { key: "realDuration", label: "Real Duration" },
    { key: "status", label: "Status" }
  ];

  const filterOptions = [
    {
      name: "status",
      type: "select",
      options: ["To Do", "In-Progress", "Done", "Cancelled"]
    },
    {
      name: "workCenter",
      type: "select",
      options: ["Cutting", "Assembly", "Painting", "Quality Control"]
    },
    {
      name: "dateRange",
      type: "dateRange"
    }
  ];

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div></div>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-black mx-auto">Work Orders Analysis</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <ProfileDropdown />
            </div>
          </div>
        </div>

        {/* Work Orders Content */}
        <div className="flex-1 p-6 bg-white">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Allow user to search based on operation work centers etc"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:border-black focus:outline-none text-sm"
            />
          </div>

          {/* Filters */}
          <Filters 
            filters={filterOptions}
            onFilterChange={handleFilterChange}
          />

          {/* Work Orders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Work Orders</h2>
            </div>
            
            <Table
              columns={columns}
              data={filteredData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
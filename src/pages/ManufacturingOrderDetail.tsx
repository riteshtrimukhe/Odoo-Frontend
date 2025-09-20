import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApiCall } from '../services/mockApi';
import { Table } from '../components/Table';
import { AppLayout } from '../components/AppLayout';
import { ArrowLeft, Play, Square } from 'lucide-react';

export const ManufacturingOrderDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mo, setMo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMO();
  }, [id]);

  const loadMO = async () => {
    try {
      const response = await mockApiCall(`/mock/manufacturing-orders/${id}`);
      setMo((response as any).data);
    } catch (error) {
      console.error('Error loading MO:', error);
    } finally {
      setLoading(false);
    }
  };

  const workOrderColumns = [
    { key: "operationName", label: "Operation" },
    { key: "workCenterName", label: "Work Center" },
    { key: "plannedDuration", label: "Duration" },
    { key: "actualDuration", label: "Real Duration" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions", render: "buttons" }
  ];

  const bomColumns = [
    { key: "componentName", label: "Component" },
    { key: "requiredQty", label: "Req. Qty" },
    { key: "onHandQty", label: "In-Stock" },
    { key: "shortageQty", label: "Shortage" },
    { key: "actions", label: "Actions", render: "buttons" }
  ];

  if (loading) {
    return (
      <AppLayout title="Manufacturing Order Details">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-500">Loading...</span>
        </div>
      </AppLayout>
    );
  }

  if (!mo) {
    return (
      <AppLayout title="Manufacturing Order Details">
        <div className="text-center py-12">
          <p className="text-red-600">Manufacturing Order not found</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Manufacturing Order Details">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            className="flex items-center gap-2 px-4 py-2 text-black hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-black">{mo.moNumber}</h1>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Play size={16} />
              Start
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Square size={16} />
              Cancel
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Finished Product</label>
              <span className="text-gray-900">{mo.productName}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Quantity</label>
              <span className="text-gray-900">{mo.quantity}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Schedule Date</label>
              <span className="text-gray-900">{new Date(mo.scheduleDate).toLocaleDateString()}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                mo.status === 'In-Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {mo.status}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-black mb-4">Work Orders</h2>
            <Table
              columns={workOrderColumns}
              dataEndpoint={`/mock/manufacturing-orders/${id}/work-orders`}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-4">Bill of Materials</h2>
            <Table
              columns={bomColumns}
              dataEndpoint={`/mock/manufacturing-orders/${id}/bom`}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
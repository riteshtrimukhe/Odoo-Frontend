import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, User, Home, Package, Settings, FileText, BarChart3, LogOut } from 'lucide-react';
import { getManufacturingOrdersByStatus } from '../data/manufacturingOrders';
import { getKPIByStatus } from '../data/kpiData';

type StatusTab = 'All' | 'Draft' | 'Confirmed' | 'In-Progress' | 'To Close' | 'Not Assigned' | 'Late';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<StatusTab>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [manufacturingOrders, setManufacturingOrders] = useState<any[]>([]);

  const sidebarItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Manufacturing Orders', path: '/', icon: Package },
    { name: 'Work Centers', path: '/work-centers', icon: Settings },
    { name: 'Stock Ledger', path: '/stock-ledger', icon: FileText },
    { name: 'Reports', path: '/reports', icon: BarChart3 }
  ];

  const statusTabs: StatusTab[] = ['All', 'Draft', 'Confirmed', 'In-Progress', 'To Close', 'Not Assigned', 'Late'];

  useEffect(() => {
    const orders = getManufacturingOrdersByStatus(activeTab);
    setManufacturingOrders(orders);
  }, [activeTab]);

  const filteredOrders = manufacturingOrders.filter(order =>
    order.moNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewMO = () => {
    navigate('/manufacturing-orders/new');
  };

  const handleRowClick = (id: number) => {
    navigate(`/manufacturing-orders/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Black Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
         <img src="/ordio-logo-white.gif" alt="Ordio" className="" />
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 p-3 mb-2 rounded cursor-pointer transition-colors ${
                  item.name === 'Dashboard' 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <IconComponent size={20} />
                <span>{item.name}</span>
              </div>
            );
          })}
        </nav>
        
        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 p-3 text-gray-300">
            <User size={20} />
            <span className="text-sm">Administrator</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded cursor-pointer transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div></div>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-black mx-auto">Manufacturing Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <User size={20} className="text-gray-600" />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 bg-white">
          {/* New Manufacturing Order Button */}
          <div className="flex items-center gap-2 mb-4">
            <button 
              className="flex items-center gap-2 px-3 py-1 border border-black rounded text-black hover:bg-black hover:text-white transition-colors"
              onClick={handleNewMO}
            >
              <Plus size={16} />
              <span className="text-sm">New</span>
              <span className="text-xs">Manufacturing Order</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded text-black placeholder-gray-400 focus:border-black focus:outline-none text-sm"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded text-sm border transition-colors ${
                  activeTab === tab
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900'
                }`}
              >
                {getKPIByStatus(tab)} {tab}
              </button>
            ))}
          </div>

          {/* Status Filter Display */}
          <div className="flex gap-4 mb-4">
            <div className="flex gap-2">
              <span className="text-sm text-gray-600">All</span>
              <span className="text-sm text-gray-600">My</span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded border border-gray-300 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-3 text-sm text-gray-700 font-medium">Reference</th>
                  <th className="text-left p-3 text-sm text-gray-700 font-medium">Start Date</th>
                  <th className="text-left p-3 text-sm text-gray-700 font-medium">Finished Product</th>
                  <th className="text-left p-3 text-sm text-gray-700 font-medium">Component Status</th>
                  <th className="text-left p-3 text-sm text-gray-700 font-medium">Quantity</th>
                  <th className="text-left p-3 text-sm text-gray-700 font-medium">Unit</th>
                  <th className="text-left p-3 text-sm text-gray-700 font-medium">State</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr 
                    key={order.id}
                    onClick={() => handleRowClick(order.id)}
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="p-3 text-sm text-gray-900">{order.reference}</td>
                    <td className="p-3 text-sm text-gray-900">{order.startDate}</td>
                    <td className="p-3 text-sm text-gray-900">{order.finishedProduct}</td>
                    <td className="p-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.componentStatus === 'Available' 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {order.componentStatus}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-900">{order.quantity.toFixed(2)}</td>
                    <td className="p-3 text-sm text-gray-900">{order.unitOfMeasure}</td>
                    <td className="p-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        order.status === 'In-Progress' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                        order.status === 'Draft' ? 'bg-gray-100 text-gray-800 border border-gray-200' :
                        order.status === 'To Close' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                        order.status === 'Late' ? 'bg-red-100 text-red-800 border border-red-200' :
                        'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        {order.state}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, List, LayoutGrid } from 'lucide-react';
import { AppLayout } from '../components/AppLayout';
import { getBillsOfMaterials } from '../data/billsOfMaterials';

interface BillOfMaterial {
  id: number;
  finishedProduct: string;
  reference: string;
  quantity?: number;
}

export const BillsOfMaterials: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [bills, setBills] = useState<BillOfMaterial[]>([]);
  const [filteredBills, setFilteredBills] = useState<BillOfMaterial[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  useEffect(() => {
    const data = getBillsOfMaterials();
    setBills(data);
    setFilteredBills(data);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBills(bills);
    } else {
      const filtered = bills.filter(bill => 
        bill.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.finishedProduct.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBills(filtered);
    }
  }, [searchTerm, bills]);

  const handleSearch = () => {
    // Search functionality is handled by useEffect on searchTerm change
    console.log('Search triggered for:', searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleNewBOM = () => {
    navigate('/bills-of-materials/new');
  };

  return (
    <AppLayout title="Bills of Materials">
      <div className="max-w-7xl mx-auto">
        {/* Header with New Button */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleNewBOM}
            className="flex items-center gap-2 px-3 py-1 border border-black text-black rounded hover:bg-black hover:text-white transition-colors"
          >
            <span className="text-sm font-medium">New</span>
          </button>
          
          {/* Search Section */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black w-64"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="p-2 text-black border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
              title="Search"
            >
              <Search size={20} />
            </button>
            
            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-md overflow-hidden ml-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="List View"
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-2 transition-colors ${
                  viewMode === 'kanban'
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="Kanban View"
              >
                <LayoutGrid size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Table/Kanban View */}
        {viewMode === 'list' ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Finished Product</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Reference</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.length > 0 ? (
                  filteredBills.map((bill) => (
                    <tr 
                      key={bill.id} 
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="p-4 text-sm text-gray-900">{bill.finishedProduct}</td>
                      <td className="p-4 text-sm text-gray-900">{bill.reference}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="p-8 text-center text-gray-500">
                      {searchTerm ? 'No bills of materials found matching your search.' : 'No bills of materials available.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBills.length > 0 ? (
              filteredBills.map((bill) => (
                <div 
                  key={bill.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md cursor-pointer transition-all hover:border-gray-300"
                >
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 text-sm">{bill.finishedProduct}</h3>
                    <p className="text-xs text-gray-600">Reference: {bill.reference}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        BOM
                      </span>
                      <div className="text-xs text-gray-500">
                        {bill.quantity && `Qty: ${bill.quantity}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                <LayoutGrid size={48} className="mb-4 text-gray-300" />
                <p>{searchTerm ? 'No bills of materials found matching your search.' : 'No bills of materials available.'}</p>
              </div>
            )}
          </div>
        )}

        {/* Results Summary */}
        {searchTerm && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredBills.length} of {bills.length} bills of materials
          </div>
        )}
      </div>
    </AppLayout>
  );
};
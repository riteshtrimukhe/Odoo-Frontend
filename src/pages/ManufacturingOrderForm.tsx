import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { AppLayout } from '../components/AppLayout';

export const ManufacturingOrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    moNumber: 'MO-000001',
    finishedProduct: '',
    quantity: '',
    units: 'Units',
    billOfMaterials: '',
    scheduleDate: '',
    assignee: '',
    state: 'Draft'
  });

  const [components, setComponents] = useState([
    { name: '', availability: '', toConsume: '', units: '' }
  ]);

  const [workOrders, setWorkOrders] = useState([
    { name: '', assignee: '', scheduleDate: '' }
  ]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleComponentChange = (index: number, field: string, value: string) => {
    const updatedComponents = [...components];
    updatedComponents[index] = { ...updatedComponents[index], [field]: value };
    setComponents(updatedComponents);
  };

  const addComponent = () => {
    setComponents([...components, { name: '', availability: '', toConsume: '', units: '' }]);
  };

  const handleStateChange = (newState: string) => {
    setFormData(prev => ({ ...prev, state: newState }));
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <AppLayout title="Manufacturing Order">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Form Header with State Buttons */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">When clicked on</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 border border-red-200 rounded text-sm">New</span>
              </div>
              <div className="flex gap-2">
                <button className={`px-3 py-1 rounded text-sm border transition-colors ${
                  formData.state === 'Draft' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-700 hover:border-black'
                }`}>Draft</button>
                <button className={`px-3 py-1 rounded text-sm border transition-colors ${
                  formData.state === 'Confirmed' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-700 hover:border-black'
                }`}>Confirmed</button>
                <button className={`px-3 py-1 rounded text-sm border transition-colors ${
                  formData.state === 'In-Progress' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-700 hover:border-black'
                }`}>In-Progress</button>
                <button className={`px-3 py-1 rounded text-sm border transition-colors ${
                  formData.state === 'To Close' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-700 hover:border-black'
                }`}>To Close</button>
                <button className={`px-3 py-1 rounded text-sm border transition-colors ${
                  formData.state === 'Done' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-700 hover:border-black'
                }`}>Done</button>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="border border-red-500 rounded p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Manufacturing Order</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm</label>
                  <input
                    type="text"
                    value={formData.moNumber}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Finished product *</label>
                  <input
                    type="text"
                    name="finishedProduct"
                    value={formData.finishedProduct}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-black focus:outline-none"
                    placeholder="Select finished product..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
                    <select
                      name="units"
                      value={formData.units}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-black focus:outline-none"
                    >
                      <option value="Units">Units</option>
                      <option value="Pieces">Pieces</option>
                      <option value="Meters">Meters</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill of Material</label>
                  <input
                    type="text"
                    name="billOfMaterials"
                    value={formData.billOfMaterials}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date*</label>
                  <input
                    type="date"
                    name="scheduleDate"
                    value={formData.scheduleDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-black focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                  <input
                    type="text"
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Components Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Components</h3>
              <div className="border border-gray-300 rounded overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Components</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Availability</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">To Consume</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {components.map((component, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="p-3">
                          <input
                            type="text"
                            value={component.name}
                            onChange={(e) => handleComponentChange(index, 'name', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Add a product"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={component.availability}
                            onChange={(e) => handleComponentChange(index, 'availability', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={component.toConsume}
                            onChange={(e) => handleComponentChange(index, 'toConsume', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={component.units}
                            onChange={(e) => handleComponentChange(index, 'units', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-3 border-t border-gray-200">
                  <button
                    onClick={addComponent}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={16} />
                    <span className="text-sm">Add a product</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Work Orders Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Work Orders</h3>
              <div className="border border-gray-300 rounded p-4 bg-gray-50">
                <p className="text-gray-600 text-sm">Work orders will be generated based on the selected Bill of Materials</p>
              </div>
            </div>
          </div>

          {/* State Information */}
          <div className="bg-gray-50 p-4 rounded border">
            <h3 className="font-semibold mb-2">State Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Draft:</strong> When New MO is created and not yet clicked on confirm button</p>
              <p><strong>Confirmed:</strong> When Click on Confirmed Button</p>
              <p><strong>In-Progress:</strong> When Clicked on Start Button or Timer in any work order is started</p>
              <p><strong>To Close:</strong> When all work orders are in done state</p>
              <p><strong>Done:</strong> When Clicked on Produce Button</p>
              <p><strong>Cancelled:</strong> When Clicked on Cancelled</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
import React, { useState, useEffect } from 'react';
import { mockApiCall } from '../services/mockApi';

interface Field {
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  optionsEndpoint?: string;
  options?: any[];
}

interface Submit {
  label: string;
  action: string;
  onSuccess?: string;
}

interface FormProps {
  fields: Field[];
  submit: Submit;
  onSuccess?: () => void;
  initialData?: any;
}

export const Form: React.FC<FormProps> = ({ fields, submit, onSuccess, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState<any>({});

  useEffect(() => {
    fields.forEach(async (field) => {
      if (field.optionsEndpoint) {
        const response = await mockApiCall(field.optionsEndpoint);
        setOptions((prev: any) => ({
          ...prev,
          [field.name]: (response as any).data
        }));
      }
    });
  }, [fields]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const [method, endpoint] = submit.action.split(' ');
      await mockApiCall(endpoint, method, formData);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md mx-auto">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label || field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          </label>
          
          {field.type === 'select' ? (
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required
            >
              <option value="">Select...</option>
              {(options[field.name] || field.options || []).map((option: any) => (
                <option
                  key={typeof option === 'object' ? option.id : option}
                  value={typeof option === 'object' ? option.id : option}
                >
                  {typeof option === 'object' ? option.name : option}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required
            />
          )}
        </div>
      ))}
      
      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={loading}
      >
        {loading ? 'Loading...' : submit.label}
      </button>
    </form>
  );
};
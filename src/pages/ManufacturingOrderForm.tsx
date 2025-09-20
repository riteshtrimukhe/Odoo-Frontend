import React from 'react';
import { Form } from '../components/Form';
import { useNavigate } from 'react-router-dom';

export const ManufacturingOrderForm: React.FC = () => {
  const navigate = useNavigate();

  const fields = [
    {
      name: 'productId',
      type: 'select',
      label: 'Product',
      optionsEndpoint: '/mock/products'
    },
    {
      name: 'quantity',
      type: 'number',
      label: 'Quantity'
    },
    {
      name: 'scheduleDate',
      type: 'date',
      label: 'Schedule Date'
    }
  ];

  const submit = {
    label: 'Create MO',
    action: 'POST /mock/manufacturing-orders'
  };

  const handleSuccess = () => {
    navigate('/manufacturing-orders');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Create New Manufacturing Order</h1>
        <p className="text-gray-600">Fill out the details for the new manufacturing order</p>
      </div>
      
      <Form
        fields={fields}
        submit={submit}
        onSuccess={handleSuccess}
      />
    </div>
  );
};
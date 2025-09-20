import React from 'react';
import { Table } from '../components/Table';

export const StockLedger: React.FC = () => {
  const columns = [
    { key: "date", label: "Date" },
    { key: "type", label: "Type" },
    { key: "qty", label: "Qty" },
    { key: "balanceAfter", label: "Balance" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Stock Ledger</h1>
        <p className="text-gray-600">Track all inventory movements and balances</p>
      </div>
      
      <Table
        columns={columns}
        dataEndpoint="/mock/stock-transactions"
      />
    </div>
  );
};
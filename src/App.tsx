import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { ManufacturingOrderForm } from './pages/ManufacturingOrderForm';
import { ManufacturingOrderDetail } from './pages/ManufacturingOrderDetail';
import { WorkCenterList } from './pages/WorkCenterList';
import { StockLedger } from './pages/StockLedger';
import { Reports } from './pages/Reports';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/manufacturing-orders" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/manufacturing-orders/new" element={
            <ProtectedRoute>
              <Layout>
                <ManufacturingOrderForm />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/manufacturing-orders/:id" element={
            <ProtectedRoute>
              <Layout>
                <ManufacturingOrderDetail />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/work-centers" element={
            <ProtectedRoute>
              <Layout>
                <WorkCenterList />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/stock-ledger" element={
            <ProtectedRoute>
              <Layout>
                <StockLedger />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
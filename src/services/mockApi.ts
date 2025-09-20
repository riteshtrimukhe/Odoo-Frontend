// Mock API service using external data files
import { manufacturingOrdersData, getManufacturingOrdersByStatus, getManufacturingOrderById } from '../data/manufacturingOrders';
import { productsData, getProductById } from '../data/products';
import { workCentersData, getWorkCenterById } from '../data/workCenters';
import { allWorkOrdersData, getWorkOrdersByMO } from '../data/workOrders';
import { calculateKPIs } from '../data/kpiData';

// Mock API responses
export const mockApiCall = (endpoint: string, method = 'GET', data: any = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (endpoint) {
        case '/mock/manufacturing-orders':
          if (method === 'POST') {
            const newMO = {
              id: manufacturingOrdersData.length + 1,
              moNumber: `MO-${String(manufacturingOrdersData.length + 1).padStart(6, '0')}`,
              ...data,
              status: 'Draft'
            };
            manufacturingOrdersData.push(newMO);
            resolve({ data: newMO });
          } else {
            resolve({ data: manufacturingOrdersData });
          }
          break;

        case '/mock/products':
          resolve({ data: productsData });
          break;

        case '/mock/work-centers':
          resolve({ data: workCentersData });
          break;

        case '/mock/work-orders':
          resolve({ data: allWorkOrdersData });
          break;

        default:
          if (endpoint.includes('/work-orders')) {
            const moId = endpoint.match(/manufacturing-orders\/(\d+)/)?.[1];
            if (moId) {
              const moNumber = `MO-${String(moId).padStart(6, '0')}`;
              resolve({ data: getWorkOrdersByMO(moNumber) });
            } else {
              resolve({ data: [] });
            }
          } else if (endpoint.includes('/bom')) {
            resolve({ data: [] }); // Placeholder for BOM
          } else if (endpoint.includes('manufacturing-orders/')) {
            const id = endpoint.match(/manufacturing-orders\/(\d+)$/)?.[1];
            const mo = getManufacturingOrderById(parseInt(id!));
            resolve({ data: mo });
          } else {
            resolve({ data: [] });
          }
      }
    }, 300); // Simulate network delay
  });
};

// Export KPI calculation function
export const getMockKPIs = calculateKPIs;
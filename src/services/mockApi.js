// Mock data for development
const mockData = {
  manufacturingOrders: [
    {
      id: 1,
      moNumber: 'MO-2024-001',
      productName: 'Steel Frame Assembly',
      productId: 1,
      quantity: 100,
      dueDate: '2024-01-15',
      scheduleDate: '2024-01-10',
      status: 'In-Progress',
      actualDuration: 120,
      plannedDuration: 140
    },
    {
      id: 2,
      moNumber: 'MO-2024-002',
      productName: 'Motor Housing',
      productId: 2,
      quantity: 50,
      dueDate: '2024-01-20',
      scheduleDate: '2024-01-12',
      status: 'To Close',
      actualDuration: 80,
      plannedDuration: 90
    },
    {
      id: 3,
      moNumber: 'MO-2024-003',
      productName: 'Conveyor Belt System',
      productId: 3,
      quantity: 25,
      dueDate: '2024-01-25',
      scheduleDate: '2024-01-15',
      status: 'Draft',
      actualDuration: 0,
      plannedDuration: 200
    },
  ],
  products: [
    { id: 1, name: 'Steel Frame Assembly' },
    { id: 2, name: 'Motor Housing' },
    { id: 3, name: 'Conveyor Belt System' },
    { id: 4, name: 'Control Panel' }
  ],
  workCenters: [
    { id: 1, name: 'Cutting', capacityPerDay: 480, currentLoad: 320 },
    { id: 2, name: 'Assembly', capacityPerDay: 600, currentLoad: 450 },
    { id: 3, name: 'Painting', capacityPerDay: 400, currentLoad: 280 }
  ],
  workOrders: {
    1: [
      {
        id: 1,
        operationName: 'Cut Steel',
        workCenterName: 'Cutting',
        productName: 'Steel Frame Assembly',
        quantity: 5,
        expectedDuration: 60,
        realDuration: 55,
        plannedDuration: 60,
        actualDuration: 55,
        status: 'Done'
      },
      {
        id: 2,
        operationName: 'Weld Frame',
        workCenterName: 'Assembly',
        productName: 'Steel Frame Assembly',
        quantity: 5,
        expectedDuration: 80,
        realDuration: 65,
        plannedDuration: 80,
        actualDuration: 65,
        status: 'In-Progress'
      }
    ]
  },
  allWorkOrders: [
    {
      id: 1,
      operationName: 'Cut Steel',
      workCenterName: 'Cutting',
      productName: 'Steel Frame Assembly',
      quantity: 5,
      expectedDuration: 60,
      realDuration: 55,
      status: 'Done',
      moNumber: 'MO-000001'
    },
    {
      id: 2,
      operationName: 'Weld Frame',
      workCenterName: 'Assembly',
      productName: 'Steel Frame Assembly',
      quantity: 5,
      expectedDuration: 80,
      realDuration: 65,
      status: 'In-Progress',
      moNumber: 'MO-000001'
    },
    {
      id: 3,
      operationName: 'Assembly Operations',
      workCenterName: 'Assembly',
      productName: 'Dining Table',
      quantity: 3,
      expectedDuration: 120,
      realDuration: 0,
      status: 'To Do',
      moNumber: 'MO-000001'
    },
    {
      id: 4,
      operationName: 'Quality Check',
      workCenterName: 'Quality Control',
      productName: 'Motor Housing',
      quantity: 10,
      expectedDuration: 45,
      realDuration: 42,
      status: 'Done',
      moNumber: 'MO-000002'
    },
    {
      id: 5,
      operationName: 'Surface Treatment',
      workCenterName: 'Painting',
      productName: 'Motor Housing',
      quantity: 10,
      expectedDuration: 90,
      realDuration: 0,
      status: 'To Do',
      moNumber: 'MO-000002'
    }
  ],
  bom: {
    1: [
      {
        id: 1,
        componentName: 'Steel Plate 10mm',
        componentId: 1,
        requiredQty: 200,
        onHandQty: 150,
        shortageQty: 50
      },
      {
        id: 2,
        componentName: 'Welding Rod',
        componentId: 2,
        requiredQty: 10,
        onHandQty: 25,
        shortageQty: 0
      }
    ]
  },
  stockTransactions: [
    {
      id: 1,
      date: '2024-01-10',
      type: 'Receipt',
      qty: 100,
      balanceAfter: 500,
      component: 'Steel Plate 10mm'
    },
    {
      id: 2,
      date: '2024-01-11',
      type: 'Issue',
      qty: -50,
      balanceAfter: 450,
      component: 'Steel Plate 10mm'
    }
  ]
};

// Mock API responses
export const mockApiCall = (endpoint, method = 'GET', data = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (endpoint) {
        case '/mock/manufacturing-orders':
          if (method === 'POST') {
            const newMO = {
              id: mockData.manufacturingOrders.length + 1,
              moNumber: `MO-2024-${String(mockData.manufacturingOrders.length + 1).padStart(3, '0')}`,
              ...data,
              status: 'Draft'
            };
            mockData.manufacturingOrders.push(newMO);
            resolve({ data: newMO });
          } else {
            resolve({ data: mockData.manufacturingOrders });
          }
          break;

        case '/mock/products':
          resolve({ data: mockData.products });
          break;

        case '/mock/work-centers':
          resolve({ data: mockData.workCenters });
          break;

        case '/mock/work-orders':
          resolve({ data: mockData.allWorkOrders });
          break;

        case '/mock/stock-transactions':
          resolve({ data: mockData.stockTransactions });
          break;

        default:
          if (endpoint.includes('/work-orders')) {
            const moId = endpoint.match(/manufacturing-orders\/(\d+)/)?.[1];
            resolve({ data: mockData.workOrders[moId] || [] });
          } else if (endpoint.includes('/bom')) {
            const moId = endpoint.match(/manufacturing-orders\/(\d+)/)?.[1];
            resolve({ data: mockData.bom[moId] || [] });
          } else if (endpoint.includes('manufacturing-orders/')) {
            const id = endpoint.match(/manufacturing-orders\/(\d+)$/)?.[1];
            const mo = mockData.manufacturingOrders.find(mo => mo.id === parseInt(id));
            resolve({ data: mo });
          } else {
            resolve({ data: [] });
          }
      }
    }, 300); // Simulate network delay
  });
};

// Mock KPI data
export const getMockKPIs = () => {
  const total = mockData.manufacturingOrders.length;
  const inProgress = mockData.manufacturingOrders.filter(mo => mo.status === 'In-Progress').length;
  const completed = mockData.manufacturingOrders.filter(mo => mo.status === 'Done').length;
  const delayed = mockData.manufacturingOrders.filter(mo => 
    new Date(mo.dueDate) < new Date() && mo.status !== 'Done'
  ).length;

  return {
    totalMO: total,
    inProgressMO: inProgress,
    completedMO: completed,
    delayedMO: delayed
  };
};
// Work Orders Mock Data
export interface WorkOrder {
  id: number;
  operationName: string;
  workCenterName: string;
  productName: string;
  quantity: number;
  expectedDuration: number;
  realDuration: number;
  status: 'To Do' | 'In-Progress' | 'Done' | 'Cancelled';
  moNumber: string;
  plannedStartDate?: string;
  actualStartDate?: string;
  plannedEndDate?: string;
  actualEndDate?: string;
}

export const allWorkOrdersData: WorkOrder[] = [
  {
    id: 1,
    operationName: 'Cut Steel',
    workCenterName: 'Cutting',
    productName: 'Steel Frame Assembly',
    quantity: 5,
    expectedDuration: 60,
    realDuration: 55,
    status: 'Done',
    moNumber: 'MO-000001',
    plannedStartDate: '2024-01-10',
    actualStartDate: '2024-01-10',
    plannedEndDate: '2024-01-10',
    actualEndDate: '2024-01-10'
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
    moNumber: 'MO-000001',
    plannedStartDate: '2024-01-11',
    actualStartDate: '2024-01-11'
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
    moNumber: 'MO-000001',
    plannedStartDate: '2024-01-12'
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
    moNumber: 'MO-000002',
    plannedStartDate: '2024-01-08',
    actualStartDate: '2024-01-08',
    plannedEndDate: '2024-01-08',
    actualEndDate: '2024-01-08'
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
    moNumber: 'MO-000002',
    plannedStartDate: '2024-01-09'
  },
  {
    id: 6,
    operationName: 'Cut Wood',
    workCenterName: 'Cutting',
    productName: 'Dining Table',
    quantity: 3,
    expectedDuration: 75,
    realDuration: 78,
    status: 'Done',
    moNumber: 'MO-000001',
    plannedStartDate: '2024-01-05',
    actualStartDate: '2024-01-05',
    plannedEndDate: '2024-01-05',
    actualEndDate: '2024-01-05'
  },
  {
    id: 7,
    operationName: 'Sand and Finish',
    workCenterName: 'Assembly',
    productName: 'Dining Table',
    quantity: 3,
    expectedDuration: 150,
    realDuration: 0,
    status: 'To Do',
    moNumber: 'MO-000001',
    plannedStartDate: '2024-01-13'
  }
];

export const getWorkOrderById = (id: number) => {
  return allWorkOrdersData.find(workOrder => workOrder.id === id);
};

export const getWorkOrdersByStatus = (status: WorkOrder['status']) => {
  return allWorkOrdersData.filter(workOrder => workOrder.status === status);
};

export const getWorkOrdersByMO = (moNumber: string) => {
  return allWorkOrdersData.filter(workOrder => workOrder.moNumber === moNumber);
};

export const getWorkOrdersByWorkCenter = (workCenterName: string) => {
  return allWorkOrdersData.filter(workOrder => workOrder.workCenterName === workCenterName);
};
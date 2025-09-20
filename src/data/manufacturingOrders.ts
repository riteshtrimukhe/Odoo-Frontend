// Manufacturing Orders Mock Data
export interface ManufacturingOrder {
  id: number;
  moNumber: string;
  productName: string;
  productId: number;
  quantity: number;
  dueDate: string;
  scheduleDate: string;
  status: 'Draft' | 'Confirmed' | 'In-Progress' | 'To Close' | 'Done' | 'Not Assigned' | 'Late';
  actualDuration: number;
  plannedDuration: number;
  reference: string;
  startDate: string;
  finishedProduct: string;
  componentStatus: string;
  unitOfMeasure: string;
  state: string;
}

export const manufacturingOrdersData: ManufacturingOrder[] = [
  {
    id: 1,
    moNumber: 'MO-000001',
    productName: 'Dining Table',
    productId: 1,
    quantity: 5.00,
    dueDate: '2024-01-15',
    scheduleDate: '2024-01-10',
    status: 'Confirmed',
    actualDuration: 0,
    plannedDuration: 140,
    reference: 'MO-000001',
    startDate: 'Tomorrow',
    finishedProduct: 'Dining Table',
    componentStatus: 'Not Available',
    unitOfMeasure: 'Units',
    state: 'Confirmed'
  },
  {
    id: 2,
    moNumber: 'MO-000002',
    productName: 'Drawer',
    productId: 2,
    quantity: 2.00,
    dueDate: '2024-01-20',
    scheduleDate: '2024-01-12',
    status: 'In-Progress',
    actualDuration: 80,
    plannedDuration: 90,
    reference: 'MO-000002',
    startDate: 'Yesterday',
    finishedProduct: 'Drawer',
    componentStatus: 'Available',
    unitOfMeasure: 'Units',
    state: 'In-Progress'
  },
  {
    id: 3,
    moNumber: 'MO-000003',
    productName: 'Steel Frame Assembly',
    productId: 3,
    quantity: 25,
    dueDate: '2024-01-25',
    scheduleDate: '2024-01-15',
    status: 'Draft',
    actualDuration: 0,
    plannedDuration: 200,
    reference: 'MO-000003',
    startDate: 'Tomorrow',
    finishedProduct: 'Steel Frame Assembly',
    componentStatus: 'Not Available',
    unitOfMeasure: 'Units',
    state: 'Draft'
  },
  {
    id: 4,
    moNumber: 'MO-000004',
    productName: 'Motor Housing',
    productId: 4,
    quantity: 10,
    dueDate: '2024-01-18',
    scheduleDate: '2024-01-14',
    status: 'To Close',
    actualDuration: 150,
    plannedDuration: 160,
    reference: 'MO-000004',
    startDate: '2 days ago',
    finishedProduct: 'Motor Housing',
    componentStatus: 'Available',
    unitOfMeasure: 'Units',
    state: 'To Close'
  },
  {
    id: 5,
    moNumber: 'MO-000005',
    productName: 'Creative Kingfisher',
    productId: 5,
    quantity: 1,
    dueDate: '2024-01-30',
    scheduleDate: '2024-01-20',
    status: 'Not Assigned',
    actualDuration: 0,
    plannedDuration: 100,
    reference: 'MO-000005',
    startDate: 'Next week',
    finishedProduct: 'Creative Kingfisher',
    componentStatus: 'Not Available',
    unitOfMeasure: 'Units',
    state: 'Not Assigned'
  },
  {
    id: 6,
    moNumber: 'MO-000006',
    productName: 'Assembly Part A',
    productId: 6,
    quantity: 15,
    dueDate: '2024-01-12',
    scheduleDate: '2024-01-08',
    status: 'Late',
    actualDuration: 0,
    plannedDuration: 120,
    reference: 'MO-000006',
    startDate: 'Overdue',
    finishedProduct: 'Assembly Part A',
    componentStatus: 'Available',
    unitOfMeasure: 'Units',
    state: 'Late'
  }
];

export const getManufacturingOrdersByStatus = (status: string) => {
  if (status === 'All') return manufacturingOrdersData;
  return manufacturingOrdersData.filter(order => order.status === status);
};

export const getManufacturingOrderById = (id: number) => {
  return manufacturingOrdersData.find(order => order.id === id);
};
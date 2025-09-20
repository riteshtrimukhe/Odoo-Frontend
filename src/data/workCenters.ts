// Work Centers Mock Data
export interface WorkCenter {
  id: number;
  name: string;
  capacityPerDay: number;
  currentLoad: number;
  efficiency: number;
  status: 'Active' | 'Inactive' | 'Maintenance';
}

export const workCentersData: WorkCenter[] = [
  { 
    id: 1, 
    name: 'Cutting', 
    capacityPerDay: 480, 
    currentLoad: 320,
    efficiency: 85,
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Assembly', 
    capacityPerDay: 600, 
    currentLoad: 450,
    efficiency: 92,
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Painting', 
    capacityPerDay: 400, 
    currentLoad: 280,
    efficiency: 78,
    status: 'Active'
  },
  { 
    id: 4, 
    name: 'Quality Control', 
    capacityPerDay: 300, 
    currentLoad: 150,
    efficiency: 95,
    status: 'Active'
  }
];

export const getWorkCenterById = (id: number) => {
  return workCentersData.find(center => center.id === id);
};

export const getActiveWorkCenters = () => {
  return workCentersData.filter(center => center.status === 'Active');
};
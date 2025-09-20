// KPI Mock Data
import { manufacturingOrdersData } from './manufacturingOrders';

export interface KPIData {
  totalMO: number;
  inProgressMO: number;
  completedMO: number;
  delayedMO: number;
  draftMO: number;
  confirmedMO: number;
  toCloseMO: number;
  notAssignedMO: number;
  lateMO: number;
}

export const calculateKPIs = (): KPIData => {
  const total = manufacturingOrdersData.length;
  const inProgress = manufacturingOrdersData.filter(mo => mo.status === 'In-Progress').length;
  const completed = manufacturingOrdersData.filter(mo => mo.status === 'Done').length;
  const delayed = manufacturingOrdersData.filter(mo => 
    new Date(mo.dueDate) < new Date() && mo.status !== 'Done'
  ).length;
  const draft = manufacturingOrdersData.filter(mo => mo.status === 'Draft').length;
  const confirmed = manufacturingOrdersData.filter(mo => mo.status === 'Confirmed').length;
  const toClose = manufacturingOrdersData.filter(mo => mo.status === 'To Close').length;
  const notAssigned = manufacturingOrdersData.filter(mo => mo.status === 'Not Assigned').length;
  const late = manufacturingOrdersData.filter(mo => mo.status === 'Late').length;

  return {
    totalMO: total,
    inProgressMO: inProgress,
    completedMO: completed,
    delayedMO: delayed,
    draftMO: draft,
    confirmedMO: confirmed,
    toCloseMO: toClose,
    notAssignedMO: notAssigned,
    lateMO: late
  };
};

export const getKPIByStatus = (status: string): number => {
  const kpis = calculateKPIs();
  
  switch (status) {
    case 'All': return kpis.totalMO;
    case 'Draft': return kpis.draftMO;
    case 'Confirmed': return kpis.confirmedMO;
    case 'In-Progress': return kpis.inProgressMO;
    case 'To Close': return kpis.toCloseMO;
    case 'Not Assigned': return kpis.notAssignedMO;
    case 'Late': return kpis.lateMO;
    default: return 0;
  }
};
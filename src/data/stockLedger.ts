// Stock Ledger Mock Data
export interface StockLedgerItem {
  id: number;
  product: string;
  unitCost: number;
  unit: string;
  totalValue: number;
  onHand: number;
  freeToUse: number;
  incoming: number;
  outgoing: number;
}

export const stockLedgerData: StockLedgerItem[] = [
  {
    id: 1,
    product: 'Dining Table',
    unitCost: 1200,
    unit: 'Unit',
    totalValue: 600000,
    onHand: 500,
    freeToUse: 270,
    incoming: 0,
    outgoing: 230
  },
  {
    id: 2,
    product: 'Drawer',
    unitCost: 100,
    unit: 'Unit',
    totalValue: 2000,
    onHand: 20,
    freeToUse: 20,
    incoming: 0,
    outgoing: 0
  },
  {
    id: 3,
    product: 'Steel Frame Assembly',
    unitCost: 2500,
    unit: 'Unit',
    totalValue: 125000,
    onHand: 50,
    freeToUse: 35,
    incoming: 10,
    outgoing: 5
  },
  {
    id: 4,
    product: 'Motor Housing',
    unitCost: 800,
    unit: 'Unit',
    totalValue: 40000,
    onHand: 50,
    freeToUse: 40,
    incoming: 5,
    outgoing: 5
  },
  {
    id: 5,
    product: 'Wood Panel',
    unitCost: 150,
    unit: 'Unit',
    totalValue: 15000,
    onHand: 100,
    freeToUse: 80,
    incoming: 20,
    outgoing: 0
  },
  {
    id: 6,
    product: 'Screws',
    unitCost: 2,
    unit: 'Unit',
    totalValue: 1000,
    onHand: 500,
    freeToUse: 450,
    incoming: 0,
    outgoing: 50
  },
  {
    id: 7,
    product: 'Steel Beam',
    unitCost: 500,
    unit: 'Meters',
    totalValue: 25000,
    onHand: 50,
    freeToUse: 40,
    incoming: 10,
    outgoing: 0
  }
];

export const getStockLedgerData = () => {
  return stockLedgerData;
};

export const getStockLedgerByProduct = (productName: string) => {
  return stockLedgerData.filter(item => 
    item.product.toLowerCase().includes(productName.toLowerCase())
  );
};
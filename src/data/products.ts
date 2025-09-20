// Products Mock Data
export interface Product {
  id: number;
  name: string;
  category?: string;
  description?: string;
  unitOfMeasure?: string;
}

export const productsData: Product[] = [
  { 
    id: 1, 
    name: 'Dining Table',
    category: 'Furniture',
    description: 'Premium wooden dining table',
    unitOfMeasure: 'Units'
  },
  { 
    id: 2, 
    name: 'Drawer',
    category: 'Furniture Components',
    description: 'Standard drawer assembly',
    unitOfMeasure: 'Units'
  },
  { 
    id: 3, 
    name: 'Steel Frame Assembly',
    category: 'Structural Components',
    description: 'Heavy duty steel frame',
    unitOfMeasure: 'Units'
  },
  { 
    id: 4, 
    name: 'Motor Housing',
    category: 'Mechanical Components',
    description: 'Precision motor housing',
    unitOfMeasure: 'Units'
  },
  { 
    id: 5, 
    name: 'Creative Kingfisher',
    category: 'Custom Products',
    description: 'Custom designed product',
    unitOfMeasure: 'Units'
  },
  { 
    id: 6, 
    name: 'Assembly Part A',
    category: 'Components',
    description: 'Standard assembly component',
    unitOfMeasure: 'Units'
  }
];

export const getProductById = (id: number) => {
  return productsData.find(product => product.id === id);
};

export const getProductsByCategory = (category: string) => {
  return productsData.filter(product => product.category === category);
};
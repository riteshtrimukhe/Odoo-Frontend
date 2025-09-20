// Bills of Materials Mock Data
export interface BillOfMaterial {
  id: number;
  finishedProduct: string;
  reference: string;
  quantity?: number;
  components?: BOMComponent[];
}

export interface BOMComponent {
  id: number;
  componentName: string;
  quantity: number;
  unitOfMeasure: string;
}

export const billsOfMaterialsData: BillOfMaterial[] = [
  {
    id: 1,
    finishedProduct: 'Drawer',
    reference: '[B001]',
    quantity: 1,
    components: [
      {
        id: 1,
        componentName: 'Wood Panel',
        quantity: 4,
        unitOfMeasure: 'Units'
      },
      {
        id: 2,
        componentName: 'Drawer Handle',
        quantity: 1,
        unitOfMeasure: 'Units'
      },
      {
        id: 3,
        componentName: 'Screws',
        quantity: 8,
        unitOfMeasure: 'Units'
      }
    ]
  },
  {
    id: 2,
    finishedProduct: 'Dining Table',
    reference: '[B002]',
    quantity: 1,
    components: [
      {
        id: 4,
        componentName: 'Table Top',
        quantity: 1,
        unitOfMeasure: 'Units'
      },
      {
        id: 5,
        componentName: 'Table Legs',
        quantity: 4,
        unitOfMeasure: 'Units'
      },
      {
        id: 6,
        componentName: 'Bolts',
        quantity: 16,
        unitOfMeasure: 'Units'
      }
    ]
  },
  {
    id: 3,
    finishedProduct: 'Steel Frame Assembly',
    reference: '[B003]',
    quantity: 1,
    components: [
      {
        id: 7,
        componentName: 'Steel Beam',
        quantity: 4,
        unitOfMeasure: 'Meters'
      },
      {
        id: 8,
        componentName: 'Welding Rod',
        quantity: 10,
        unitOfMeasure: 'Units'
      },
      {
        id: 9,
        componentName: 'Steel Plates',
        quantity: 2,
        unitOfMeasure: 'Units'
      }
    ]
  },
  {
    id: 4,
    finishedProduct: 'Motor Housing',
    reference: '[B004]',
    quantity: 1,
    components: [
      {
        id: 10,
        componentName: 'Aluminum Casing',
        quantity: 1,
        unitOfMeasure: 'Units'
      },
      {
        id: 11,
        componentName: 'Gasket',
        quantity: 2,
        unitOfMeasure: 'Units'
      },
      {
        id: 12,
        componentName: 'Fasteners',
        quantity: 12,
        unitOfMeasure: 'Units'
      }
    ]
  },
  {
    id: 5,
    finishedProduct: 'Creative Kingfisher',
    reference: '[B005]',
    quantity: 1,
    components: [
      {
        id: 13,
        componentName: 'Custom Component A',
        quantity: 2,
        unitOfMeasure: 'Units'
      },
      {
        id: 14,
        componentName: 'Custom Component B',
        quantity: 1,
        unitOfMeasure: 'Units'
      }
    ]
  },
  {
    id: 6,
    finishedProduct: 'Assembly Part A',
    reference: '[B006]',
    quantity: 1,
    components: [
      {
        id: 15,
        componentName: 'Base Plate',
        quantity: 1,
        unitOfMeasure: 'Units'
      },
      {
        id: 16,
        componentName: 'Connector',
        quantity: 4,
        unitOfMeasure: 'Units'
      }
    ]
  }
];

export const getBillsOfMaterials = () => {
  return billsOfMaterialsData;
};

export const getBillOfMaterialById = (id: number) => {
  return billsOfMaterialsData.find(bom => bom.id === id);
};

export const getBillOfMaterialByReference = (reference: string) => {
  return billsOfMaterialsData.find(bom => bom.reference === reference);
};

export const getBillOfMaterialsByProduct = (productName: string) => {
  return billsOfMaterialsData.filter(bom => 
    bom.finishedProduct.toLowerCase().includes(productName.toLowerCase())
  );
};
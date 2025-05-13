export interface Bin {
  id: string;
  name: string;
  size: string;
  category: BinCategory;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  weight: {
    maxWeight: string;
    weightUnit: string;
  };
  suitableFor: string[];
  restrictions: string[];
  description: string;
  shortDescription: string;
  pricing: {
    price: string;
    hireLength: string;
  };
  imagePath: string;
  trailerLoads: number;
  isPopular?: boolean;
}

export enum BinCategory {
  GENERAL = 'general',
  HARDFILL = 'hardfill',
  GREEN = 'green',
  HAZARDOUS = 'hazardous'
}

export interface Order {
  id: string;
  date: Date;
  binType: string;
  binSize: string;
  price: number;
  address: string;
  duration: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'collected' | 'completed';
}

// This would be expanded in a real application
export interface OrderDetail extends Order {
  deliveryNotes?: string;
  serviceIncludes?: string[];
  contactDetails?: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod?: {
    type: string;
    lastFour: string;
  };
  timeline?: {
    orderedOn: Date;
    confirmedOn?: Date;
    deliveredOn?: Date;
    collectedOn?: Date;
    completedOn?: Date;
  };
}

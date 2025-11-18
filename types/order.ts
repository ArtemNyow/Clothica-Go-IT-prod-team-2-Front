export interface OrderItem {
  goodId: string;
  qty: number;
  price: number;
  size: string;
}

export interface Totals {
  subtotal: number;
  shipping: number;
  total: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  postOffice: string;
  comment?: string;
}

export interface Order {
  _id: string;
  userId?: string;
  guestSession?: string | null;
  orderNumber: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  totals: Totals;
  status: string;
  createdAt: string;
  updatedAt: string;
}
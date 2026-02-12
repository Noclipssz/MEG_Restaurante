export type MarmitaSize = 'P' | 'M' | 'G' | 'feijoada';

export type DeliveryMethod = 'entrega' | 'retirada';

export interface SizeOption {
  id: MarmitaSize;
  label: string;
  price: number;
  priceDisplay: string;
  description: string;
  popular?: boolean;
  special?: boolean;
}

export interface OrderFormData {
  size: MarmitaSize;
  proteins: string[];
  deliveryMethod: DeliveryMethod;
  address: string;
  customerName: string;
  observations: string;
}

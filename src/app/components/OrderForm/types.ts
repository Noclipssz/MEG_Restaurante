export type MarmitaSize = 'P' | 'M' | 'G' | 'feijoada';

export type DeliveryMethod = 'entrega' | 'retirada';

export type BeanType = 'preto' | 'branco';

export type PaymentMethod = 'pix' | 'dinheiro' | 'debito' | 'credito';

export interface DrinkOption {
  id: string;
  label: string;
  price: number;
  priceDisplay: string;
}

export interface SizeOption {
  id: MarmitaSize;
  label: string;
  price: number;
  priceDisplay: string;
  description: string;
  popular?: boolean;
  special?: boolean;
}

export interface MarmitaItem {
  size: MarmitaSize;
  quantity: number;
  flavors: string[];
  beanTypes: Array<BeanType | ''>;
}

export interface DrinkSelection {
  drinkId: string;
  quantity: number;
}

export interface OrderFormData {
  marmitaItems: MarmitaItem[];
  drinks: DrinkSelection[];
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod | '';
  address: string;
  customerName: string;
  observations: string;
}

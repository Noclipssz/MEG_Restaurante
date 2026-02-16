import { beverages } from '../../data/menu';
import type {
  DrinkSelection,
  MarmitaItem,
  MarmitaSize,
  OrderFormData,
  PaymentMethod,
  SizeOption,
} from './types';

export const sizeOptions: SizeOption[] = [
  { id: 'P', label: 'Marmitex P', price: 19.90, priceDisplay: 'R$ 19,90', description: 'Porção individual' },
  { id: 'M', label: 'Marmitex M', price: 21.90, priceDisplay: 'R$ 21,90', description: 'Porção média', popular: true },
  { id: 'G', label: 'Marmitex G', price: 23.90, priceDisplay: 'R$ 23,90', description: 'Porção grande' },
  { id: 'feijoada', label: 'Feijoada', price: 34.90, priceDisplay: 'R$ 34,90', description: 'Feijoada completa', special: true },
];

export function getSizeOption(size: MarmitaSize): SizeOption {
  return sizeOptions.find(s => s.id === size)!;
}

export function getMarmitaItem(data: OrderFormData, size: MarmitaSize): MarmitaItem | undefined {
  return data.marmitaItems.find((item) => item.size === size);
}

export function getMarmitaQuantity(data: OrderFormData, size: MarmitaSize): number {
  return getMarmitaItem(data, size)?.quantity ?? 0;
}

export function getTotalMarmitaUnits(data: OrderFormData): number {
  return data.marmitaItems.reduce((sum, item) => sum + item.quantity, 0);
}

export function hasFlavorStep(data: OrderFormData): boolean {
  return data.marmitaItems.some((item) => item.size !== 'feijoada' && item.quantity > 0);
}

function getPaymentMethodLabel(method: PaymentMethod | ''): string {
  switch (method) {
    case 'pix': return 'Pix';
    case 'dinheiro': return 'Dinheiro';
    case 'debito': return 'Cartão de débito';
    case 'credito': return 'Cartão de crédito';
    default: return 'Não informado';
  }
}

export function getDrinkLabel(drinkId: string): string {
  return beverages.find((drink) => drink.id === drinkId)?.label ?? drinkId;
}

export function getDrinkQuantity(drinks: DrinkSelection[], drinkId: string): number {
  return drinks.find((item) => item.drinkId === drinkId)?.quantity ?? 0;
}

function getBeanLabel(beanType: MarmitaItem['beanTypes'][number]): string {
  if (beanType === 'preto') return 'Feijão preto';
  if (beanType === 'branco') return 'Feijão branco';
  return 'Feijão não selecionado';
}

export function calculateOrderTotal(data: OrderFormData): number {
  const marmitasTotal = data.marmitaItems.reduce((sum, item) => {
    const sizeOpt = getSizeOption(item.size);
    return sum + (sizeOpt.price * item.quantity);
  }, 0);
  const drinksTotal = data.drinks.reduce((sum, drinkSelection) => {
    const drink = beverages.find((item) => item.id === drinkSelection.drinkId);
    return sum + ((drink?.price ?? 0) * drinkSelection.quantity);
  }, 0);
  return marmitasTotal + drinksTotal;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function buildWhatsAppMessage(data: OrderFormData, dayName: string): string {
  const total = calculateOrderTotal(data);
  const marmitaLines = data.marmitaItems.flatMap((item) => {
    const sizeOpt = getSizeOption(item.size);
    const lines = [`- ${item.quantity}x ${sizeOpt.label} (${sizeOpt.priceDisplay})`];

    if (item.size !== 'feijoada') {
      const units = item.flavors.map((flavor, index) => {
        const beanType = item.beanTypes[index];
        const beanLabel = getBeanLabel(beanType);
        return `${index + 1}. ${flavor} (${beanLabel})`;
      }).join(' | ');
      lines.push(`  Itens: ${units}`);
    }

    return lines;
  });

  const drinkLines = data.drinks.map((item) => `- ${item.quantity}x ${getDrinkLabel(item.drinkId)}`);

  const lines: string[] = [
    `*Pedido MEG Restaurante*`,
    ``,
    `*Marmitas:*`,
    ...marmitaLines,
  ];

  if (drinkLines.length > 0) {
    lines.push(``);
    lines.push(`*Bebidas:*`);
    lines.push(...drinkLines);
  }

  lines.push(``);
  lines.push(`*Dia:* ${dayName}-feira`);
  lines.push(`*Pagamento:* ${getPaymentMethodLabel(data.paymentMethod)}`);
  lines.push(`*Total:* ${formatCurrency(total)}`);
  lines.push(``);

  if (data.deliveryMethod === 'entrega') {
    lines.push(`*Entrega no endereço:*`);
    lines.push(data.address);
  } else {
    lines.push(`*Retirada no local*`);
  }

  if (data.customerName.trim()) {
    lines.push(``);
    lines.push(`*Nome:* ${data.customerName.trim()}`);
  }

  if (data.observations.trim()) {
    lines.push(``);
    lines.push(`*Obs:* ${data.observations.trim()}`);
  }

  return lines.join('\n');
}

export function openWhatsAppWithOrder(data: OrderFormData, dayName: string): void {
  const message = buildWhatsAppMessage(data, dayName);
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/5541987750097?text=${encoded}`, '_blank');
}

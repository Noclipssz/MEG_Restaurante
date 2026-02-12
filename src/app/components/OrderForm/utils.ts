import type { OrderFormData, MarmitaSize, SizeOption } from './types';

export const sizeOptions: SizeOption[] = [
  { id: 'P', label: 'Marmitex P', price: 19.90, priceDisplay: 'R$ 19,90', description: 'Porção individual' },
  { id: 'M', label: 'Marmitex M', price: 21.90, priceDisplay: 'R$ 21,90', description: 'Porção média', popular: true },
  { id: 'G', label: 'Marmitex G', price: 23.90, priceDisplay: 'R$ 23,90', description: 'Porção grande' },
  { id: 'feijoada', label: 'Feijoada', price: 34.90, priceDisplay: 'R$ 34,90', description: 'Feijoada completa', special: true },
];

export function getSizeOption(size: MarmitaSize): SizeOption {
  return sizeOptions.find(s => s.id === size)!;
}

export function buildWhatsAppMessage(data: OrderFormData, dayName: string): string {
  const sizeOpt = getSizeOption(data.size);
  const lines: string[] = [
    `*Pedido MEG Restaurante*`,
    ``,
    `*Tamanho:* ${sizeOpt.label} - ${sizeOpt.priceDisplay}`,
  ];

  if (data.size !== 'feijoada') {
    lines.push(`*Mistura:* ${data.proteins[0] || ''}`);
  }

  lines.push(`*Dia:* ${dayName}-feira`);
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

export interface DayMenu {
  day: string;
  dayNumber: number; // 1 = Segunda, 6 = Sábado
  base: string[];
  proteins: string[];
  special?: string;
}

export interface BeverageItem {
  id: string;
  label: string;
  price: number;
  priceDisplay: string;
}

export const beverages: BeverageItem[] = [
  { id: 'coca-lata', label: 'Coca-Cola lata', price: 7, priceDisplay: 'R$ 7,00' },
  { id: 'coca-zero-lata', label: 'Coca-Cola zero lata', price: 7, priceDisplay: 'R$ 7,00' },
  { id: 'sprite-lata', label: 'Sprite lata', price: 7, priceDisplay: 'R$ 7,00' },
  { id: 'kuat-lata', label: 'Kuat lata', price: 7, priceDisplay: 'R$ 7,00' },
  { id: 'fanta-laranja-lata', label: 'Fanta laranja lata', price: 7, priceDisplay: 'R$ 7,00' },
  { id: 'fanta-uva-lata', label: 'Fanta uva lata', price: 7, priceDisplay: 'R$ 7,00' },
  { id: 'coca-200', label: 'Coca-Cola 200ml (normal ou zero)', price: 4, priceDisplay: 'R$ 4,00' },
  { id: 'coca-600', label: 'Coca-Cola 600ml (normal ou zero)', price: 9, priceDisplay: 'R$ 9,00' },
  { id: 'coca-1l', label: 'Coca-Cola PET 1L (normal ou zero)', price: 11, priceDisplay: 'R$ 11,00' },
  { id: 'coca-2l', label: 'Coca-Cola 2L', price: 16, priceDisplay: 'R$ 16,00' },
  { id: 'delvalle-uva', label: 'Suco Del Valle lata uva', price: 7, priceDisplay: 'R$ 7,00' },
  { id: 'delvalle-maracuja', label: 'Suco Del Valle lata maracujá', price: 7, priceDisplay: 'R$ 7,00' },
];

export const weekMenu: DayMenu[] = [
  {
    day: 'Segunda',
    dayNumber: 1,
    base: ['Arroz', 'Feijão branco', 'Feijão preto', 'Macarrão alho e óleo', 'Refogado', 'Purê de batata', 'Farofa a modo da casa', 'Saladas diversas'],
    proteins: ['Bife à parmegiana', 'Frango frito']
  },
  {
    day: 'Terça',
    dayNumber: 2,
    base: ['Arroz', 'Feijão branco', 'Feijão preto', 'Macarrão ao molho branco', 'Refogado', 'Farofa a modo da casa', 'Batata palha', 'Saladas diversas'],
    proteins: ['Copa lombo', 'Strogonoff de frango']
  },
  {
    day: 'Quarta',
    dayNumber: 3,
    base: ['Arroz', 'Feijão preto', 'Feijão branco', 'Macarrão ao molho', 'Refogado', 'Farofa a modo da casa', 'Saladas diversas'],
    proteins: ['Carne moída ao molho', 'Frango assado']
  },
  {
    day: 'Quinta',
    dayNumber: 4,
    base: ['Arroz', 'Feijão preto', 'Feijão branco', 'Macarrão com alho e bacon', 'Refogado', 'Farofa a modo da casa', 'Saladas diversas'],
    proteins: ['Almôndegas caseiras', 'Frango tipo KFC']
  },
  {
    day: 'Sexta',
    dayNumber: 5,
    base: ['Arroz', 'Feijão preto', 'Feijão branco', 'Macarrão na manteiga', 'Refogado', 'Farofa a modo da casa', 'Saladas diversas'],
    proteins: ['Costela de panela', 'Filé de peito grelhado']
  },
  {
    day: 'Sábado',
    dayNumber: 6,
    base: ['Arroz', 'Feijoada completa', 'Feijão branco', 'Macarrão à bolonhesa', 'Couve refogada', 'Torresmo', 'Batata frita', 'Banana à milanesa', 'Farofa a modo da casa', 'Maionese caseira', 'Saladas diversas'],
    proteins: ['Copa lombo empanado frito', 'Ponta de peito assado'],
    special: 'Feijoada'
  }
];

export function getTodayMenu(): DayMenu {
  const jsDay = new Date().getDay(); // 0=Sunday, 1=Monday, ...
  if (jsDay === 0) return weekMenu[0]; // Domingo → mostra Segunda
  return weekMenu[jsDay - 1];
}

export function isSaturday(): boolean {
  return new Date().getDay() === 6;
}

export function isSunday(): boolean {
  return new Date().getDay() === 0;
}

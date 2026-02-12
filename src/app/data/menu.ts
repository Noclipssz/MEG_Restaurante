export interface DayMenu {
  day: string;
  dayNumber: number; // 1 = Segunda, 6 = Sábado
  base: string[];
  proteins: string[];
  special?: string;
}

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

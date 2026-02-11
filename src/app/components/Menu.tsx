import { useState, useEffect } from 'react';
import { Section, Container } from './Section';
import { UtensilsCrossed, Star } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface DayMenu {
  day: string;
  dayNumber: number; // 1 = Segunda, 6 = Sábado
  base: string[];
  proteins: string[];
  special?: string;
}

const weekMenu: DayMenu[] = [
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

export function Menu() {
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    // Auto-select current day (0 = Sunday, 1 = Monday, etc.)
    const today = new Date().getDay();
    // Map Sunday (0) to -1 to avoid showing Sunday menu
    const mappedDay = today === 0 ? -1 : today - 1;
    if (mappedDay >= 0 && mappedDay < weekMenu.length) {
      setActiveDay(mappedDay);
    }
  }, []);

  const currentMenu = weekMenu[activeDay];
  const isSaturday = currentMenu.day === 'Sábado';

  return (
    <Section id="cardapio" variant="default">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">
              Cardápio Semanal
            </h2>
            <p className="text-xl text-[#1A1A1A]/70 max-w-2xl mx-auto">
              Comida honesta, feita com cuidado todos os dias
            </p>
          </div>
        </ScrollReveal>

        {/* Day Tabs */}
        <ScrollReveal delay={0.15}>
        <div className="flex overflow-x-auto gap-2 mb-8 pt-2 pb-2 scrollbar-hide">
          {weekMenu.map((menu, index) => (
            <button
              key={menu.day}
              onClick={() => setActiveDay(index)}
              className={`
                flex-shrink-0 px-4 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200
                ${activeDay === index 
                  ? 'bg-[#E8611A] text-white shadow-lg' 
                  : 'bg-[#FFF8F2] text-[#1A1A1A] hover:bg-[#E8611A]/10'
                }
                ${menu.day === 'Sábado' ? 'ring-2 ring-[#E8611A] ring-offset-2' : ''}
              `}
            >
              {menu.day === 'Sábado' && <Star className="inline w-4 h-4 mr-1" fill="currentColor" />}
              {menu.day}
            </button>
          ))}
        </div>
        </ScrollReveal>

        {/* Menu Content */}
        <ScrollReveal delay={0.25}>
        <div className={`
          bg-gradient-to-br rounded-2xl p-5 sm:p-8 shadow-xl border-2
          ${isSaturday 
            ? 'from-[#E8611A] to-[#C54D10] text-white border-[#C54D10]' 
            : 'from-white to-[#FFF8F2] text-[#1A1A1A] border-[#E8611A]/20'
          }
        `}>
          {isSaturday && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="w-6 h-6" fill="currentColor" />
              <h3 className="text-2xl sm:text-3xl font-serif">Dia de Feijoada!</h3>
              <Star className="w-6 h-6" fill="currentColor" />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Proteins */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className={`w-6 h-6 ${isSaturday ? 'text-white' : 'text-[#E8611A]'}`} />
                <h4 className="text-2xl font-serif">Misturas</h4>
              </div>
              <ul className="space-y-3">
                {currentMenu.proteins.map((protein, index) => (
                  <li 
                    key={index} 
                    className={`
                      flex items-start gap-2 text-lg
                      ${isSaturday ? 'text-white/95' : 'text-[#1A1A1A]/80'}
                    `}
                  >
                    <span className={`
                      mt-1 w-2 h-2 rounded-full flex-shrink-0
                      ${isSaturday ? 'bg-white' : 'bg-[#E8611A]'}
                    `} />
                    {protein}
                  </li>
                ))}
              </ul>
            </div>

            {/* Base Options */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className={`w-6 h-6 ${isSaturday ? 'text-white' : 'text-[#E8611A]'}`} />
                <h4 className="text-2xl font-serif">Acompanhamentos</h4>
              </div>
              <div className={`
                grid grid-cols-2 gap-x-4 gap-y-2
                ${isSaturday ? 'text-white/95' : 'text-[#1A1A1A]/80'}
              `}>
                {currentMenu.base.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-base">
                    <span className={`
                      w-1.5 h-1.5 rounded-full flex-shrink-0
                      ${isSaturday ? 'bg-white/70' : 'bg-[#E8611A]/70'}
                    `} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isSaturday && (
            <div className="mt-6 pt-6 border-t border-white/20 text-center">
              <p className="text-white/90 text-lg">
                🎉 Feijoada especial todo sábado - R$ 34,90 (buffet livre)
              </p>
            </div>
          )}
        </div>
        </ScrollReveal>

        {/* Note */}
        <p className={`
          text-center mt-6 text-sm
          ${isSaturday ? 'text-[#E8611A] font-medium' : 'text-[#1A1A1A]/60'}
        `}>
          * Marmitex de segunda a sexta acompanha 2 opções de mistura
        </p>
      </Container>
    </Section>
  );
}

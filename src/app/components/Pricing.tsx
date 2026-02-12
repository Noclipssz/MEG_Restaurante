import { Section, Container } from './Section';
import { Check, Utensils, Package, Star } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Button } from './Button';
import { ScrollReveal } from './ScrollReveal';
import { useOrderFormDrawer } from './OrderForm';

interface PriceCard {
  title: string;
  price: string;
  features: string[];
  popular?: boolean;
  special?: boolean;
  icon: JSX.Element;
}

const prices: PriceCard[] = [
  {
    title: 'Marmitex P',
    price: 'R$ 19,90',
    features: [
      '2 opções de mistura',
      'Acompanhamentos completos',
      'Ideal para 1 pessoa',
      'Seg-Sex'
    ],
    icon: <Package className="w-6 h-6" />
  },
  {
    title: 'Marmitex M',
    price: 'R$ 21,90',
    features: [
      '2 opções de mistura',
      'Acompanhamentos completos',
      'Porção média',
      'Seg-Sex'
    ],
    popular: true,
    icon: <Package className="w-6 h-6" />
  },
  {
    title: 'Marmitex G',
    price: 'R$ 23,90',
    features: [
      '2 opções de mistura',
      'Acompanhamentos completos',
      'Porção grande',
      'Seg-Sex'
    ],
    icon: <Package className="w-6 h-6" />
  },
  {
    title: 'Buffet Livre',
    price: 'R$ 28,90',
    features: [
      'Sirva-se à vontade',
      'Todas as opções',
      'Coma no local',
      'Seg-Sex'
    ],
    icon: <Utensils className="w-6 h-6" />
  },
  {
    title: 'Feijoada (Sábado)',
    price: 'R$ 34,90',
    features: [
      'Feijoada completa',
      'Buffet especial',
      'Acompanhamentos exclusivos',
      'Apenas aos sábados'
    ],
    special: true,
    icon: <Star className="w-6 h-6" />
  }
];

export function Pricing() {
  const { openOrderForm } = useOrderFormDrawer();

  return (
    <Section id="precos" variant="cream">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">
              Preços
            </h2>
            <p className="text-xl text-[#1A1A1A]/70 max-w-2xl mx-auto">
              Preços justos para comida de verdade
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-8">
          {prices.map((priceCard, index) => (
            <div
              key={index}
              className={`
                relative rounded-2xl p-6 transition-transform duration-300 hover:scale-105
                ${priceCard.special 
                  ? 'bg-gradient-to-br from-[#E8611A] to-[#C54D10] text-white shadow-xl ring-2 ring-[#E8611A] ring-offset-4' 
                  : priceCard.popular
                  ? 'bg-white shadow-xl ring-2 ring-[#E8611A] ring-offset-4'
                  : 'bg-white shadow-lg'
                }
              `}
            >
              {priceCard.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E8611A] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais pedido
                </div>
              )}

              {priceCard.special && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#E8611A] px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" fill="currentColor" />
                  Especial
                </div>
              )}

              <div className={`
                w-14 h-14 rounded-xl flex items-center justify-center mb-4
                ${priceCard.special ? 'bg-white/20' : 'bg-[#E8611A]'}
              `}>
                <div className={priceCard.special ? 'text-white' : 'text-white'}>
                  {priceCard.icon}
                </div>
              </div>

              <h3 className={`
                text-xl font-serif mb-2
                ${priceCard.special ? 'text-white' : 'text-[#1A1A1A]'}
              `}>
                {priceCard.title}
              </h3>

              <div className="mb-4">
                <span className={`
                  text-4xl font-bold
                  ${priceCard.special ? 'text-white' : 'text-[#E8611A]'}
                `}>
                  {priceCard.price}
                </span>
              </div>

              <ul className="space-y-3">
                {priceCard.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={`
                      w-5 h-5 flex-shrink-0 mt-0.5
                      ${priceCard.special ? 'text-white' : 'text-[#E8611A]'}
                    `} />
                    <span className={`
                      text-sm
                      ${priceCard.special ? 'text-white/90' : 'text-[#1A1A1A]/70'}
                    `}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={0.3}>
        <div className="text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <p className="text-2xl font-serif text-[#1A1A1A] mb-2">
            Entrega grátis até 2km
          </p>
          <p className="text-[#1A1A1A]/70 mb-6">
            Faça seu pedido pelo WhatsApp
          </p>
          <Button size="lg" onClick={openOrderForm}>
            <WhatsAppIcon className="w-5 h-5" />
            Pedir Agora
          </Button>
        </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

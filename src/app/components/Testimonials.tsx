import { Quote } from 'lucide-react';
import { Section, Container } from './Section';
import { ScrollReveal } from './ScrollReveal';

const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'Cliente há 2 anos',
    text: 'Almoço aqui quase todos os dias. A comida é sempre bem feita e o atendimento é excelente. Virou meu restaurante de confiança.',
    rating: 5
  },
  {
    name: 'Mariana Santos',
    role: 'Cliente regular',
    text: 'O que mais me impressiona é a constância. Não importa o dia, a comida está sempre boa e o ambiente limpo e organizado.',
    rating: 5
  },
  {
    name: 'João Oliveira',
    role: 'Cliente fiel',
    text: 'A feijoada de sábado é sensacional! Já indiquei para vários amigos e todos adoraram. Atendimento nota 10.',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <Section id="avaliacoes" variant="orange">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              O que dizem nossos clientes
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Quem vem, volta
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
            <div
              className="bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-[background-color] duration-300"
            >
              <Quote className="w-10 h-10 text-white/40 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-xl">★</span>
                ))}
              </div>

              <p className="text-white/90 text-base sm:text-lg mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div>
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-white/60 text-sm">{testimonial.role}</p>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import { Quote } from 'lucide-react';
import { Section, Container } from './Section';
import { ScrollReveal } from './ScrollReveal';

const testimonials = [
  {
    name: 'Alyne Crystiane Catarino',
    role: 'Avaliação Google',
    text: 'A comida é uma delícia, bem caseira, vale muito a pena, o único problema é que a gente come demais daí rsrs. Super indico.',
    rating: 5
  },
  {
    name: 'Chaiana Ferreira',
    role: 'Avaliação Google',
    text: 'Também podemos contar com o excelente atendimento, principalmente da Bruna, que faz questão da gente ser bem tratada e sentir acolhida. Super indico.',
    rating: 5
  },
  {
    name: 'Eduardo Bittencourt De Melo',
    role: 'Avaliação Google',
    text: 'Comida excelente, atendimento ótimo, super recomendo.',
    rating: 5
  },
  {
    name: 'Danielle Bill',
    role: 'Avaliação Google',
    text: 'Comida maravilhosa, bom tempero, barato, atendimento espetacular. Amei!',
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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

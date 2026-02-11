import { Section, Container } from './Section';
import { Heart, Users, Award } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function About() {
  return (
    <Section id="sobre" variant="cream">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <ScrollReveal direction="left">
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
              Nossa História
            </h2>
            <div className="space-y-4 text-[#1A1A1A]/80 text-base sm:text-lg leading-relaxed">
              <p>
                O MEG Restaurante nasceu de um ato de fé, não de conforto. A ideia não surgiu de um
                plano perfeito, mas de uma situação inesperada, um investimento arriscado e uma
                decisão tomada em oração. O investimento foi total: tempo, dinheiro, segurança,
                sonhos e até o último recurso disponível. Hoje, servimos comida de qualidade com
                excelência, cuidado e verdade, proporcionando uma experiência onde o cliente se
                sente bem-vindo e satisfeito.
              </p>
            </div>

            {/* Values */}
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#E8611A] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-[#1A1A1A]">Feito com amor</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#E8611A] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-[#1A1A1A]">Atendimento verdadeiro</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#E8611A] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-[#1A1A1A]">Excelência diária</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal direction="right" delay={0.2} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/casal-proprietarios.jpg"
                alt="Proprietários do MEG Restaurante"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent" />
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E8611A] rounded-full opacity-20 blur-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#8B5E3C] rounded-full opacity-20 blur-3xl" />
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}

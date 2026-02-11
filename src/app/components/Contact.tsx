import { Section, Container } from './Section';
import { MapPin, Clock, Navigation } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Button } from './Button';
import { ScrollReveal } from './ScrollReveal';

export function Contact() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5541987750097', '_blank');
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Rua+Arnaldo+Thá+198+Fazendinha+Curitiba', '_blank');
  };

  return (
    <Section id="contato" variant="default">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">
              Visite-nos
            </h2>
            <p className="text-xl text-[#1A1A1A]/70 max-w-2xl mx-auto">
              Estamos prontos para te receber com o melhor atendimento e comida de qualidade
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <ScrollReveal direction="left">
          <div className="space-y-6">
            <div className="bg-[#FFF8F2] rounded-2xl p-8 border-2 border-[#E8611A]/20">
              <h3 className="text-2xl font-serif text-[#1A1A1A] mb-6">Informações</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#E8611A] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A] mb-1">Endereço</p>
                    <p className="text-[#1A1A1A]/70">
                      Rua Arnaldo Thá, 198<br />
                      Fazendinha, Curitiba/PR
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#E8611A] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A] mb-1">Horário de Funcionamento</p>
                    <p className="text-[#1A1A1A]/70">
                      Segunda a Sábado<br />
                      11:15 às 14:00h
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#E8611A] rounded-lg flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A] mb-1">WhatsApp</p>
                    <p className="text-[#1A1A1A]/70">
                      (41) 98775-0097<br />
                      <span className="text-[#E8611A] font-medium">Entrega grátis até 2km</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button onClick={handleWhatsAppClick} className="flex-1">
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp
                </Button>
                <Button variant="outline" onClick={handleDirections} className="flex-1">
                  <Navigation className="w-5 h-5" />
                  Como Chegar
                </Button>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Map */}
          <ScrollReveal direction="right" delay={0.2}>
          <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#E8611A]/20 h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.8524!2d-49.1985!3d-25.4647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce55555555555%3A0x0!2sRua%20Arnaldo%20Th%C3%A1%2C%20198%20-%20Fazendinha%2C%20Curitiba%20-%20PR!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização MEG Restaurante"
            />
          </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}

import { Phone, MapPin, Clock } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'motion/react';

export function Hero() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5541987750097', '_blank');
  };

  return (
    <div id="inicio" className="relative min-h-[90vh] flex items-center bg-[#1A1A1A]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-prato.jpg"
          alt="MEG Restaurante - Comida caseira"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/65 to-[#1A1A1A]/40" />
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-2xl">
          {/* Logo Mark */}
          <div className="mb-6">
            <img
              src="/images/logo-meg.png"
              alt="MEG Restaurante"
              className="h-32 md:h-44 w-auto brightness-0 invert"
            />
          </div>

          {/* Tagline */}
          <p className="text-4xl md:text-5xl text-white font-serif mb-6">
            Comida honesta.<br />
            Atendimento de verdade.
          </p>

          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-xl">
            Simples, bem feito e com respeito. O lugar onde você sempre sai satisfeito.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={handleWhatsAppClick}
              className="shadow-lg shadow-[#E8611A]/30"
            >
              <Phone className="w-5 h-5" />
              Pedir pelo WhatsApp
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-[#1A1A1A]"
            >
              Ver Cardápio
            </Button>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Clock className="w-5 h-5 text-[#E8611A] mb-2" />
              <p className="text-white/60 text-xs mb-1">Horário</p>
              <p className="text-white font-medium text-sm">Seg-Sáb: 11:15-14h</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <MapPin className="w-5 h-5 text-[#E8611A] mb-2" />
              <p className="text-white/60 text-xs mb-1">Localização</p>
              <p className="text-white font-medium text-sm">Fazendinha, Curitiba</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Phone className="w-5 h-5 text-[#E8611A] mb-2" />
              <p className="text-white/60 text-xs mb-1">Entrega</p>
              <p className="text-white font-medium text-sm">Grátis até 2km</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

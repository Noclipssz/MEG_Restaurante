import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/images/logo-meg.png"
                alt="MEG Restaurante"
                className="h-12 sm:h-16 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/70 text-sm">
              Comida honesta.<br />
              Atendimento de verdade.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#E8611A]">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#cardapio" className="text-white/70 hover:text-[#E8611A] transition-colors">
                  Cardápio
                </a>
              </li>
              <li>
                <a href="#precos" className="text-white/70 hover:text-[#E8611A] transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-white/70 hover:text-[#E8611A] transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contato" className="text-white/70 hover:text-[#E8611A] transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-[#E8611A]">Contato</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Rua Arnaldo Thá, 198</li>
              <li>Fazendinha, Curitiba/PR</li>
              <li className="pt-2">WhatsApp: (41) 98775-0097</li>
              <li>Seg-Sáb: 11:15 - 14:00h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>
            © {currentYear} MEG Restaurante. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-2">
            Feito com <Heart className="w-4 h-4 text-[#E8611A]" fill="currentColor" /> em Curitiba
          </p>
        </div>
      </div>
    </footer>
  );
}

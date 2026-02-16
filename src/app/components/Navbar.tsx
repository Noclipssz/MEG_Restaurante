import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { motion, AnimatePresence } from 'motion/react';
import { useIsMobile } from './ui/use-mobile';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Preços', href: '#precos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#contato' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href === '#inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 pt-[max(env(safe-area-inset-top),0px)] transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#1A1A1A]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-24">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-white/80 hover:text-[#E8611A] transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => window.open('https://wa.me/5541987750097', '_blank')}
              className="inline-flex items-center gap-2 bg-[#E8611A] hover:bg-[#C54D10] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Pedir Agora
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden relative z-10 ml-auto rounded-lg p-2.5 transition-colors ${
              scrolled || mobileOpen
                ? 'text-white hover:bg-white/10'
                : 'text-white bg-[#1A1A1A]/35 border border-white/20 backdrop-blur-sm'
            }`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#1A1A1A]/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-white/80 hover:text-[#E8611A] hover:bg-white/5 transition-colors font-medium py-3 px-4 rounded-lg"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 mt-2 border-t border-white/10">
                <button
                  onClick={() => window.open('https://wa.me/5541987750097', '_blank')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#E8611A] hover:bg-[#C54D10] text-white font-medium px-4 py-3 rounded-lg transition-all duration-200 active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Pedir pelo WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

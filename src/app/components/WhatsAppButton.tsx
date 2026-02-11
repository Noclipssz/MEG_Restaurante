import { useState, useEffect } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    window.open('https://wa.me/5541987750097', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`whatsapp-pulse fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6" />
    </button>
  );
}

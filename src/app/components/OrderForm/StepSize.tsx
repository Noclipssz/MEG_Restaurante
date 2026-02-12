import { Package, Star } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { OrderFormData, MarmitaSize } from './types';
import { sizeOptions } from './utils';

interface StepSizeProps {
  saturday: boolean;
}

export function StepSize({ saturday }: StepSizeProps) {
  const { watch, setValue } = useFormContext<OrderFormData>();
  const selectedSize = watch('size');

  const availableSizes = saturday
    ? sizeOptions
    : sizeOptions.filter(s => s.id !== 'feijoada');

  const handleSelect = (id: MarmitaSize) => {
    setValue('size', id);
    // Limpa proteínas se trocar pra feijoada
    if (id === 'feijoada') {
      setValue('proteins', []);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#1A1A1A]/60 mb-4">
        Escolha o tamanho da sua marmita
      </p>

      {availableSizes.map((option) => {
        const isSelected = selectedSize === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            className={`
              relative w-full text-left rounded-xl p-4 border-2 transition-colors
              ${isSelected
                ? 'border-[#E8611A] bg-[#FFF8F2]'
                : 'border-[#1A1A1A]/10 bg-white hover:border-[#E8611A]/40'
              }
              ${option.special ? 'bg-gradient-to-r from-[#E8611A]/5 to-[#C54D10]/5' : ''}
            `}
          >
            {option.popular && (
              <span className="absolute -top-2.5 right-4 bg-[#E8611A] text-white text-xs px-2.5 py-0.5 rounded-full font-medium">
                Mais pedido
              </span>
            )}
            {option.special && (
              <span className="absolute -top-2.5 right-4 bg-[#C54D10] text-white text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                <Star className="w-3 h-3" fill="currentColor" />
                Especial
              </span>
            )}

            <div className="flex items-center gap-4">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                ${isSelected ? 'bg-[#E8611A] text-white' : 'bg-[#E8611A]/10 text-[#E8611A]'}
              `}>
                {option.special ? <Star className="w-5 h-5" /> : <Package className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#1A1A1A]">{option.label}</p>
                <p className="text-sm text-[#1A1A1A]/60">{option.description}</p>
              </div>

              <span className={`
                text-lg font-bold flex-shrink-0
                ${isSelected ? 'text-[#E8611A]' : 'text-[#1A1A1A]'}
              `}>
                {option.priceDisplay}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

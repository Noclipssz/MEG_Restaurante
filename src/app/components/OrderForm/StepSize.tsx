import { Package, Star } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { MarmitaItem, OrderFormData, MarmitaSize } from './types';
import { sizeOptions } from './utils';

interface StepSizeProps {
  saturday: boolean;
}

export function StepSize({ saturday }: StepSizeProps) {
  const { watch, setValue } = useFormContext<OrderFormData>();
  const marmitaItems = watch('marmitaItems');

  const availableSizes = saturday
    ? sizeOptions
    : sizeOptions.filter(s => s.id !== 'feijoada');

  const getQuantity = (id: MarmitaSize) => marmitaItems.find((item) => item.size === id)?.quantity ?? 0;

  const setQuantity = (id: MarmitaSize, next: number) => {
    const safeQuantity = Math.max(0, Math.min(20, next));
    const currentItems = marmitaItems.filter((item) => item.size !== id);

    if (safeQuantity === 0) {
      setValue('marmitaItems', currentItems);
      return;
    }

    const previous = marmitaItems.find((item) => item.size === id);
    const flavors = previous?.flavors ?? [];
    const beanTypes = previous?.beanTypes ?? [];
    const normalizedFlavors = flavors.slice(0, safeQuantity);
    const normalizedBeanTypes = beanTypes.slice(0, safeQuantity);
    while (normalizedFlavors.length < safeQuantity) {
      normalizedFlavors.push('');
    }
    while (normalizedBeanTypes.length < safeQuantity) {
      normalizedBeanTypes.push('');
    }

    const nextItem: MarmitaItem = {
      size: id,
      quantity: safeQuantity,
      flavors: id === 'feijoada' ? [] : normalizedFlavors,
      beanTypes: id === 'feijoada' ? [] : normalizedBeanTypes,
    };

    setValue('marmitaItems', [...currentItems, nextItem]);
  };

  const totalMarmitas = marmitaItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#1A1A1A]/60 mb-4">
        Escolha o tamanho da sua marmita
      </p>

      {availableSizes.map((option) => {
        const quantity = getQuantity(option.id);
        const isSelected = quantity > 0;

        return (
          <div
            key={option.id}
            className={`
              relative w-full text-left rounded-xl p-4 border-2 transition-colors
              ${isSelected
                ? 'border-[#E8611A] bg-[#FFF8F2]'
                : 'border-[#1A1A1A]/10 bg-white'
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

            <div className="flex items-start gap-3 sm:gap-4">
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

              <div className="flex items-center gap-2">
                <span className={`
                  text-base sm:text-lg font-bold flex-shrink-0
                  ${isSelected ? 'text-[#E8611A]' : 'text-[#1A1A1A]'}
                `}>
                  {option.priceDisplay}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-[#1A1A1A]/70">Quantidade</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(option.id, quantity - 1)}
                  className="w-9 h-9 rounded-lg border-2 border-[#1A1A1A]/10 text-[#1A1A1A] hover:border-[#E8611A]/50 transition-colors"
                  aria-label={`Diminuir ${option.label}`}
                >
                  -
                </button>
                <span className="w-8 text-center text-lg font-semibold text-[#1A1A1A]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(option.id, quantity + 1)}
                  className="w-9 h-9 rounded-lg border-2 border-[#1A1A1A]/10 text-[#1A1A1A] hover:border-[#E8611A]/50 transition-colors"
                  aria-label={`Aumentar ${option.label}`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="rounded-xl p-4 border-2 border-[#1A1A1A]/10 bg-white">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-[#1A1A1A]">Total de marmitas</p>
          <span className="text-2xl font-bold text-[#E8611A]">{totalMarmitas}</span>
        </div>
      </div>
    </div>
  );
}

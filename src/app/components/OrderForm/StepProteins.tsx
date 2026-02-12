import { UtensilsCrossed } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { DayMenu } from '../../data/menu';
import type { OrderFormData } from './types';

interface StepProteinsProps {
  todayMenu: DayMenu;
}

export function StepProteins({ todayMenu }: StepProteinsProps) {
  const { watch, setValue } = useFormContext<OrderFormData>();
  const selectedProteins = watch('proteins');

  const selectProtein = (protein: string) => {
    setValue('proteins', [protein]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <UtensilsCrossed className="w-5 h-5 text-[#E8611A]" />
        <p className="font-medium text-[#1A1A1A]">
          Cardápio de {todayMenu.day}-feira
        </p>
      </div>
      <p className="text-sm text-[#1A1A1A]/60 mb-4">
        Escolha sua mistura
      </p>

      {todayMenu.proteins.map((protein) => {
        const isSelected = selectedProteins.includes(protein);

        return (
          <button
            key={protein}
            type="button"
            onClick={() => selectProtein(protein)}
            className={`
              w-full text-left rounded-xl p-4 border-2 transition-colors
              ${isSelected
                ? 'border-[#E8611A] bg-[#FFF8F2]'
                : 'border-[#1A1A1A]/10 bg-white hover:border-[#E8611A]/40'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                ${isSelected
                  ? 'border-[#E8611A]'
                  : 'border-[#1A1A1A]/20'
                }
              `}>
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-[#E8611A]" />
                )}
              </div>
              <span className={`text-lg ${isSelected ? 'text-[#1A1A1A] font-medium' : 'text-[#1A1A1A]/80'}`}>
                {protein}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

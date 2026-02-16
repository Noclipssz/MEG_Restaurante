import { ChevronDown, UtensilsCrossed } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { DayMenu } from '../../data/menu';
import type { MarmitaItem, OrderFormData } from './types';
import { getSizeOption } from './utils';

interface StepProteinsProps {
  todayMenu: DayMenu;
}

export function StepProteins({ todayMenu }: StepProteinsProps) {
  const { watch, setValue } = useFormContext<OrderFormData>();
  const marmitaItems = watch('marmitaItems');

  const itemsWithFlavor = marmitaItems
    .filter((item) => item.size !== 'feijoada' && item.quantity > 0)
    .sort((a, b) => getSizeOption(a.size).price - getSizeOption(b.size).price);

  const flavorOptions: { label: string }[] = [
    ...todayMenu.proteins.map((protein) => ({ label: protein })),
  ];

  if (todayMenu.proteins.length === 2) {
    flavorOptions.push({
      label: `${todayMenu.proteins[0]} / ${todayMenu.proteins[1]}`,
    });
  }

  const updateItem = (updatedItem: MarmitaItem) => {
    const nextItems = marmitaItems.map((item) => (
      item.size === updatedItem.size ? updatedItem : item
    ));
    setValue('marmitaItems', nextItems);
  };

  const setFlavorAt = (item: MarmitaItem, index: number, flavor: string) => {
    const nextFlavors = [...item.flavors];
    nextFlavors[index] = flavor;
    updateItem({ ...item, flavors: nextFlavors });
  };

  const setBeanAt = (item: MarmitaItem, index: number, beanType: MarmitaItem['beanTypes'][number]) => {
    const nextBeanTypes = [...item.beanTypes];
    nextBeanTypes[index] = beanType;
    updateItem({ ...item, beanTypes: nextBeanTypes });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <UtensilsCrossed className="w-5 h-5 text-[#E8611A]" />
        <p className="font-medium text-[#1A1A1A]">
          Cardápio de {todayMenu.day}-feira
        </p>
      </div>
      <p className="text-sm text-[#1A1A1A]/60">
        Escolha o sabor de cada marmita para montar o pedido corretamente.
      </p>

      {itemsWithFlavor.length > 1 && (
        <div className="flex items-center gap-2 rounded-lg border border-[#E8611A]/20 bg-[#FFF8F2] px-3 py-2 text-sm text-[#C54D10]">
          <ChevronDown className="w-4 h-4" />
          <span>Role para baixo para preencher todas as marmitas.</span>
        </div>
      )}

      {itemsWithFlavor.map((item) => {
        const sizeOpt = getSizeOption(item.size);
        return (
          <div key={item.size} className="rounded-xl border-2 border-[#1A1A1A]/10 bg-white p-4 sm:p-5 space-y-4">
            <p className="font-medium text-[#1A1A1A] flex items-center justify-between gap-2">
              <span>{sizeOpt.label}</span>
              <span className="text-xs bg-[#E8611A]/10 text-[#E8611A] px-2 py-1 rounded-full">
                {item.quantity} unidade{item.quantity > 1 ? 's' : ''}
              </span>
            </p>

            <div className="space-y-2.5">
              {Array.from({ length: item.quantity }).map((_, index) => {
                const selectedFlavor = item.flavors[index] ?? '';
                const selectedBeanType = item.beanTypes[index] ?? '';
                return (
                  <div key={`${item.size}-${index}`} className="rounded-lg border border-[#1A1A1A]/10 p-3">
                    <label className="text-sm text-[#1A1A1A]/70 block mb-2">
                      Marmita {index + 1}
                    </label>
                    <select
                      value={selectedFlavor}
                      onChange={(event) => setFlavorAt(item, index, event.target.value)}
                      className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white px-3 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#E8611A]"
                    >
                      <option value="">Selecione o sabor</option>
                      {flavorOptions.map((option) => (
                        <option key={`${item.size}-${index}-${option.label}`} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <div className="mt-2.5">
                      <p className="text-xs text-[#1A1A1A]/60 mb-2">Feijão da marmita {index + 1}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'preto', label: 'Feijão preto' },
                          { id: 'branco', label: 'Feijão branco' },
                        ].map((option) => {
                          const isSelected = selectedBeanType === option.id;
                          return (
                            <button
                              key={`${item.size}-${index}-${option.id}`}
                              type="button"
                              onClick={() => setBeanAt(item, index, option.id as MarmitaItem['beanTypes'][number])}
                              className={`
                                rounded-lg p-2.5 border text-sm font-medium transition-colors
                                ${isSelected
                                  ? 'border-[#E8611A] bg-[#FFF8F2] text-[#1A1A1A]'
                                  : 'border-[#1A1A1A]/10 bg-white text-[#1A1A1A]/80 hover:border-[#E8611A]/40'
                                }
                              `}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

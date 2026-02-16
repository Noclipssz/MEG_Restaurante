import { Truck, MapPin, Wallet, GlassWater, ChevronDown } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { beverages } from '../../data/menu';
import type { OrderFormData, DeliveryMethod, PaymentMethod } from './types';
import { getDrinkQuantity } from './utils';

export function StepDelivery() {
  const { watch, setValue, register } = useFormContext<OrderFormData>();
  const deliveryMethod = watch('deliveryMethod');
  const paymentMethod = watch('paymentMethod');
  const selectedDrinks = watch('drinks');

  const options: { id: DeliveryMethod; label: string; description: string; icon: typeof Truck }[] = [
    { id: 'entrega', label: 'Entrega', description: 'Receba no seu endereço', icon: Truck },
    { id: 'retirada', label: 'Retirada', description: 'Buscar no restaurante', icon: MapPin },
  ];

  const paymentOptions: { id: PaymentMethod; label: string }[] = [
    { id: 'pix', label: 'Pix' },
    { id: 'dinheiro', label: 'Dinheiro' },
    { id: 'debito', label: 'Débito' },
    { id: 'credito', label: 'Crédito' },
  ];

  const setDrinkQuantity = (drinkId: string, next: number) => {
    const safeQuantity = Math.max(0, Math.min(20, next));
    const remaining = selectedDrinks.filter((item) => item.drinkId !== drinkId);

    if (safeQuantity === 0) {
      setValue('drinks', remaining);
      return;
    }

    setValue('drinks', [...remaining, { drinkId, quantity: safeQuantity }]);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#1A1A1A]/60 mb-4">
        Como deseja receber seu pedido?
      </p>

      {options.map((option) => {
        const isSelected = deliveryMethod === option.id;
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setValue('deliveryMethod', option.id)}
            className={`
              w-full text-left rounded-xl p-4 border-2 transition-colors
              ${isSelected
                ? 'border-[#E8611A] bg-[#FFF8F2]'
                : 'border-[#1A1A1A]/10 bg-white hover:border-[#E8611A]/40'
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                ${isSelected ? 'bg-[#E8611A] text-white' : 'bg-[#E8611A]/10 text-[#E8611A]'}
              `}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-[#1A1A1A]">{option.label}</p>
                <p className="text-sm text-[#1A1A1A]/60">{option.description}</p>
              </div>
            </div>
          </button>
        );
      })}

      <AnimatePresence>
        {deliveryMethod === 'entrega' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-2">
              <label className="text-sm font-medium text-[#1A1A1A]">
                Endereço de entrega
              </label>
              <input
                {...register('address')}
                placeholder="Rua, número, bairro..."
                className="w-full rounded-xl border-2 border-[#1A1A1A]/10 bg-white px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-[#E8611A] focus:outline-none transition-colors"
              />
              <p className="text-xs text-[#1A1A1A]/50">
                Entrega grátis até 2km
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-1 space-y-3">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-[#E8611A]" />
          <p className="font-medium text-[#1A1A1A]">Forma de pagamento</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {paymentOptions.map((option) => {
            const isSelected = paymentMethod === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setValue('paymentMethod', option.id)}
                className={`
                  rounded-xl p-3 border-2 text-sm font-medium transition-colors
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

      <div className="pt-1 space-y-3">
        <div className="flex items-center gap-2">
          <GlassWater className="w-5 h-5 text-[#E8611A]" />
          <p className="font-medium text-[#1A1A1A]">Bebidas (opcional)</p>
        </div>
        {beverages.length > 4 && (
          <div className="flex items-center gap-2 rounded-lg border border-[#E8611A]/20 bg-[#FFF8F2] px-3 py-2 text-sm text-[#C54D10]">
            <ChevronDown className="w-4 h-4" />
            <span>Role para baixo para ver todas as bebidas.</span>
          </div>
        )}
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {beverages.map((drink) => {
            const quantity = getDrinkQuantity(selectedDrinks, drink.id);
            const isSelected = quantity > 0;
            return (
              <div
                key={drink.id}
                className={`
                  w-full rounded-xl p-3 border-2 text-left transition-colors
                  ${isSelected
                    ? 'border-[#E8611A] bg-[#FFF8F2]'
                    : 'border-[#1A1A1A]/10 bg-white hover:border-[#E8611A]/40'
                  }
                `}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-[#1A1A1A] min-w-0 pr-2 break-words">{drink.label}</span>
                  <span className="text-sm font-semibold text-[#1A1A1A] flex-shrink-0">{drink.priceDisplay}</span>
                </div>
                <div className="mt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDrinkQuantity(drink.id, quantity - 1)}
                    className="w-8 h-8 rounded-md border border-[#1A1A1A]/20 text-[#1A1A1A]"
                    aria-label={`Diminuir ${drink.label}`}
                  >
                    -
                  </button>
                  <span className="w-7 text-center text-sm font-semibold text-[#1A1A1A]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setDrinkQuantity(drink.id, quantity + 1)}
                    className="w-8 h-8 rounded-md border border-[#1A1A1A]/20 text-[#1A1A1A]"
                    aria-label={`Aumentar ${drink.label}`}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

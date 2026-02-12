import { Truck, MapPin } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import type { OrderFormData, DeliveryMethod } from './types';

export function StepDelivery() {
  const { watch, setValue, register } = useFormContext<OrderFormData>();
  const deliveryMethod = watch('deliveryMethod');

  const options: { id: DeliveryMethod; label: string; description: string; icon: typeof Truck }[] = [
    { id: 'entrega', label: 'Entrega', description: 'Receba no seu endereço', icon: Truck },
    { id: 'retirada', label: 'Retirada', description: 'Buscar no restaurante', icon: MapPin },
  ];

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
    </div>
  );
}

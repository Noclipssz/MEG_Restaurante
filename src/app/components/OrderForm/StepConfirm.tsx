import { Pencil } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { WhatsAppIcon } from '../WhatsAppIcon';
import type { DayMenu } from '../../data/menu';
import type { OrderFormData } from './types';
import {
  calculateOrderTotal,
  getDrinkLabel,
  getSizeOption,
  openWhatsAppWithOrder,
} from './utils';

interface StepConfirmProps {
  todayMenu: DayMenu;
  onClose: () => void;
  setStep: (step: number) => void;
}

function SummaryRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-[#1A1A1A]/50 uppercase tracking-wide">{label}</p>
        <p className="text-[#1A1A1A] font-medium whitespace-pre-wrap break-words">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="p-2 text-[#E8611A] hover:bg-[#E8611A]/10 rounded-lg transition-colors flex-shrink-0"
        aria-label={`Editar ${label}`}
      >
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  );
}

export function StepConfirm({ todayMenu, onClose, setStep }: StepConfirmProps) {
  const { watch, register } = useFormContext<OrderFormData>();
  const data = watch();
  const total = calculateOrderTotal(data);

  const marmitaSummary = data.marmitaItems
    .map((item) => `${item.quantity}x ${getSizeOption(item.size).label}`)
    .join(' / ');

  const flavorSummary = data.marmitaItems
    .filter((item) => item.size !== 'feijoada')
    .map((item) => {
      const sizeLabel = getSizeOption(item.size).label;
      const units = item.flavors.map((flavor, index) => {
        const beanType = item.beanTypes[index];
        const beanLabel = beanType === 'preto'
          ? 'Feijão preto'
          : beanType === 'branco'
            ? 'Feijão branco'
            : 'Feijão não selecionado';
        return `${index + 1}) ${flavor} (${beanLabel})`;
      }).join(', ');
      return `${sizeLabel}: ${units}`;
    })
    .join(' | ');

  const handleSend = () => {
    openWhatsAppWithOrder(data, todayMenu.day);
    onClose();
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#1A1A1A]/60 mb-2">
        Confira seu pedido antes de enviar
      </p>

      {/* Order Summary */}
      <div className="rounded-xl border-2 border-[#E8611A]/20 bg-[#FFF8F2] p-4 space-y-3">
        <SummaryRow
          label="Marmitas"
          value={marmitaSummary}
          onEdit={() => setStep(1)}
        />
        {flavorSummary && (
          <>
            <SummaryRow
              label="Sabores"
              value={flavorSummary}
              onEdit={() => setStep(2)}
            />
          </>
        )}
        <SummaryRow
          label="Pagamento"
          value={
            data.paymentMethod === 'pix'
              ? 'Pix'
              : data.paymentMethod === 'dinheiro'
                ? 'Dinheiro'
                : data.paymentMethod === 'debito'
                  ? 'Cartão de débito'
                  : 'Cartão de crédito'
          }
          onEdit={() => setStep(3)}
        />
        {data.drinks.length > 0 && (
          <SummaryRow
            label="Bebidas"
            value={data.drinks.map((drink) => `${drink.quantity}x ${getDrinkLabel(drink.drinkId)}`).join(' / ')}
            onEdit={() => setStep(3)}
          />
        )}
        <SummaryRow
          label={data.deliveryMethod === 'entrega' ? 'Entrega' : 'Retirada'}
          value={data.deliveryMethod === 'entrega' ? data.address : 'Retirada no local'}
          onEdit={() => setStep(3)}
        />
        <div className="pt-2 border-t border-[#E8611A]/20 flex items-center justify-between">
          <p className="text-sm text-[#1A1A1A]/70">Total do pedido</p>
          <p className="text-xl font-bold text-[#1A1A1A]">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
          </p>
        </div>
      </div>

      {/* Optional Fields */}
      <div className="space-y-3 pt-2">
        <div>
          <label className="text-sm font-medium text-[#1A1A1A]">
            Seu nome <span className="text-[#1A1A1A]/40">(opcional)</span>
          </label>
          <input
            {...register('customerName')}
            placeholder="Como podemos te chamar?"
            className="mt-1 w-full rounded-xl border-2 border-[#1A1A1A]/10 bg-white px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-[#E8611A] focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[#1A1A1A]">
            Observações <span className="text-[#1A1A1A]/40">(opcional)</span>
          </label>
          <textarea
            {...register('observations')}
            placeholder="Alguma observação? Ex: sem cebola..."
            rows={2}
            className="mt-1 w-full rounded-xl border-2 border-[#1A1A1A]/10 bg-white px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-[#E8611A] focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {/* Send Button */}
      <button
        type="button"
        onClick={handleSend}
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium py-4 rounded-xl transition-colors active:scale-[0.98]"
      >
        <WhatsAppIcon className="w-5 h-5" />
        Enviar Pedido pelo WhatsApp
      </button>
    </div>
  );
}

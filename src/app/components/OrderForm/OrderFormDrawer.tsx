import { FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '../ui/drawer';
import { useIsMobile } from '../ui/use-mobile';
import { useOrderFormDrawer } from './OrderFormContext';
import { useOrderForm } from './useOrderForm';
import { StepSize } from './StepSize';
import { StepProteins } from './StepProteins';
import { StepDelivery } from './StepDelivery';
import { StepConfirm } from './StepConfirm';

const stepLabels: Record<number, string> = {
  1: 'Tamanho',
  2: 'Misturas',
  3: 'Entrega',
  4: 'Confirmar',
};

export function OrderFormDrawer() {
  const { isOpen, closeOrderForm } = useOrderFormDrawer();
  const isMobile = useIsMobile();
  const {
    step,
    setStep,
    nextStep,
    prevStep,
    canAdvance,
    displayStep,
    totalSteps,
    form,
    todayMenu,
    saturday,
    sunday,
    reset,
  } = useOrderForm();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeOrderForm();
      // Reset form after close animation
      setTimeout(reset, 300);
    }
  };

  const handleClose = () => {
    closeOrderForm();
    setTimeout(reset, 300);
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={handleOpenChange}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerContent className={isMobile ? '' : '!w-[460px] !max-w-[460px]'}>
        <FormProvider {...form}>
          {/* Header */}
          <DrawerHeader className="border-b border-[#1A1A1A]/10 pb-4">
            <div className="flex items-center justify-between">
              <DrawerTitle className="font-serif text-xl text-[#1A1A1A]">
                Fazer Pedido
              </DrawerTitle>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 text-[#1A1A1A]/50 hover:text-[#1A1A1A] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress */}
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs text-[#1A1A1A]/50">
                <span>Passo {displayStep} de {totalSteps}</span>
                <span>{stepLabels[step]}</span>
              </div>
              <div className="h-1.5 bg-[#1A1A1A]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#E8611A] rounded-full"
                  initial={false}
                  animate={{ width: `${(displayStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Sunday notice */}
            {sunday && (
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm text-amber-800">
                Estamos fechados aos domingos. Mostrando o cardápio de segunda-feira.
              </div>
            )}
          </DrawerHeader>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 && <StepSize saturday={saturday} />}
                {step === 2 && <StepProteins todayMenu={todayMenu} />}
                {step === 3 && <StepDelivery />}
                {step === 4 && (
                  <StepConfirm
                    todayMenu={todayMenu}
                    onClose={handleClose}
                    setStep={setStep}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Navigation (hidden on confirm step - it has its own send button) */}
          {step < 4 && (
            <DrawerFooter className="border-t border-[#1A1A1A]/10 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="flex flex-col sm:flex-row gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border-2 border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:border-[#1A1A1A]/30 transition-colors font-medium sm:w-auto"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </button>
                )}
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canAdvance()}
                  className="flex-1 py-3 rounded-xl bg-[#E8611A] hover:bg-[#C54D10] disabled:bg-[#1A1A1A]/20 disabled:cursor-not-allowed text-white font-medium transition-colors active:scale-[0.98]"
                >
                  Continuar
                </button>
              </div>
            </DrawerFooter>
          )}
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
}

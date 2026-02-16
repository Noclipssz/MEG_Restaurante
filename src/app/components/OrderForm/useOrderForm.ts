import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { getTodayMenu, isSaturday, isSunday } from '../../data/menu';
import type { OrderFormData } from './types';
import { hasFlavorStep } from './utils';

export function useOrderForm() {
  const [step, setStep] = useState(1);

  const todayMenu = useMemo(() => getTodayMenu(), []);
  const saturday = useMemo(() => isSaturday(), []);
  const sunday = useMemo(() => isSunday(), []);

  const form = useForm<OrderFormData>({
    defaultValues: {
      marmitaItems: [],
      drinks: [],
      deliveryMethod: 'entrega',
      paymentMethod: '',
      address: '',
      customerName: '',
      observations: '',
    },
  });

  // Watch all values reactively for canAdvance
  const watchedValues = form.watch();
  const shouldShowFlavorStep = hasFlavorStep(watchedValues);

  const totalSteps = shouldShowFlavorStep ? 4 : 3;

  // Converte step interno para step visual (para exibição)
  const displayStep = useMemo(() => {
    if (!shouldShowFlavorStep) {
      if (step === 1) return 1;
      if (step === 3) return 2;
      if (step === 4) return 3;
    }
    return step;
  }, [step, shouldShowFlavorStep]);

  const nextStep = () => {
    if (step === 1 && !shouldShowFlavorStep) {
      setStep(3);
    } else {
      setStep(s => Math.min(s + 1, 4));
    }
  };

  const prevStep = () => {
    if (step === 3 && !shouldShowFlavorStep) {
      setStep(1);
    } else {
      setStep(s => Math.max(s - 1, 1));
    }
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case 1:
        return watchedValues.marmitaItems.some((item) => item.quantity > 0);
      case 2: {
        const itemsWithFlavor = watchedValues.marmitaItems.filter(
          (item) => item.size !== 'feijoada' && item.quantity > 0,
        );

        if (itemsWithFlavor.length === 0) {
          return true;
        }

        return itemsWithFlavor.every((item) => {
          const validFlavors = item.flavors.length === item.quantity && item.flavors.every((value) => value.trim().length > 0);
          const validBeans = item.beanTypes.length === item.quantity && item.beanTypes.every((value) => value !== '');
          return validFlavors && validBeans;
        });
      }
      case 3: {
        if (!watchedValues.paymentMethod) {
          return false;
        }
        if (watchedValues.deliveryMethod === 'entrega') {
          return watchedValues.address.trim().length >= 5;
        }
        return true;
      }
      case 4: return true;
      default: return false;
    }
  };

  const reset = () => {
    setStep(1);
    form.reset();
  };

  return {
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
  };
}

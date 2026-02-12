import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { getTodayMenu, isSaturday, isSunday } from '../../data/menu';
import type { OrderFormData } from './types';

export function useOrderForm() {
  const [step, setStep] = useState(1);

  const todayMenu = useMemo(() => getTodayMenu(), []);
  const saturday = useMemo(() => isSaturday(), []);
  const sunday = useMemo(() => isSunday(), []);

  const form = useForm<OrderFormData>({
    defaultValues: {
      size: 'M',
      proteins: [],
      deliveryMethod: 'entrega',
      address: '',
      customerName: '',
      observations: '',
    },
  });

  // Watch all values reactively for canAdvance
  const watchedValues = form.watch();
  const currentSize = watchedValues.size;

  // Se escolheu feijoada, pula passo 2 (proteínas)
  // Passos efetivos: 1(tamanho) → 3(entrega) → 4(confirmar) = 3 passos visuais
  const totalSteps = currentSize === 'feijoada' ? 3 : 4;

  // Converte step interno para step visual (para exibição)
  const displayStep = useMemo(() => {
    if (currentSize === 'feijoada') {
      if (step === 1) return 1;
      if (step === 3) return 2;
      if (step === 4) return 3;
    }
    return step;
  }, [step, currentSize]);

  const nextStep = () => {
    if (step === 1 && currentSize === 'feijoada') {
      setStep(3); // pula proteínas
    } else {
      setStep(s => Math.min(s + 1, 4));
    }
  };

  const prevStep = () => {
    if (step === 3 && currentSize === 'feijoada') {
      setStep(1); // volta direto pro tamanho
    } else {
      setStep(s => Math.max(s - 1, 1));
    }
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case 1: return !!watchedValues.size;
      case 2: return watchedValues.proteins.length > 0;
      case 3: {
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

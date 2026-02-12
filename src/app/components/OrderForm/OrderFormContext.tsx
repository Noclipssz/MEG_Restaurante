import { createContext, useContext, useState, type ReactNode } from 'react';

interface OrderFormContextValue {
  isOpen: boolean;
  openOrderForm: () => void;
  closeOrderForm: () => void;
}

const OrderFormContext = createContext<OrderFormContextValue | null>(null);

export function OrderFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <OrderFormContext.Provider value={{
      isOpen,
      openOrderForm: () => setIsOpen(true),
      closeOrderForm: () => setIsOpen(false),
    }}>
      {children}
    </OrderFormContext.Provider>
  );
}

export function useOrderFormDrawer() {
  const ctx = useContext(OrderFormContext);
  if (!ctx) throw new Error('useOrderFormDrawer must be used within OrderFormProvider');
  return ctx;
}

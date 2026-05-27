import { useCallback, useState } from "react";

export interface DisclosureControls {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpen: (v: boolean) => void;
}

/**
 * Hook para manejar el estado abierto/cerrado de modals, drawers, popovers, etc.
 * @example
 *   const dialog = useDisclosure();
 *   <Dialog open={dialog.isOpen} onOpenChange={dialog.setOpen}>...</Dialog>
 */
export function useDisclosure(initial = false): DisclosureControls {
  const [isOpen, setOpen] = useState(initial);
  return {
    isOpen,
    open: useCallback(() => setOpen(true), []),
    close: useCallback(() => setOpen(false), []),
    toggle: useCallback(() => setOpen((v) => !v), []),
    setOpen,
  };
}

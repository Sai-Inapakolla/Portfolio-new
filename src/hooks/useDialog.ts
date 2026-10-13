import { useEffect, useRef } from 'react';

/** Native modal dialogs provide focus containment and make the background inert. */
export function useDialog(onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    dialog.querySelector<HTMLElement>('[data-dialog-initial]')?.focus({ preventScroll: true });
    const cancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    const trapTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), iframe, [tabindex]:not([tabindex="-1"])',
      )).filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0 && !element.closest('[inert]'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first) { event.preventDefault(); dialog.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    dialog.addEventListener('keydown', trapTab);
    dialog.addEventListener('cancel', cancel);
    return () => {
      dialog.removeEventListener('keydown', trapTab);
      dialog.removeEventListener('cancel', cancel);
      dialog.close();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [onClose]);
  return ref;
}

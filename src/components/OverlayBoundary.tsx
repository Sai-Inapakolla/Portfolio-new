import { Component, type ReactNode } from 'react';
import { useDialog } from '../hooks/useDialog';
import { useScrollLock } from '../hooks/smoothScroll';

function Failure({ onClose }: { onClose: () => void }) {
  const ref = useDialog(onClose);
  useScrollLock(true);
  return <dialog ref={ref} aria-label="Unable to open content" className="fixed inset-0 flex items-center justify-center bg-ink/95">
    <div className="max-w-md p-6 text-center">
      <h2 className="text-xl font-semibold">This content could not load</h2>
      <p className="mt-3 text-mist">Return to the portfolio, or reload to get the latest version.</p>
      <button data-dialog-initial onClick={onClose} className="mt-6 rounded bg-bone px-5 py-3 text-ink">Back to portfolio</button>
      <button onClick={() => window.location.reload()} className="ml-3 rounded border px-5 py-3">Reload</button>
    </div>
  </dialog>;
}

export default class OverlayBoundary extends Component<{ children: ReactNode; onClose: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Failure onClose={this.props.onClose} /> : this.props.children; }
}

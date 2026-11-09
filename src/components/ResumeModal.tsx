import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useDialog } from '../hooks/useDialog';
import { useScrollLock } from '../hooks/smoothScroll';
import { useMedia } from '../hooks/useMedia';
import { EASE } from './fx';
import { ResumeSheet } from './ResumeViewer';

/** Full-screen resume viewer. Supports local PDF or external Google Drive / cloud link. */
export default function ResumeModal({ onClose }: { onClose: () => void }) {
  useScrollLock(true);
  const dialog = useDialog(onClose);
  const small = useMedia('(max-width: 767px)');
  const { profile } = usePortfolio();

  const isExternal = profile.resumePdf.startsWith('http');
  const iframeSrc = profile.resumePdf.includes('drive.google.com')
    ? profile.resumePdf.replace(/\/view(\?.*)?$/, '/preview')
    : profile.resumePdf;

  return (
    <motion.dialog
      ref={dialog}
      className="fixed inset-0 z-[140] flex flex-col bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      aria-label="Resume"
    >
      <div className="gutter flex h-16 shrink-0 items-center justify-between gap-3 pt-[env(safe-area-inset-top)]">
        <p className="truncate font-display text-2xl tracking-wide text-bone">The Full Story</p>
        <div className="flex items-center gap-2">
          {profile.resumePdf && (isExternal ? (
            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-bone px-4 py-2 text-xs font-bold text-ink hover:bg-white"
            >
              ↗ Open Link
            </a>
          ) : (
            <a
              href={profile.resumePdf}
              download="Resume.pdf"
              className="rounded-md bg-bone px-4 py-2 text-xs font-bold text-ink hover:bg-white"
            >
              ⤓ Download
            </a>
          ))}
          <button
            data-dialog-initial
            type="button"
            onClick={onClose}
            aria-label="Close resume"
            data-cursor="close"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20"
          >
            ✕
          </button>
        </div>
      </div>
      <motion.div
        className="gutter min-h-0 flex-1 pb-6"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {small ? (
          <div data-lenis-prevent className="h-full overflow-y-auto">
            <ResumeSheet />
            {profile.resumePdf && (
              <a
                href={profile.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="glass mt-4 flex min-h-12 items-center justify-center rounded-md text-sm font-semibold text-bone hover:bg-white/15"
              >
                {isExternal ? 'Open Cloud Resume ↗' : 'Open original PDF ↗'}
              </a>
            )}
          </div>
        ) : profile.resumePdf ? (
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#14141c]">
            <iframe
              title={`${profile.displayName} resume`}
              src={`${iframeSrc}#view=FitH`}
              className="h-full w-full rounded-xl bg-white"
            />
            {isExternal && (
              <div className="absolute bottom-3 right-3">
                <a
                  href={profile.resumePdf}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-black/80 px-4 py-2 text-xs font-bold text-bone backdrop-blur hover:bg-black"
                >
                  Open in New Tab ↗
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full overflow-y-auto rounded-xl bg-[#14141c]">
            <ResumeSheet />
          </div>
        )}
      </motion.div>
    </motion.dialog>
  );
}

import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useDialog } from '../hooks/useDialog';
import { useScrollLock } from '../hooks/smoothScroll';
import { useMedia } from '../hooks/useMedia';
import { formatResumeLinks } from '../utils/resumeLink';
import { EASE } from './fx';
import { ResumeSheet } from './ResumeViewer';

/** Full-screen resume viewer. Supports Google Drive link preview, direct PDF, or cloud resume with instant download. */
export default function ResumeModal({ onClose }: { onClose: () => void }) {
  useScrollLock(true);
  const dialog = useDialog(onClose);
  const small = useMedia('(max-width: 767px)');
  const { profile } = usePortfolio();

  const resumeLinks = formatResumeLinks(profile.resumePdf);

  return (
    <motion.dialog
      ref={dialog}
      data-lenis-prevent
      className="fixed inset-0 z-[140] flex flex-col bg-black/95 md:backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      aria-label="Resume"
    >
      <div className="gutter flex h-16 shrink-0 items-center justify-between gap-3 pt-[env(safe-area-inset-top)]">
        <p className="truncate font-display text-2xl tracking-wide text-bone">The Full Story</p>
        <div className="flex items-center gap-2">
          {profile.resumePdf && (
            <>
              <a
                href={resumeLinks.downloadUrl}
                target={resumeLinks.isExternal ? '_blank' : undefined}
                rel={resumeLinks.isExternal ? 'noreferrer' : undefined}
                download={resumeLinks.isExternal ? undefined : 'Resume.pdf'}
                className="flex items-center gap-1.5 rounded-md bg-bone px-3.5 py-2 text-xs font-bold text-ink transition hover:bg-white sm:px-4"
              >
                <span>⤓</span> Download Resume
              </a>
              {resumeLinks.isExternal && (
                <a
                  href={resumeLinks.directUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden rounded-md border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-bone transition hover:bg-white/10 sm:inline-flex"
                >
                  {resumeLinks.isGoogleDrive ? '↗ Open in Drive' : '↗ Open Link'}
                </a>
              )}
            </>
          )}
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
              <div className="mt-4 flex flex-col gap-2 pb-6">
                <a
                  href={resumeLinks.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-crimson text-sm font-bold text-white shadow-lg transition hover:bg-crimson-2"
                >
                  <span>⤓</span> Download Resume
                </a>
                <a
                  href={resumeLinks.directUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex min-h-12 items-center justify-center rounded-md text-sm font-semibold text-bone hover:bg-white/15"
                >
                  {resumeLinks.isGoogleDrive ? 'Open in Google Drive ↗' : 'Open in New Tab ↗'}
                </a>
              </div>
            )}
          </div>
        ) : profile.resumePdf ? (
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#14141c]">
            <iframe
              title={`${profile.displayName} resume`}
              src={resumeLinks.previewUrl}
              className="h-full w-full rounded-xl bg-white"
              allow="autoplay"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <a
                href={resumeLinks.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-crimson px-4 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-crimson-2"
              >
                <span>⤓</span> Download
              </a>
              {resumeLinks.isExternal && (
                <a
                  href={resumeLinks.directUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-black/80 px-4 py-2 text-xs font-bold text-bone backdrop-blur transition hover:bg-black"
                >
                  Open in New Tab ↗
                </a>
              )}
            </div>
          </div>
        ) : (
          <div data-lenis-prevent className="h-full overflow-y-auto rounded-xl bg-[#14141c]">
            <ResumeSheet />
          </div>
        )}
      </motion.div>
    </motion.dialog>
  );
}

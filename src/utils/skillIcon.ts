/** Normalizes and validates user-provided skill icon URLs, with Google Drive share-link support. */
export function normalizeSkillIconUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';

  const trimmed = rawUrl.trim();
  if (!trimmed) return '';

  if (trimmed.includes('drive.google.com')) {
    const match =
      trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    if (match?.[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w256`;
    }
  }

  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('/') ||
    /^data:image\/(png|jpeg|jpg|webp|gif|avif);base64,/i.test(trimmed)
  ) {
    return trimmed;
  }

  return '';
}


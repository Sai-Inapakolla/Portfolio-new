export type FormattedResume = {
  isExternal: boolean;
  previewUrl: string;
  downloadUrl: string;
  directUrl: string;
  isGoogleDrive: boolean;
};

export function formatResumeLinks(rawUrl: string): FormattedResume {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      isExternal: false,
      previewUrl: '',
      downloadUrl: '',
      directUrl: '',
      isGoogleDrive: false,
    };
  }

  const trimmed = rawUrl.trim();
  const isExternal = trimmed.startsWith('http://') || trimmed.startsWith('https://');
  const isGoogleDrive = trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com');

  if (isGoogleDrive) {
    // Extract file ID from various Google Drive link formats:
    // 1. https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // 2. https://drive.google.com/open?id=FILE_ID
    // 3. https://drive.google.com/uc?id=FILE_ID
    // 4. https://docs.google.com/document/d/FILE_ID/edit
    const match =
      trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    const fileId = match ? match[1] : '';

    if (fileId) {
      return {
        isExternal: true,
        previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
        downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
        directUrl: trimmed,
        isGoogleDrive: true,
      };
    }
  }

  return {
    isExternal,
    previewUrl: trimmed,
    downloadUrl: trimmed,
    directUrl: trimmed,
    isGoogleDrive: false,
  };
}


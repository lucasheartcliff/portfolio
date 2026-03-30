import React, { useCallback, useEffect, useState } from 'react';

interface ImageLightboxProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image preview'}
      style={{
        backgroundColor: visible ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0)',
        transition: 'background-color 0.2s ease',
      }}
    >
      <button
        onClick={handleClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-sm transition-colors hover:bg-white/25"
      >
        ✕
      </button>

      <span className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white/70 backdrop-blur-sm">
        {zoomed ? 'Click to fit' : 'Click image to zoom · Esc to close'}
      </span>

      <img
        src={src}
        alt={alt || ''}
        onClick={(e) => {
          e.stopPropagation();
          setZoomed((z) => !z);
        }}
        className="block"
        style={{
          maxWidth: zoomed ? 'none' : '90vw',
          maxHeight: zoomed ? 'none' : '85vh',
          width: zoomed ? 'auto' : undefined,
          objectFit: 'contain',
          cursor: zoomed ? 'zoom-out' : 'zoom-in',
          borderRadius: '0.5rem',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          transform: visible ? 'scale(1)' : 'scale(0.92)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.2s ease, opacity 0.2s ease',
        }}
      />
    </div>
  );
}

interface ClickableImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function ClickableImage({ src, alt, className }: ClickableImageProps) {
  const [open, setOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      <img
        src={src}
        alt={alt || ''}
        className={className}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        style={{ cursor: 'zoom-in' }}
      />
      {open && (
        <ImageLightbox src={src} alt={alt} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export default ImageLightbox;

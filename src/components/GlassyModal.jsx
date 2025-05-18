import React, { useEffect, useRef } from 'react';

const GlassyModal = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef(null);

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen) return;
    const focusable = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
    const handleTab = (e) => {
      if (!isOpen) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="glassy-modal-overlay"
      aria-modal="true"
      role="dialog"
      aria-label={title || 'Dialog'}
      tabIndex={-1}
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(30,30,60,0.25)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <div
        className="glassy-modal glassmorphic-card fade-in-up"
        ref={modalRef}
        style={{
          minWidth: 320, maxWidth: 420, width: '90vw', padding: 32, borderRadius: 24,
          background: 'rgba(255,255,255,0.22)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#6f86d6', cursor: 'pointer', fontWeight: 700 }}
        >
          ×
        </button>
        {title && <h2 style={{ marginBottom: 18, color: '#2d1e6b', fontWeight: 700 }}>{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default GlassyModal; 
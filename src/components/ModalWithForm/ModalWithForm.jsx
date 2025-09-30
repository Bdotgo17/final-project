import "./ModalWithForm.css";
import { useEffect } from "react";
import closeIcon from "../../assets/close.svg";

function ModalWithForm({ isOpen, onClose, className = "", children }) {
  useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="ModalWithForm__overlay" onClick={handleOverlayClick}>
      <div className={`ModalWithForm ${className}`}>
        <button
          className="ModalWithForm__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={closeIcon} alt="Close" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default ModalWithForm;

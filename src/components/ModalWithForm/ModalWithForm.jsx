import "./ModalWithForm.css";
import { useEffect } from "react";
import closeIcon from "../../assets/close.svg";

function ModalWithForm({
  isOpen,
  onClose,
  onSubmit = () => {},
  className = "",
  title,
  children,
}) {
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
    <div className="modal-with-form__overlay" onClick={handleOverlayClick}>
      <div className={`modal-with-form ${className}`}>
        <button
          className="modal-with-form__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={closeIcon} alt="Close" />
        </button>
        
        {title && <h2 className="modal-with-form__title">{title}</h2>}

        <form
          className={`modal-with-form__form ${className}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;

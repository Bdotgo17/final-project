import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose }) {
  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose}>
      <div className="RegisterModal">RegisterModal</div>
    </ModalWithForm>
  );
}

export default RegisterModal;

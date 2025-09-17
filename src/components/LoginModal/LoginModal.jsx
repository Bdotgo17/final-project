import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose }) {
  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose}>
      <div className="LoginModal">LoginModal</div>
    </ModalWithForm>
  );
}

export default LoginModal;

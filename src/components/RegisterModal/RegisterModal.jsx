import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onLoginClick }) {
  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose}>
      <h2 className="modal-title">Sign Up</h2>
      <form className="register-form">
        <input
          type="email"
          placeholder="Email"
          required
          className="modal-input"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="modal-input"
        />
        <button type="submit" className="modal-btn">
          Sign Up
        </button>
      </form>
      <button className="modal-btn secondary" onClick={onLoginClick}>
        Sign In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;

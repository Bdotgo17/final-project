import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onRegisterClick }) {
  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose}>
      <h2 className="modal-title">Sign In</h2>
      <form className="login-form">
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
          Sign In
        </button>
      </form>
      <button className="modal-btn secondary" onClick={onRegisterClick}>
        Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;

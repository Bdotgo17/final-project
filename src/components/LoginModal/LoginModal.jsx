import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onRegisterClick, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  // Simple email validation regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showEmailError = emailTouched && email && !isValidEmail(email);

  const isActive = isValidEmail(email) && password.trim() !== "";

  function handleSubmit(e) {
    e.preventDefault();
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      onSignIn(user.username);
      onClose();
    } else {
      // handle error (user not found or wrong email)
      // e.g., set an error state and show a message
    }
  }

  if (!isOpen) return null;

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose}>
      <h2 className="modal-title">Sign In</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="modal-label" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter email"
          required
          className="modal-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
        />
        {showEmailError && (
          <span className="input-error">Invalid email address</span>
        )}
        <label className="modal-label" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter password"
          required
          className="modal-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className={`modal-btn${isActive ? " active" : ""}`}
          disabled={!isActive}
        >
          Sign In
        </button>
      </form>
      <button className="modal-btn secondary" onClick={onRegisterClick}>
        <span style={{ color: "#111" }}>or</span> <span>Sign Up</span>
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;

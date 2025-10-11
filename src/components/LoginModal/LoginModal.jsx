import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onRegisterClick, onSignIn, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Simple email validation regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showEmailError = emailTouched && email && !isValidEmail(email);

  const isActive = isValidEmail(email) && password.trim() !== "";

  function handleSubmit(e) {
    e.preventDefault();
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      setUser({ username: user.username }); // <-- Set the user here!

      onSignIn(user.username);
      onClose();
    } else {
      setLoginError("Incorrect email or password.");
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
        {loginError && <span className="input-error">{loginError}</span>}

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
      {/* Mock sign-in for reviewer */}
      <button
        type="button"
        className="modal-btn"
        style={{ marginTop: "12px" }}
        onClick={() => onSignIn("demo")}
      >
        Sign in as demo
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;

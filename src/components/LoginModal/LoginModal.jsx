import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onRegisterClick, onSignIn, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [loginError, setLoginError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showEmailError = emailTouched && email && !isValidEmail(email);
  const isActive = isValidEmail(email) && password.trim() !== "";

  function handleSubmit(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      setUser({ username: user.username });
      onSignIn(user.username);
      onClose();
    } else {
      setLoginError("Incorrect email or password.");
    }
  }

  if (!isOpen) return null;

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose}>
      <form className="login-modal__form" onSubmit={handleSubmit}>
        <h2 className="login-modal__title">Sign In</h2>
        <label className="login-modal__label" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter email"
          required
          className="login-modal__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
        />
        {showEmailError && (
          <span className="login-modal__input-error">
            Invalid email address
          </span>
        )}
        <label className="login-modal__label" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter password"
          required
          className="login-modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError && (
          <span className="login-modal__input-error">{loginError}</span>
        )}

        <button
          type="submit"
          className={`login-modal__btn${
            isActive ? " login-modal__btn--active" : ""
          }`}
          disabled={!isActive}
        >
          Sign In
        </button>

        <div className="login-modal__btn-or-row">
          <button
            className="login-modal__btn login-modal__btn--secondary"
            type="button"
            onClick={onRegisterClick}
          >
            <span className="login-modal__btn-or">or</span>&nbsp;
            <span className="login-modal__btn-signup">Sign up</span>
          </button>
        </div>

        <button
          type="button"
          className="login-modal__btn login-modal__btn--demo"
          style={{ marginTop: "12px" }}
          onClick={() => onSignIn("demo")}
        >
          Sign in as demo
        </button>
      </form>
    </ModalWithForm>
  );
}

export default LoginModal;

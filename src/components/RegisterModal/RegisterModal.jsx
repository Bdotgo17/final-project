import { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onLoginClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailTaken, setEmailTaken] = useState(false); // <-- new state
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const isActive =
    username.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.trim() !== "";

  // Simulate checking if email is taken (replace with real check)
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Sign Up clicked", { email, username, password });

    // Save to localStorage for demo
    localStorage.setItem("user", JSON.stringify({ email, username, password }));
    setRegistrationSuccess(true);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      className={`register-modal${
        registrationSuccess ? " register-modal--success" : ""
      }`}
    >
      {" "}
      {registrationSuccess ? (
        <>
          <h2 className="register-modal__title">
            Registration successfully completed!
          </h2>
          <button
            className="register-modal__success-signin-btn"
            onClick={() => {
              setRegistrationSuccess(false);
              onLoginClick(); // Open sign in modal
            }}
          >
            Sign In
          </button>
        </>
      ) : (
        <>
          <h2 className="register-modal__title">Sign Up</h2>
          <form className="register-modal__form" onSubmit={handleSubmit}>
            <label className="register-modal__label" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              placeholder="Enter Email"
              required
              className="register-modal__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              className="register-modal__label"
              htmlFor="register-password"
            >
              Password
            </label>
            <input
              id="register-password"
              type="password"
              placeholder="Enter Password"
              required
              className="register-modal__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              className="register-modal__label"
              htmlFor="register-username"
            >
              Username
            </label>
            <input
              id="register-username"
              type="text"
              placeholder="Enter username"
              required
              className="register-modal__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {emailTaken && (
              <div className="register-modal__input-error">
                This email is not available
              </div>
            )}
            <button
              type="submit"
              className={`register-modal__btn${
                isActive ? " register-modal__btn--active" : ""
              }`}
              disabled={!isActive}
            >
              Sign Up
            </button>
          </form>
          <button
            className="register-modal__btn register-modal__btn--secondary"
            onClick={onLoginClick}
          >
            <span style={{ color: "#111" }}>or</span> <span>Sign In</span>
          </button>
        </>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;

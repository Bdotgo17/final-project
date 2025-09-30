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
    // Example: if email is "test@used.com", show error
    if (email === "test@used.com") {
      setEmailTaken(true);
    } else {
      setEmailTaken(false);
      setRegistrationSuccess(true); // Show success message
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      className={`register-modal-form${registrationSuccess ? " success" : ""}`}
    >
      {" "}
      {registrationSuccess ? (
        <>
          <h2 className="modal-title">Registration successfully completed!</h2>
          <button
            className="success-signin-btn"
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
          <h2 className="modal-title">Sign Up</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <label className="modal-label" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              placeholder="Enter Email"
              required
              className="modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="modal-label" htmlFor="register-password">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              placeholder="Enter Password"
              required
              className="modal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="modal-label" htmlFor="register-username">
              Username
            </label>
            <input
              id="register-username"
              type="text"
              placeholder="Enter username"
              required
              className="modal-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {emailTaken && (
              <div className="input-error">This email is not available</div>
            )}
            <button
              type="submit"
              className={`modal-btn${isActive ? " active" : ""}`}
              disabled={!isActive}
            >
              Sign Up
            </button>
          </form>
          <button className="modal-btn secondary" onClick={onLoginClick}>
            <span style={{ color: "#111" }}>or</span> <span>Sign In</span>
          </button>
        </>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;

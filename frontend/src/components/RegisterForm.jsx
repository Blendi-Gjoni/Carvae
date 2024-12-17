import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, verify } from '../redux/authSlice';
import DefaultModal from './modals/DefaultModal';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!termsAccepted) {
      alert('You must accept the terms!');
      return;
    }

    dispatch(signup({ username, email, password }))
      .then(() => {
        setShowModal(true);
        setVerificationMessage('');
        setUsername('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  };

  const handleVerify = (e) => {
    e.preventDefault();

    dispatch(verify({ email, verificationCode }))
      .then(() => {
        setVerificationMessage('Verification successful!');
        setShowModal(false);
        setVerificationCode('');
        alert('Registration successful!');
      })
      .catch((error) => {
        setVerificationMessage('Verification failed. Please try again.');
      });
  };

  return (
    <section className="my-5">
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: 'auto' }}>
        <form style={{ maxWidth: '400px', width: '100%' }} onSubmit={handleSubmit}>
          <div className="text-center mb-3">
            <p>Sign up with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>

          <p className="text-center">or:</p>

          <div className="form-outline mb-3">
            <input
              type="text"
              id="registerUsername"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="form-label" htmlFor="registerUsername">Username</label>
          </div>

          <div className="form-outline mb-3">
            <input
              type="email"
              id="registerEmail"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="registerEmail">Email</label>
          </div>

          <div className="form-outline mb-3">
            <input
              type="password"
              id="registerPassword"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="registerPassword">Password</label>
          </div>

          <div className="form-outline mb-3">
            <input
              type="password"
              id="registerRepeatPassword"
              className="form-control"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
          </div>

          <div className="form-check d-flex justify-content-center mb-3">
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              id="registerCheck"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label className="form-check-label" htmlFor="registerCheck">
              I have read and agree to the terms
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-3" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>

      <DefaultModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Verify Your Email"
      >
        <form onSubmit={handleVerify}>
          <div className="form-outline mb-3">
            <input
              type="text"
              id="verificationCode"
              className="form-control"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter Verification Code"
            />
            <label className="form-label" htmlFor="verificationCode">Verification Code</label>
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading || !verificationCode}>
            Submit
          </button>
        </form>
        {verificationMessage && (
          <div className="mt-3 text-center text-info">
            <p>{verificationMessage}</p>
          </div>
        )}
      </DefaultModal>
    </section>
  );
};

export default RegisterForm;

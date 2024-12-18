import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice'; // Import Redux action

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { isLoading } = useSelector((state) => state.auth); // Get loading state from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setError(null); // Reset error on new login attempt

    // Dispatch the login action to Redux
    dispatch(login({ email, password }))
      .then(() => {
        navigate('/'); // Navigate to the home page on successful login
      })
      .catch((err) => {
        setError('Login failed. Please check your credentials and try again.');
      });
  };

  return (
    <section className='my-5'>
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: 'auto' }}>
        <form style={{ maxWidth: '400px', width: '100%' }} onSubmit={handleLogin}>
          <div className="text-center mb-3">
            <p>Sign in with:</p>
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
              type="email"
              id="loginEmail"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="loginEmail">Email</label>
          </div>

          <div className="form-outline mb-3">
            <input
              type="password"
              id="loginPassword"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <label className="form-label" htmlFor="loginPassword">Password</label>
          </div>

          <div className="row mb-3">
            <div className="col-md-6 d-flex justify-content-center">
              <div className="form-check mb-3 mb-md-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="loginCheck"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
              </div>
            </div>

            <div className="col-md-6 d-flex justify-content-center">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-3" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="text-center">
            <p>Not a member? <a href="#!">Register</a></p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;

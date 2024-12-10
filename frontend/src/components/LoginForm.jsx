import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  return (
    <section className='my-5'>
      <div className="container-fluid d-flex justify-content-center" style={{ minHeight: 'auto' }}>
        <form style={{ maxWidth: '400px', width: '100%' }}>
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

          <div data-mdb-input-init className="form-outline mb-3"> {/* Reduced mb-4 to mb-3 */}
            <input type="email" id="loginName" className="form-control" />
            <label className="form-label" htmlFor="loginName">Email</label>
          </div>

          <div data-mdb-input-init className="form-outline mb-3"> {/* Reduced mb-4 to mb-3 */}
            <input type="password" id="loginPassword" className="form-control" />
            <label className="form-label" htmlFor="loginPassword">Password</label>
          </div>

          <div className="row mb-3"> {/* Reduced mb-4 to mb-3 */}
            <div className="col-md-6 d-flex justify-content-center">
              <div className="form-check mb-3 mb-md-0">
                <input className="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
              </div>
            </div>

            <div className="col-md-6 d-flex justify-content-center">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-3"> {/* Reduced mb-4 to mb-3 */}
            Sign in
          </button>

          <div className="text-center">
            <p>Not a member? <a href="#!">Register</a></p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;

import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from 'framer-motion';
import { LoginData } from '../redux/authSlice';
import { AppDispatch, RootState } from '../redux/store';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email("Invalid email!"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
  })

  const { register, handleSubmit, formState: {errors} } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    setError(null);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error: any) => {
        setError('Login failed. Please check your credentials and try again.');
      });
  };

  return (
    <section className='my-5'>
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: 'auto' }}>
        <motion.form 
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 15, duration: 0.5}}
          style={{ maxWidth: '400px', width: '100%' }} 
          onSubmit={handleSubmit(onSubmit)}
        >
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
              placeholder='Email'
              type="text"
              id="loginEmail"
              className="form-control"
              {...register("email")}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className='mx-3 fs-8' style={{color: 'red'}}>{errors.email?.message}</span>
          </div>

          <div className="form-outline mb-3">
            <input
              placeholder='Password'
              type="password"
              id="loginPassword"
              className="form-control"
              {...register("password")}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className='mx-3 fs-8' style={{color: 'red'}}>{errors.password?.message}</span>
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

          <button type="submit" className="btn btn-primary btn-block mb-3" style={{width: '100%'}} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="text-center">
            <p>Not a member? <a href="#!">Register</a></p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, verify } from '../redux/authSlice';
import DefaultModal from './modals/DefaultModal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

const RegisterForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const schema = z.object({
    username: z.string().min(8, "Username must be at least 8 characters!"),
    email: z.string().email("Invalid email!"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
    repeatPassword: z.string().min(6, "Password must be at least 6 characters long!"),
    verificationCode: z.number().min(100000).max(999999),
    termsAccepted: z.boolean().refine((val) => val, {
      message: "You must accept the terms and conditions!",
    }),    
  })
  .superRefine((data, ctx) => {
    if(data.password !== data.repeatPassword){
      ctx.addIssue({
        path: ["repeatPassword"],
        message: "Passwords must match!",
      })
    }
  });

  const { register, handleSubmit, reset, formState: {errors} } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const { username, email, password } = data;
    dispatch(signup({ username, email, password }))
      .then(() => {
        setShowModal(true);
        setVerificationMessage('');
        reset();
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  };

  const handleVerify = (data) => {
    dispatch(verify({ email: data.email, verificationCode: data.verificationCode }))
      .then(() => {
        setVerificationMessage('Verification successful!');
        setShowModal(false);
        reset();
        alert('Registration successful!');
      })
      .catch((error) => {
        setVerificationMessage('Verification failed. Please try again.');
      });
  };

  return (
    <section className="my-5">
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: 'auto' }}>
        <motion.form
          initial={{ x: 1000 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 15, duration: 0.5}}
          style={{ maxWidth: '400px', width: '100%' }} 
          onSubmit={handleSubmit(onSubmit)}
        >
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
              {...register("username")}
            />
            <label className="form-label" htmlFor="registerUsername">Username</label>
            <span className='mx-3 fs-8' style={{color: 'red'}}>{errors.username?.message}</span>
          </div>

          <div className="form-outline mb-3">
            <input
              type="email"
              id="registerEmail"
              className="form-control"
              {...register("email")}
            />
            <label className="form-label" htmlFor="registerEmail">Email</label>
            <span className='mx-3 fs-8' style={{color: 'red'}}>{errors.email?.message}</span>
          </div>

          <div className="form-outline mb-3">
            <input
              type="password"
              id="registerPassword"
              className="form-control"
              {...register("password")}
            />
            <label className="form-label" htmlFor="registerPassword">Password</label>
            <span className='mx-3 fs-8' style={{color: 'red'}}>{errors.password?.message}</span>
          </div>

          <div className="form-outline mb-3">
            <input
              type="password"
              id="registerRepeatPassword"
              className="form-control"
              {...register("repeatPassword")}
            />
            <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
            <span className='mx-3 fs-8' style={{color: 'red'}}>{errors.repeatPassword?.message}</span>
          </div>

          <div className="form-check d-flex justify-content-center mb-3">
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              id="registerCheck"
              {...register("termsAccepted", { required: true })}
            />
            <label className="form-check-label" htmlFor="registerCheck">
              I have read and agree to the terms
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-3" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
        </motion.form>
      </div>

      <DefaultModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Verify Your Email"
      >
        <form onSubmit={handleSubmit(handleVerify)}>
          <div className="form-outline mb-3">
            <input
              type="text"
              id="verificationCode"
              className="form-control"
              {...register("verificationCode")}
              placeholder="Enter Verification Code"
            />
            <label className="form-label" htmlFor="verificationCode">Verification Code</label>
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
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

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, SignupData, verify, VerifyUserData } from '../redux/authSlice';
import DefaultModal from './modals/DefaultModal';
import { useForm } from 'react-hook-form';
import { z, ZodIssueCode } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { AppDispatch, RootState } from '../redux/store';

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  verificationCode: string;
  termsAccepted: boolean;
}

const RegisterForm = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [verificationMessage, setVerificationMessage] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const schema = z.object({
    username: z.string().min(8, "Username must be at least 8 characters!"),
    email: z.string().email("Invalid email!"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
    repeatPassword: z.string().min(6, "Password must be at least 6 characters long!"),
    verificationCode: z.string().length(6, "Verification code must be 6 digits!"),
    termsAccepted: z.boolean().refine((val) => val, {
      message: "You must accept the terms and conditions!",
    }),    
  })
  .superRefine((data, ctx) => {
    if(data.password !== data.repeatPassword){
      ctx.addIssue({
        path: ["repeatPassword"],
        message: "Passwords must match!",
        code: ZodIssueCode.custom, // Adding a custom code for the issue
      })
    }
  });

  const { register, handleSubmit, reset, formState: {errors} } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SignupData) => {
    const { username, email, password } = data;

    dispatch(signup({ username, email, password }))
      .unwrap()
      .then(() => {
        setShowModal(true);
        setVerificationMessage('');
        reset();
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  };

  const showModalForTesting = () => {
    if (process.env.NODE_ENV === 'development' || (window as any).testMode) {
      setShowModal(true);
      setVerificationMessage('');
    }
  };

  const handleVerify = (data: VerifyUserData) => {
    dispatch(verify({ email: data.email, verificationCode: data.verificationCode }))
      .then(() => {
        setVerificationMessage('Verification successful!');
        setShowModal(false);
        reset();
        alert('Registration successful!');
      })
      .catch((error: any) => {
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
            <button type="button" className="btn btn-link btn-floating mx-1" style={{color: '#ff0000'}}>
              <i className="fab fa-facebook-f"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1" style={{color: '#ff0000'}}>
              <i className="fab fa-google"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1" style={{color: '#ff0000'}}>
              <i className="fab fa-twitter"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1" style={{color: '#ff0000'}}>
              <i className="fab fa-github"></i>
            </button>
          </div>

          <p className="text-center">or:</p>

          <div className="form-outline mb-3">
            <input
              placeholder='Username'
              type="text"
              id="registerUsername"
              className="form-control"
              {...register("username")}
            />
            <span id='username-error' className='mx-3 fs-8' style={{color: 'red'}}>{errors.username?.message}</span>
          </div>

          <div className="form-outline mb-3">
            <input
              placeholder='Email'
              type="email"
              id="registerEmail"
              className="form-control"
              {...register("email")}
            />
            <span id='email-error' className='mx-3 fs-8' style={{color: 'red'}}>{errors.email?.message}</span>
          </div>

          <div className="form-outline mb-3">
            <input
              placeholder='Password'
              type="password"
              id="registerPassword"
              className="form-control"
              {...register("password")}
            />
            <span id='password-error' className='mx-3 fs-8' style={{color: 'red'}}>{errors.password?.message}</span>
          </div>

          <div className="form-outline mb-3">
            <input
              placeholder='Repeat password'
              type="password"
              id="registerRepeatPassword"
              className="form-control"
              {...register("repeatPassword")}
            />
            <span id='repeatPassword-error' className='mx-3 fs-8' style={{color: 'red'}}>{errors.repeatPassword?.message}</span>
          </div>

          <div className="form-check d-flex justify-content-center mb-3">
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              id="termsAccepted"
              {...register("termsAccepted", { required: true })}
              style={{backgroundColor: '#a4250b', color: '#fff', border: '#ff0000'}}
            />
            <label className="form-check-label" htmlFor="registerCheck">
              I have read and agree to the terms
            </label>
            <span id='termsAccepted-error' className='mx-3 fs-8' style={{color: 'red'}}>{errors.termsAccepted?.message}</span>
          </div>

          <button id="submit-button" type="submit" className="btn btn-block mb-3" style={{width: '100%', backgroundColor: '#ff0000', color: '#fff'}} disabled={isLoading}>
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
            <span id='verificationCode-error' className='mx-3 fs-8' style={{color: 'red'}}>{errors.verificationCode?.message}</span>
          </div>
          <button id="submit-vc-button" type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            Submit
          </button>
        </form>
        {verificationMessage && (
          <div className="mt-3 text-center text-info">
            <p>{verificationMessage}</p>
          </div>
        )}
      </DefaultModal>
      {(process.env.NODE_ENV === 'development' || (window as any).testMode) && (
        <button 
          id="test-show-modal" 
          type="button" 
          onClick={showModalForTesting}
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 9999 }}
        >
          Test Modal
        </button>
      )}
    </section>
  );
};

export default RegisterForm;

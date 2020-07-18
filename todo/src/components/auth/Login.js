import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/auth/authContext';
const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
      toast.success('Login Successful', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (error === 'Invalid Credentials') {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    if (email === '' || password === '') {
      toast.error(' Empty Fields not allowed', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      login({
        email,
        password,
      });
      // toast.success('Registration success', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
  };

  return (
    <div className='form-container'>
      <h2>Login</h2>
      <form
      //   method='post'
      >
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <div>
          <input
            type='button'
            value='Login'
            className='btn btn-primary btn-block'
            onClick={handleSubmit}
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;

import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Axios from 'axios';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'User already exists') {
      // setAlert(error, 'danger');
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    if (name === '' || email === '' || password === '') {
      toast.error('Empty Fields Please fill all fields', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (password.length < 6) {
      toast.error('Passwords must contain atleast 6 characters', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (password !== password2) {
      toast.error('Passwords do not match', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      register({
        name,
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
      <h2>Register</h2>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
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
        <div className='form-group'>
          <label htmlFor='password2'> confirm password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <div>
          <input
            type='button'
            value='Register'
            className='btn btn-primary btn-block'
            onClick={handleSubmit}
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;

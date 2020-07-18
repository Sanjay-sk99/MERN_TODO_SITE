import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MernContext from '../../context/mern/MernContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const mernContext = useContext(MernContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearLists } = mernContext;
  const onLogout = () => {
    logout();
    clearLists();
    toast.success('Logout success', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const authLinks = (
    <Fragment>
      <li> Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <h2>
        <i className={icon} /> {title}
      </h2>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: 'ToDo',
  icon: 'fas fa-tasks',
};
export default Navbar;

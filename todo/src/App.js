import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {
  BrowserRouter as Router,
  BrowserHistory,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import MernState from './context/mern/MernState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import AlertState from './context/alert/AlertState';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <MernState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </MernState>
    </AuthState>
  );
};

export default App;

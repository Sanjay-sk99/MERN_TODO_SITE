import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { v4 as uuidv4 } from 'uuid';
// import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { SET_ALERT, REMOVE_ALERT } from '../types';
import { config } from 'react-transition-group';

const AlertState = (props) => {
  const initialState = [];
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;

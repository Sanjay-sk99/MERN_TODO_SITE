import React, { useReducer } from 'react';
import MernContext from './MernContext';
import MernReducer from './MernReducer';
import axios from 'axios';
import {
  ADD_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_LISTS,
  CLEAR_FILTER,
  LIST_ERROR,
  CLEAR_LISTS,
  GET_LISTS,
} from '../types';

const MernState = (props) => {
  const initialState = {
    lists: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(MernReducer, initialState);

  // get list
  const getLists = async () => {
    try {
      const res = await axios.get('/api/mern');

      dispatch({
        type: GET_LISTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LIST_ERROR,
        payload: err.message.msg,
      });
    }
  };

  //add
  const addList = async (list) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/mern', list, config);

      dispatch({
        type: ADD_LIST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LIST_ERROR,
        payload: err.message.msg,
      });
    }
  };
  //update
  const updateList = async (list) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/mern/${list._id}`, list, config);

      dispatch({
        type: UPDATE_LIST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LIST_ERROR,
        payload: err.response.msg,
      });
    }
  };
  //delete
  const deleteList = async (id) => {
    try {
      await axios.delete(`/api/mern/${id}`);
      dispatch({
        type: DELETE_LIST,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: LIST_ERROR,
        payload: err.response.msg,
      });
    }
  };
  //clear lists
  const clearLists = () => {
    dispatch({ type: CLEAR_LISTS });
  };

  //set cuurent
  const setCurrent = (list) => {
    dispatch({ type: SET_CURRENT, payload: list });
  };
  //clear
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //filter or seearch
  const filterLists = (text) => {
    dispatch({ type: FILTER_LISTS, payload: text });
  };
  //clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <MernContext.Provider
      value={{
        lists: state.lists,
        addList,
        deleteList,
        updateList,
        error: state.error,
        current: state.current,
        setCurrent,
        clearCurrent,
        filtered: state.filtered,
        filterLists,
        clearFilter,
        getLists,
        clearLists,
      }}
    >
      {props.children}
    </MernContext.Provider>
  );
};

export default MernState;

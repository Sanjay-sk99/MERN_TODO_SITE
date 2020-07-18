import {
  ADD_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  SET_CURRENT,
  CLEAR_FILTER,
  FILTER_LISTS,
  CLEAR_CURRENT,
  LIST_ERROR,
  GET_LISTS,
  CLEAR_LISTS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_LISTS:
      return {
        ...state,
        lists: action.payload,
        loading: false,
      };
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    case UPDATE_LIST:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list._id === action.payload._id ? action.payload : list
        ),
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== action.payload),
        loading: false,
      };
    case CLEAR_LISTS:
      return {
        ...state,
        lists: null,
        filtered: null,
        error: null,
        current: null,
      };
    case LIST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_LISTS:
      return {
        ...state,
        filtered: state.lists.filter((list) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return list.name.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    default:
      return state;
  }
};

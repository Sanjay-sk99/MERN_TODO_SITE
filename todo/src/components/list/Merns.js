import React, { Fragment, useContext, useEffect } from 'react';
import MernContext from '../../context/mern/MernContext';
import MernItem from './MernItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Spinner from '../layout/Spinner';

const Merns = (props) => {
  const mernContext = useContext(MernContext);
  const { lists, filtered, getLists } = mernContext;

  useEffect(() => {
    getLists();
    // toast.dark('Task Loading', {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  }, []);

  if (lists !== null && lists.length === 0) {
    return <h4>Please add a Task</h4>;
  }

  return (
    <div>
      <Fragment>
        {lists !== null ? (
          <TransitionGroup>
            {filtered !== null
              ? filtered.map((list) => (
                  <CSSTransition key={list._id} timeout={500} classNames='item'>
                    <MernItem list={list} />
                  </CSSTransition>
                ))
              : lists.map((list) => (
                  <CSSTransition key={list._id} timeout={500} classNames='item'>
                    <MernItem list={list} />
                  </CSSTransition>
                ))}
          </TransitionGroup>
        ) : null}
      </Fragment>
      <ToastContainer />
    </div>
  );
};

export default Merns;

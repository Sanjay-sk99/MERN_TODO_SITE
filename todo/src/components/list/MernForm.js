import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MernContext from '../../context/mern/MernContext';
import { SET_CURRENT } from '../../context/types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const MernForm = () => {
  const mernContext = useContext(MernContext);
  const { addList, updateList, clearCurrent, current } = mernContext;

  useEffect(() => {
    if (current !== null) {
      setList(current);
    } else {
      setList({
        name: '',
        deadline: '',
        status: 'Incomplete',
      });
    }
  }, [mernContext, current]);

  const [list, setList] = useState({
    name: '',
    deadline: '',
    status: 'Incomplete',
  });
  const { name, deadline, status } = list;

  const onChange = (e) => setList({ ...list, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || deadline === '') {
      toast.error('Empty  Task Fields Please fill all fields', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      if (current === null) {
        addList(list);
        toast.info('Task Added', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        updateList(list);

        toast.info('Task Updated', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      clearAll();
    }
  };

  const clearAll = () => {
    clearCurrent();
    // toast.dark(' All Task Cleared', {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  };
  return (
    <div>
      <form>
        <h2 className='text-primary'>{current ? 'Edit Task' : 'Add Task'} </h2>
        <div className='form-group'>
          <label htmlFor='name'>Task</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Dealine</label>
          <input
            type='text'
            name='deadline'
            value={deadline}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type='radio'
            name='status'
            value='Completed'
            checked={status === 'Completed'}
            onChange={onChange}
          />{' '}
          Completed{' '}
          <input
            type='radio'
            name='status'
            value='Incomplete'
            checked={status === 'Incomplete'}
            onChange={onChange}
          />{' '}
          Incomplete
        </div>
        <div>
          <input
            type='submit'
            value={current ? 'Update Task' : 'Add Task'}
            className='btn btn-primary btn-block'
            onClick={handleSubmit}
          />
        </div>
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default MernForm;

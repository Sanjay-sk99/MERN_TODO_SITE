import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MernContext from '../../context/mern/MernContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MernItem = ({ list }) => {
  const mernContext = useContext(MernContext);

  const { deleteList, setCurrent, clearCurrent } = mernContext;
  const { _id, name, deadline, status } = list;

  const onDelete = () => {
    deleteList(_id);
    clearCurrent();
    toast.error('A task is deleted', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div>
      {status === 'Incomplete' ? (
        <div
          class='card solid'
          style={{ 'border-style': 'solid', color: 'red' }}
        >
          <i
            style={{ float: 'right' }}
            className={
              'badge ' +
              (status === 'Incomplete' ? 'badge danger' : 'badge success')
            }
          >
            <i class='fa fa-thumb-tack primary' />
            {status}
          </i>

          <div>
            <span>
              <i className='fas fa-list  mt-2  float-left' />
              <span classname='span bold'>{name}</span>
            </span>
          </div>

          <div class='card-block'>
            <div class='card-title'>
              <i className='fa fa-clock-o  mt-2  float-left' />
              <span classname='span bold'>{deadline}</span>
            </div>

            <button
              className='d-inline btn btn-secondary btn-sm mt-2  float-right'
              onClick={() => setCurrent(list)}
            >
              <i class='fa fa-pencil mr-2' aria-hidden='true'></i>
              Edit Task
            </button>
            <button
              className='btn btn-danger btn-sm  mt-3  float-right'
              onClick={onDelete}
            >
              <i class='fa fa-trash mr-2' aria-hidden='true'></i>
              Delete Task
            </button>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div
          className='card1'
          style={{ 'border-style': 'groove', color: 'green' }}
        >
          <i
            style={{ float: 'right' }}
            className={
              'badge' +
              (status === 'Incomplete' ? '-badge danger' : '-badge success')
            }
          >
            <i className='fa fa-trophy secondary' />
            {status}
          </i>

          <div>
            <span>
              <i className='fas fa-list  mt-2  float-left' />
              <span>{name}</span>
            </span>
          </div>

          <div class='card-block'>
            <h4 class='card-title'>
              <i className='fa fa-clock  mt-2  float-left' />
              {deadline}
            </h4>

            <button
              className='d-inline btn btn-secondary btn-sm mt-2  float-right'
              onClick={() => setCurrent(list)}
            >
              <i class='fa fa-pencil mr-2' aria-hidden='true'></i>
              Edit Task
            </button>
            <button
              className='btn btn-danger btn-sm  mt-3  float-right'
              onClick={onDelete}
            >
              <i class='fa fa-trash mr-2' aria-hidden='true'></i>
              Delete Task
            </button>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

MernItem.propTypes = {
  list: PropTypes.object.isRequired,
};
export default MernItem;

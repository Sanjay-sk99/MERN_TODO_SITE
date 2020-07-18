import React, { useContext, useRef, useEffect } from 'react';
import MernContext from '../../context/mern/MernContext';

const MernFilter = () => {
  const mernContext = useContext(MernContext);
  const text = useRef('');

  const { clearFilter, filterLists, filtered } = mernContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterLists(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='search task'
        onChange={onChange}
      ></input>
    </form>
  );
};

export default MernFilter;

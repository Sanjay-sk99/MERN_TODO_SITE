import React, { useContext, useEffect } from 'react';
import Merns from '../list/Merns';
import MernForm from '../list/MernForm';
import MernFilter from '../list/MernFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <MernForm />
      </div>
      <div>
        <MernFilter />
        <Merns />
      </div>
    </div>
  );
};

export default Home;

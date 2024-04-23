import { useEffect } from 'react';
import { selectLoggedInSeller, signOutAsync } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const seller = useSelector(selectLoggedInSeller);

  useEffect(() => {
    dispatch(signOutAsync());
  },[]);

  // but useEffect runs after render, so we have to delay navigate part
  return <>{!seller && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;

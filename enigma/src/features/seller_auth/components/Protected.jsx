import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInSeller } from '../authSlice';

function Protected({ children }) {
  const seller = useSelector(selectLoggedInSeller);

  if (!seller) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;

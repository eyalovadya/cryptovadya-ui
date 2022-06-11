import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userSelectors } from '../state/models/user/selectors';

const PrivateOutlet = () => {
    const isLoggedIn = useSelector(userSelectors.isLoggedIn);
    return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboards" replace />;
};

export default PrivateOutlet;

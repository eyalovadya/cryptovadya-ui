import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboards from './components/pages/dashboards/Dashboards';
import SingleDashboard from './components/pages/singleDashboard/SingleDashboard';
import DashboardFormModal, { DashboardFormMode } from './components/pages/dashboards/components/dashboardFormModal/DashboardFormModal';
import CreateWidgetModal from './components/pages/singleDashboard/components/createWidgetModal/CreateWidgetModal';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import { PrivateOutlet, PublicOutlet } from './routeOutlets';

const AppRoutes = () => {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route path="dashboards" element={<PrivateOutlet />}>
                    <Route path="" element={<Dashboards />} />
                    <Route path=":dashboardId" element={<SingleDashboard />} />
                </Route>
                <Route path="" element={<PublicOutlet />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="" element={<Navigate to="/login" />} />
                </Route>
                <Route path="*" element={<Navigate replace to="/dashboards" />} />
            </Routes>

            {/* Show the modal when a `backgroundLocation` is set */}
            {state?.backgroundLocation && (
                <Routes>
                    <Route path="dashboards/new" element={<DashboardFormModal />} />
                    <Route path="dashboards/edit" element={<DashboardFormModal mode={DashboardFormMode.EDIT} />} />
                    <Route path="dashboards/:dashboardId/widget/new" element={<CreateWidgetModal />} />
                </Routes>
            )}
        </>
    );
};

export default AppRoutes;

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboards from './components/pages/dashboards/Dashboards';
import SingleDashboard from './components/pages/singleDashboard/SingleDashboard';
import CreateDashboardModal from './components/pages/dashboards/components/createDashboardModal/CreateDashboardModal';
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
                    <Route path="new" element={<CreateDashboardModal />} />
                    <Route path=":dashboardId/widget/new" element={<CreateWidgetModal />} />
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
                    <Route path="dashboards/new" element={<CreateDashboardModal />} />
                    <Route path="dashboards/:dashboardId/widget/new" element={<CreateWidgetModal />} />
                </Routes>
            )}
        </>
    );
};

export default AppRoutes;

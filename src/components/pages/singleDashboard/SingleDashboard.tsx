import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { singleDashboardSelectors } from '../../../state/models/singleDashboard/selectors';
import { RootState, Dispatch } from '../../../state/store';
import { Dashboard } from '../../../types/dashboards';
import PageLayout from '../../shared/PageLayout';
import DashboardWidget from './components/dashboardWidget/DashboardWidget';
import isInteger from 'lodash/isInteger';
import Loader from '../../shared/Loader';

type Props = {
    dashboard?: Dashboard;
    setCurrentDashboardId: (dashboardId: number) => void;
    fetchDashboardById: (dashboardId: number) => Promise<void>;
};
const SingleDashboard = ({ dashboard, setCurrentDashboardId, fetchDashboardById }: Props) => {
    const { dashboardId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (dashboardId && isInteger(Number(dashboardId))) {
            (async () => {
                await setCurrentDashboardId(+dashboardId);
                await fetchDashboardById(+dashboardId);
                setIsLoading(false);
            })();
        } else {
            navigate('/dashboard');
        }
    }, [dashboardId, fetchDashboardById, setCurrentDashboardId, navigate]);

    if (isLoading) return <Loader />;

    return (
        <PageLayout
            title={dashboard!.title}
            goBackPath={'/dashboards'}
            actionButtons={[{ text: 'New Widget +', link: { to: `/dashboards/${dashboardId}/widget/new`, state: { backgroundLocation: location } } }]}
        >
            {dashboard?.widgets.map((widget) => (
                <DashboardWidget key={widget.id} widget={widget} />
            ))}
        </PageLayout>
    );
};

const mapState = (state: RootState) => ({
    dashboard: singleDashboardSelectors.dashboard(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    setCurrentDashboardId: (dashboardId: number) => dispatch.singleDashboard.setCurrentDashboardId(dashboardId),
    fetchDashboardById: (dashboardId: number) => dispatch.dashboards.fetchDashboardById(dashboardId)
});

export default connect(mapState, mapDispatch)(SingleDashboard);

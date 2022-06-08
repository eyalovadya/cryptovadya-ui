import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleDashboardSelectors } from '../../../state/models/singleDashboard/selectors';
import { RootState, Dispatch } from '../../../state/store';
import { Dashboard } from '../../../types/dashboard';
import PageLayout from '../../shared/PageLayout';
import DashboardWidget from './components/dashboardWidget/DashboardWidget';

type Props = {
    dashboard?: Dashboard;
    setCurrentDashboardId: (dashboardId: string) => void;
    fetchDashboardById: (dashboardId: string) => Promise<void>;
};
const SingleDashboard = ({ dashboard, setCurrentDashboardId, fetchDashboardById }: Props) => {
    const { dashboardId } = useParams();

    useEffect(() => {
        if (dashboardId) {
            setCurrentDashboardId(dashboardId);
            fetchDashboardById(dashboardId);
        }
    }, [dashboardId, fetchDashboardById, setCurrentDashboardId]);

    if (!dashboard) return <div>loading</div>;

    return (
        <PageLayout title={dashboard.title} actionButtons={[{ text: 'New Widget +' }]}>
            {/* <Link to="/">Dashboards</Link> */}
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
    setCurrentDashboardId: (dashboardId: string) => dispatch.singleDashboard.setCurrentDashboardId(dashboardId),
    fetchDashboardById: (dashboardId: string) => dispatch.dashboards.fetchDashboardById(dashboardId)
});

export default connect(mapState, mapDispatch)(SingleDashboard);

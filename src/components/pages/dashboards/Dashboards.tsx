import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Link from '../../shared/Link';
import { dashboardsSelectors } from '../../../state/models/dashboards/selectors';
import { RootState, Dispatch } from '../../../state/store';
import { Dashboard } from '../../../types/dashboards';
import DashboardItem, { DashboardItemStyle } from './components/DashboardItem';
import PageLayout from '../../shared/PageLayout';
import { useEffect } from 'react';

type Props = {
    dashboards: Dashboard[];
    fetchDashboards: () => Promise<void>;
};

const Dashboards = ({ dashboards, fetchDashboards }: Props) => {
    const location = useLocation();

    useEffect(() => {
        fetchDashboards();
    }, [fetchDashboards]);

    return (
        <PageLayout title="Dashboards">
            {dashboards.map((dashboard) => (
                <Link key={dashboard.id} to={`/dashboards/${dashboard.id}`}>
                    <DashboardItem dashboard={dashboard} />
                </Link>
            ))}
            <Link to={`/dashboards/new`} state={{ backgroundLocation: location }}>
                <DashboardItemStyle>New Dashboard +</DashboardItemStyle>
            </Link>
        </PageLayout>
    );
};

const mapState = (state: RootState) => ({
    dashboards: dashboardsSelectors.dashboards(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchDashboards: dispatch.dashboards.fetchDashboards
});

export default connect(mapState, mapDispatch)(Dashboards);

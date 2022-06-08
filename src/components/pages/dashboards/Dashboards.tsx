import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Link from '../../shared/Link';
import { dashboardsSelectors } from '../../../state/models/dashboards/selectors';
import { RootState, Dispatch } from '../../../state/store';
import { Dashboard } from '../../../types/dashboard';
import DashboardItem, { DashboardItemStyle } from './components/DashboardItem';
import PageLayout from '../../shared/PageLayout';

type Props = {
    dashboards: Dashboard[];
};

const Dashboards = ({ dashboards }: Props) => {
    const location = useLocation();

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

const mapDispatch = (dispatch: Dispatch) => ({});

export default connect(mapState, mapDispatch)(Dashboards);

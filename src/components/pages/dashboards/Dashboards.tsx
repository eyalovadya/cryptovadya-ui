import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Link from '../../shared/Link';
import { dashboardsSelectors } from '../../../state/models/dashboards/selectors';
import { RootState, Dispatch } from '../../../state/store';
import { Dashboard } from '../../../types/dashboards';
import DashboardItem, { DashboardItemStyle } from './components/DashboardItem';
import PageLayout from '../../shared/PageLayout';
import { useEffect } from 'react';
import styled from 'styled-components';

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
            <Link to={`/dashboards/new`} state={{ backgroundLocation: location }}>
                <NewDashboardContainer>
                    <NewDashboardText>New Dashboard</NewDashboardText>
                    <NewDashboardPlus>+</NewDashboardPlus>
                </NewDashboardContainer>
            </Link>
            {dashboards.map((dashboard) => (
                <Link key={dashboard.id} to={`/dashboards/${dashboard.id}`}>
                    <DashboardItem dashboard={dashboard} />
                </Link>
            ))}
        </PageLayout>
    );
};

const NewDashboardContainer = styled(DashboardItemStyle)`
    border: 1px dashed ${(props) => `${props.theme.mainButtonColor}aa`};
    display: flex;
    flex-direction: column;
`;

const NewDashboardText = styled.div``;
const NewDashboardPlus = styled.div`
    font-size: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 100;
`;
const mapState = (state: RootState) => ({
    dashboards: dashboardsSelectors.dashboards(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchDashboards: dispatch.dashboards.fetchDashboards
});

export default connect(mapState, mapDispatch)(Dashboards);

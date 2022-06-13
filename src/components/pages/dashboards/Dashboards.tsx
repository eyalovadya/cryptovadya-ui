import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Link from '../../shared/Link';
import { dashboardsSelectors } from '../../../state/models/dashboards/selectors';
import { RootState, Dispatch } from '../../../state/store';
import { Dashboard } from '../../../types/dashboards';
import DashboardItem, { DashboardItemStyle } from './components/DashboardItem';
import PageLayout from '../../shared/PageLayout';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '../../shared/Loader';
import PlusIcon from '../../shared/svgIcons/PlusIcon';

type Props = {
    dashboards: Dashboard[];
    fetchDashboards: () => Promise<void>;
};

const Dashboards = ({ dashboards, fetchDashboards }: Props) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            await fetchDashboards();
            setIsLoading(false);
        })();
    }, [fetchDashboards]);

    if (isLoading) return <Loader />;

    return (
        <PageLayout title="Dashboards">
            <Container>
                <Link to={`/dashboards/new`} state={{ backgroundLocation: location }}>
                    <NewDashboardContainer>
                        <NewDashboardText>New Dashboard</NewDashboardText>
                        <NewDashboardPlus>
                            <PlusIcon />
                        </NewDashboardPlus>
                    </NewDashboardContainer>
                </Link>
                {dashboards.map((dashboard) => (
                    <Link key={dashboard.id} to={`/dashboards/${dashboard.id}`}>
                        <DashboardItem dashboard={dashboard} />
                    </Link>
                ))}
            </Container>
        </PageLayout>
    );
};

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-bottom: 8px;

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const NewDashboardContainer = styled(DashboardItemStyle)`
    border: 1px dashed ${(props) => `${props.theme.colors.primary}aa`};
    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
    }
`;

const NewDashboardText = styled.div``;

const NewDashboardPlus = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    fill: ${(props) => props.theme.textColor};
    flex: 1;
`;
const mapState = (state: RootState) => ({
    dashboards: dashboardsSelectors.dashboards(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchDashboards: dispatch.dashboards.fetchDashboards
});

export default connect(mapState, mapDispatch)(Dashboards);

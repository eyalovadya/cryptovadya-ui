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
import AreYouSureModal from '../../shared/AreYouSureModal';

type Props = {
    dashboards: Dashboard[];
    fetchDashboards: () => Promise<void>;
    deleteDashboard: (dashboardId: number) => Promise<void>;
};

const Dashboards = ({ dashboards, fetchDashboards, deleteDashboard }: Props) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dashboardToDelete, setDashboardToDelete] = useState<Dashboard | null>(null);

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
                    // Used onContextMenu e.preventDefault() to prevent mobile menu from open on hold
                    <Link key={dashboard.id} to={`/dashboards/${dashboard.id}`} onContextMenu={(e) => e.preventDefault()}>
                        <DashboardItem dashboard={dashboard} onDeleteDashboard={async () => await setDashboardToDelete(dashboard)} />
                    </Link>
                ))}

                <AreYouSureModal
                    isOpen={!!dashboardToDelete}
                    setIsOpen={(isOpen: boolean) => setDashboardToDelete(isOpen ? dashboardToDelete : null)}
                    approve={async () => await deleteDashboard(dashboardToDelete!.id)}
                >
                    <AreYouSureModalContent>
                        <div>Delete</div>
                        <DeleteDashboardTitle>{dashboardToDelete?.title}</DeleteDashboardTitle> ?
                    </AreYouSureModalContent>
                </AreYouSureModal>
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

const AreYouSureModalContent = styled.div`
    display: flex;
`;

const DeleteDashboardTitle = styled.span`
    color: ${(props) => props.theme.colors.primary};
    display: inline-block;
    width: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    margin: 0 5px;
`;

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
    fetchDashboards: dispatch.dashboards.fetchDashboards,
    deleteDashboard: (dashboardId: number) => dispatch.dashboards.deleteDashboard(dashboardId)
});

export default connect(mapState, mapDispatch)(Dashboards);

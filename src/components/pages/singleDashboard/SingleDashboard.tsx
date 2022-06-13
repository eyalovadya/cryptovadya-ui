import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LinkProps, useLocation, useNavigate, useParams } from 'react-router-dom';
import { singleDashboardSelectors } from '../../../state/models/singleDashboard/selectors';
import { RootState, Dispatch } from '../../../state/store';
import { Dashboard } from '../../../types/dashboards';
import PageLayout from '../../shared/PageLayout';
import DashboardWidget from './components/dashboardWidget/DashboardWidget';
import isInteger from 'lodash/isInteger';
import Loader from '../../shared/Loader';
import EmptyState from '../../shared/EmptyState';
import styled from 'styled-components';

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

    const newWidgetLinkProps: LinkProps = { to: `/dashboards/${dashboardId}/widget/new`, state: { backgroundLocation: location } };
    const newWidgetButtonText = 'New Widget +';

    return (
        <PageLayout title={dashboard!.title} goBackPath={'/dashboards'} actionButtons={[{ text: newWidgetButtonText, link: newWidgetLinkProps }]}>
            <WidgetsContainer>
                {dashboard?.widgets.map((widget) => (
                    <DashboardWidget key={widget.id} widget={widget} />
                ))}
            </WidgetsContainer>

            {!dashboard?.widgets?.length && (
                <EmptyState
                    message="You've not added any widgets yet"
                    subMessage="Would you like to add one now?"
                    linkButtonProps={newWidgetLinkProps}
                    linkButtonText={newWidgetButtonText}
                />
            )}
        </PageLayout>
    );
};

const WidgetsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-bottom: 8px;

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const mapState = (state: RootState) => ({
    dashboard: singleDashboardSelectors.dashboard(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    setCurrentDashboardId: (dashboardId: number) => dispatch.singleDashboard.setCurrentDashboardId(dashboardId),
    fetchDashboardById: (dashboardId: number) => dispatch.dashboards.fetchDashboardById(dashboardId)
});

export default connect(mapState, mapDispatch)(SingleDashboard);

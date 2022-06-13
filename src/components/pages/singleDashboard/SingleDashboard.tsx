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
import { DeleteWidgetPayload } from '../../../types/widgets/payloads';
import { Widget } from '../../../types/widgets';
import AreYouSureModal from '../../shared/AreYouSureModal';
import CoinPair from '../../shared/CoinPair';
import EditIcon from '../../shared/svgIcons/EditIcon';
import Link from '../../shared/Link';

type Props = {
    dashboard?: Dashboard;
    setCurrentDashboardId: (dashboardId: number) => void;
    fetchDashboardById: (dashboardId: number) => Promise<void>;
    deleteWidget: (payload: DeleteWidgetPayload) => Promise<void>;
};

const SingleDashboard = ({ dashboard, setCurrentDashboardId, fetchDashboardById, deleteWidget }: Props) => {
    const { dashboardId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [widgetToDelete, setWidgetToDelete] = useState<Widget | null>(null);

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
        <PageLayout
            title={dashboard!.title}
            icon={
                <Link to={`/dashboards/edit`} state={{ backgroundLocation: location, dashboard }}>
                    <EditTitleIcon>
                        <EditIcon />
                    </EditTitleIcon>
                </Link>
            }
            goBackPath={'/dashboards'}
            actionButtons={[{ text: newWidgetButtonText, link: newWidgetLinkProps }]}
        >
            <WidgetsContainer>
                {dashboard?.widgets.map((widget: Widget) => (
                    <DashboardWidget key={widget.id} widget={widget} onDeleteWidget={async () => setWidgetToDelete(widget)} />
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

            <AreYouSureModal
                isOpen={!!widgetToDelete}
                setIsOpen={(isOpen: boolean) => setWidgetToDelete(isOpen ? widgetToDelete : null)}
                approve={async () => {
                    if (dashboard && widgetToDelete) await deleteWidget({ dashboardId: dashboard.id, widgetId: widgetToDelete.id });
                }}
            >
                <AreYouSureModalContent>
                    <div>Delete</div>
                    {widgetToDelete && (
                        <ModalContentCoinPairWrapper>
                            <CoinPair base={widgetToDelete.data.baseCurrency} quote={widgetToDelete.data.quoteCurrency} />
                        </ModalContentCoinPairWrapper>
                    )}
                    ?
                </AreYouSureModalContent>
            </AreYouSureModal>
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

const AreYouSureModalContent = styled.div`
    display: flex;
`;
const ModalContentCoinPairWrapper = styled.div`
    margin: 0 5px;
`;

const EditTitleIcon = styled.div`
    fill: ${(props) => props.theme.textColor};
    margin: 0 10px;
    cursor: pointer;

    &:hover {
        fill: ${(props) => props.theme.colors.primary};
    }
`;

const mapState = (state: RootState) => ({
    dashboard: singleDashboardSelectors.dashboard(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    setCurrentDashboardId: (dashboardId: number) => dispatch.singleDashboard.setCurrentDashboardId(dashboardId),
    fetchDashboardById: (dashboardId: number) => dispatch.dashboards.fetchDashboardById(dashboardId),
    deleteWidget: (payload: DeleteWidgetPayload) => dispatch.dashboards.deleteWidget(payload)
});

export default connect(mapState, mapDispatch)(SingleDashboard);

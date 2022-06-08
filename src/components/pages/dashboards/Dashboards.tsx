import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { deshboardsSelectors } from '../../../state/models/dashboards/selectors';
import { RootState, Dispatch } from '../../../state/store';
import { Dashboard } from '../../../types/dashboard';
import { CreateDashboardPayload } from '../../../types/dashboard/payloads';

type Props = {
    dashboards: Dashboard[];
    createDashboard: (payload: CreateDashboardPayload) => Promise<void>;
};

const Dashboards = ({ dashboards, createDashboard }: Props) => {
    return (
        <PageContainer>
            <div>Dashboards</div>
            <Link to="/dashboards/1">single</Link>
        </PageContainer>
    );
};

const PageContainer = styled.div``;

const Header = styled.div``;

const Content = styled.div``;

const mapState = (state: RootState) => ({
    dashboards: deshboardsSelectors.dashboards(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    createDashboard: (payload: CreateDashboardPayload) => dispatch.dashboards.createDashboard(payload)
});

export default connect(mapState, mapDispatch)(Dashboards);

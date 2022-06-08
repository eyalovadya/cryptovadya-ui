import styled from 'styled-components';
import { Dashboard } from '../../../types/dashboard';

type Props = {
    dashboard: Dashboard;
};

const DashboardItem = ({ dashboard }: Props) => {
    return <Container>{JSON.stringify(dashboard)}</Container>;
};

const Container = styled.div`
    border-radius: ${(props) => props.theme.borderRadius};
    width: 50px;
    height: 50px;
    padding: 20px;
    margin: 20px;
`;

export default DashboardItem;

import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const SingleDashboard = () => {
    const { dashboardId } = useParams();

    return (
        <Container>
            <div>SingleDashboard {dashboardId}</div>
            <Link to="/">Dashboards</Link>
        </Container>
    );
};

const Container = styled.div``;

export default SingleDashboard;

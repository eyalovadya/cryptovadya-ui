import styled from 'styled-components';

const Loader = () => {
    return <Container>Loading...</Container>;
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Loader;

import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { appSelectors } from '../../state/models/app/selectors';
import { SpinnerInfinity } from 'spinners-react';

type Props = {
    size?: number;
};
const Loader = ({ size }: Props) => {
    const appTheme = useSelector(appSelectors.appTheme);

    return (
        <Container>
            <SpinnerInfinity color={appTheme.colors.primary} secondaryColor={appTheme.input.backgroundColor} speed={150} size={size} />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Loader;

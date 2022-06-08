import { connect } from 'react-redux';
import styled from 'styled-components';
import { baseColorStyle } from '../../../shared/styles';
import { appSelectors } from '../../../state/models/app/selectors';
import { RootState, Dispatch } from '../../../state/store';

type Props = {
    isDarkTheme: boolean;
    toggleTheme: () => void;
};

const Header = ({ isDarkTheme, toggleTheme }: Props) => {
    return (
        <Container>
            <Title>CryptOvadya</Title>
            <ThemeBtn onClick={toggleTheme}>
                {isDarkTheme ? (
                    <span aria-label="Light mode" role="img">
                        🌞
                    </span>
                ) : (
                    <span aria-label="Dark mode" role="img">
                        🌜
                    </span>
                )}
            </ThemeBtn>
        </Container>
    );
};

const Container = styled.div`
    ${baseColorStyle}
    display: flex;
    align-items: center;
    padding: 16px 24px;
    box-sizing: border-box;
    height: 100%;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: ${(props) => props.theme.textSize.titleBig};
    font-weight: bold;
`;

const ThemeBtn = styled.button`
    background-color: transparent;
    border: none;
`;

const mapState = (state: RootState) => ({
    isDarkTheme: appSelectors.isDarkTheme(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    toggleTheme: dispatch.app.toggleTheme
});

export default connect(mapState, mapDispatch)(Header);

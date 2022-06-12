import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { baseColorStyle } from '../../../shared/styles';
import { appSelectors } from '../../../state/models/app/selectors';
import { userSelectors } from '../../../state/models/user/selectors';
import { RootState, Dispatch } from '../../../state/store';
import { User } from '../../../types/users';
import UserMenu from './UserMenu';
import DarkModeToggle from 'react-dark-mode-toggle';

type Props = {
    user: User | null;
    isDarkTheme: boolean;
    toggleTheme: () => void;
};

const Header = ({ user, isDarkTheme, toggleTheme }: Props) => {
    const navigate = useNavigate();

    return (
        <Container>
            <TitleContainer>
                <Title onClick={() => navigate('/dashboards')}>CryptOvadya</Title>
                <DarkModeToggleContainer>
                    <DarkModeToggle onChange={toggleTheme} checked={isDarkTheme} size={40} speed={3} />
                </DarkModeToggleContainer>
            </TitleContainer>
            {user && (
                <UserMenu user={user}>
                    {user.firstName} {user.lastName}
                </UserMenu>
            )}
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
    background-image: ${(props) => props.theme.colors.primaryGradient};
    cursor: pointer;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;
const DarkModeToggleContainer = styled.div`
    padding: 3px 10px 0 10px;
    display: flex;

    button > div {
        margin-top: -22px !important;
    }
`;
const mapState = (state: RootState) => ({
    user: userSelectors.user(state),
    isDarkTheme: appSelectors.isDarkTheme(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    toggleTheme: dispatch.app.toggleTheme
});

export default connect(mapState, mapDispatch)(Header);

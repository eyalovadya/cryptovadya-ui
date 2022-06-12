import './App.css';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { RootState, Dispatch } from './state/store';
import { appSelectors } from './state/models/app/selectors';
import { HEADER_HEIGHT } from './shared/constants';
import Header from './components/shared/header/Header';
import { baseColorStyle } from './shared/styles';
import { userSelectors } from './state/models/user/selectors';
import { useEffect, useState } from 'react';
import Loader from './components/shared/Loader';
import AppRoutes from './AppRoutes';

type Props = {
    appTheme: DefaultTheme;
    getMe: () => Promise<void>;
};

const App = ({ appTheme, getMe }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { error } = useSelector(userSelectors.getUserLoadingState);

    useEffect(() => {
        (async () => {
            await getMe();
            setIsLoading(false);
        })();
    }, [getMe]);

    return (
        <ThemeProvider theme={appTheme}>
            <Wrapper>
                <HeaderWrapper>
                    <Header />
                </HeaderWrapper>
                <Content>{!error && isLoading ? <Loader /> : <AppRoutes />}</Content>
            </Wrapper>
        </ThemeProvider>
    );
};

const Wrapper = styled.div`
    ${baseColorStyle}
    height: 100%;
    width: 100%;

    transition: background-color 0.2s ease;
`;

const HeaderWrapper = styled.div`
    height: ${HEADER_HEIGHT};
    width: 100%;
`;

const Content = styled.div`
    ${baseColorStyle}
    width: 100%;
    height: calc(100% - ${HEADER_HEIGHT});
    h1 {
        margin: 0;
    }
    box-sizing: border-box;
`;

const mapState = (state: RootState) => ({
    appTheme: appSelectors.appTheme(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    getMe: dispatch.user.getMe
});

export default connect(mapState, mapDispatch)(App);

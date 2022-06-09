import './App.css';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { RootState, Dispatch } from './state/store';
import { appSelectors } from './state/models/app/selectors';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HEADER_HEIGHT } from './shared/constants';
import Header from './components/shared/Header';
import { baseColorStyle } from './shared/styles';
import Dashboards from './components/pages/dashboards/Dashboards';
import SingleDashboard from './components/pages/singleDashboard/SingleDashboard';
import CreateDashboardModal from './components/pages/dashboards/components/createDashboardModal/CreateDashboardModal';
import CreateWidgetModal from './components/pages/singleDashboard/components/createWidgetModal/CreateWidgetModal';

type Props = {
    appTheme: DefaultTheme;
    isDarkMode: boolean;
};

const App = ({ appTheme, isDarkMode }: Props) => {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    return (
        <ThemeProvider theme={appTheme}>
            <Wrapper isDarkMode={isDarkMode}>
                <HeaderWrapper>
                    <Header />
                </HeaderWrapper>
                <Content>
                    <Routes location={state?.backgroundLocation || location}>
                        <Route path="dashboards" element={<Dashboards />} />
                        <Route path="dashboards/new" element={<CreateDashboardModal />} />
                        <Route path="dashboards/:dashboardId/widget/new" element={<CreateWidgetModal />} />
                        <Route path="dashboards/:dashboardId" element={<SingleDashboard />} />
                        <Route path="*" element={<Navigate replace to="/dashboards" />} />
                    </Routes>

                    {/* Show the modal when a `backgroundLocation` is set */}
                    {state?.backgroundLocation && (
                        <Routes>
                            <Route path="dashboards/new" element={<CreateDashboardModal />} />
                            <Route path="dashboards/:dashboardId/widget/new" element={<CreateWidgetModal />} />
                        </Routes>
                    )}
                </Content>
            </Wrapper>
        </ThemeProvider>
    );
};

type WrapperProps = {
    isDarkMode: boolean;
};
const Wrapper = styled.div<WrapperProps>`
    ${baseColorStyle}
    height: 100%;
    width: 100%;

    *::-webkit-scrollbar {
        width: 6px;
        height: 2px;

        right: 2px;
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)')};
        border-radius: 5.5px;
    }

    *::-webkit-scrollbar-thumb:hover {
        background-color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.36)' : 'rgba(0, 0, 0, 0.36)')};
    }
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
    appTheme: appSelectors.appTheme(state),
    isDarkMode: appSelectors.isDarkTheme(state)
});

const mapDispatch = (dispatch: Dispatch) => ({});

export default connect(mapState, mapDispatch)(App);

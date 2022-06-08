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

type Props = {
    appTheme: DefaultTheme;
};

const App = ({ appTheme }: Props) => {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    return (
        <ThemeProvider theme={appTheme}>
            <HeaderWrapper>
                <Header />
            </HeaderWrapper>
            <Content>
                <Routes location={state?.backgroundLocation || location}>
                    <Route path="dashboards" element={<Dashboards />} />
                    <Route path="dashboards/new" element={<CreateDashboardModal />} />
                    <Route path="dashboards/:dashboardId" element={<SingleDashboard />} />
                    <Route path="*" element={<Navigate replace to="/dashboards" />} />
                </Routes>

                {/* Show the modal when a `backgroundLocation` is set */}
                {state?.backgroundLocation && (
                    <Routes>
                        <Route path="dashboards/new" element={<CreateDashboardModal />} />
                    </Routes>
                )}
            </Content>
        </ThemeProvider>
    );
};

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
    padding: 0 24px 16px 24px;
    box-sizing: border-box;
`;

const mapState = (state: RootState) => ({
    appTheme: appSelectors.appTheme(state)
});

const mapDispatch = (dispatch: Dispatch) => ({});

export default connect(mapState, mapDispatch)(App);

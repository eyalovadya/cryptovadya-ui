import { createSelector } from 'reselect';
import { RootState } from './../../store';
import dashboardsSelectors from './../dashboards/selectors';

const currentDashboardId = (state: RootState) => state.singleDashboard.currentDashboardId;
const fetchDashboardByIdLoadingState = (state: RootState) => state.loading.effects.dashboards.fetchDashboardById;

const dashboard = createSelector(currentDashboardId, dashboardsSelectors.dashboards, (dashboardId, dashboards) => {
    return dashboards.find((dashboard) => dashboard.id === dashboardId);
});

export { default as singleDashboardSelectors } from './selectors';

const selectors = { dashboard, fetchDashboardByIdLoadingState };

export default selectors;

import { createSelector } from 'reselect';
import { RootState } from './../../store';
import { dashboards } from './../dashboards/selectors';

const currentDashboardId = (state: RootState) => state.singleDashboard.currentDashboardId;

const dashboard = createSelector(currentDashboardId, dashboards, (dashboardId, dashboards) => {
    return dashboards.find((dashboard) => dashboard.id === dashboardId);
});

export { dashboard };

import { createModel } from '@rematch/core';
import { RootModel } from '..';
import { Dashboard } from '../../../types/dashboards';
import { CreateDashboardPayload } from '../../../types/dashboards/payloads';
import { Widget } from '../../../types/widgets';
import { CreateWidgetPayload } from '../../../types/widgets/payloads';
import { localSDK as client } from '../../../sdk';

export type DashboardsStateType = {
    dashboards: Dashboard[];
};

export const dashboards = createModel<RootModel>()({
    state: {
        dashboards: []
    } as DashboardsStateType,
    reducers: {
        setDashboards(state: DashboardsStateType, dashboards: Dashboard[]) {
            return { ...state, dashboards };
        },
        setSingleDashBoard(state: DashboardsStateType, newDashboard: Dashboard): DashboardsStateType {
            const newDashboards = [...state.dashboards];

            const dashboardIdx = newDashboards.findIndex((dashboard) => dashboard.id === newDashboard.id);

            if (dashboardIdx < 0) {
                newDashboards.push(newDashboard);
            } else {
                newDashboards[dashboardIdx] = newDashboard;
            }

            return { ...state, dashboards: newDashboards };
        },
        addDashboard(state: DashboardsStateType, dashboard: Dashboard) {
            const currentDashboards = state.dashboards;

            const newDashboards: Dashboard[] = [...currentDashboards, dashboard];

            const newState: DashboardsStateType = {
                ...state,
                dashboards: newDashboards
            };

            return newState;
        },
        addWidget(state: DashboardsStateType, widget: Widget) {
            const dashboardIdx = state.dashboards.findIndex((q) => q.id === widget.dashboardId);

            if (dashboardIdx < 0) return state;

            const newDashboards: Dashboard[] = [...state.dashboards];

            const newDashboard: Dashboard = { ...newDashboards[dashboardIdx] };

            const newDashboardWidgets: Widget[] = [...newDashboard.widgets, widget];

            newDashboard.widgets = newDashboardWidgets;

            newDashboards[dashboardIdx] = newDashboard;

            const newState: DashboardsStateType = { ...state, dashboards: newDashboards };

            return newState;
        }
    },
    effects: (dispatch) => ({
        async fetchDashboards() {
            const dashboards = await client.dashboards().fetchDashboards();
            dispatch.dashboards.setDashboards(dashboards);
        },
        async fetchDashboardById(dashboardId: number) {
            const dashboard = await client.dashboards().fetchDashboardById(dashboardId);
            dispatch.dashboards.setSingleDashBoard(dashboard);
        },
        async createDashboard(payload: CreateDashboardPayload) {
            const newDashboard = await client.dashboards().createDashboard(payload);
            dispatch.dashboards.addDashboard(newDashboard);
        },
        async createWidget(payload: CreateWidgetPayload) {
            const newWidget = await client.widgets().createWidget(payload);
            dispatch.dashboards.addWidget(newWidget);
        }
    })
});

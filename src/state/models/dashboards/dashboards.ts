import { createModel } from '@rematch/core';
import { v4 as uuidv4 } from 'uuid';
import { RootModel } from '..';
import { Dashboard } from '../../../types/dashboard';
import { CreateDashboardPayload, CreateDashboardWidgetPayload } from '../../../types/dashboard/payloads';
import { Widget } from '../../../types/dashboard/widget';

export type DashboardsStateType = {
    dashboards: Dashboard[];
};

export const dashboards = createModel<RootModel>()({
    state: {
        dashboards: []
    } as DashboardsStateType,
    reducers: {
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

            const newState: DashboardsStateType = { ...state, dashboards: newDashboards };

            return newState;
        }
    },
    effects: (dispatch) => ({
        async createDashboard(payload: CreateDashboardPayload) {
            const newDashboard: Dashboard = {
                id: uuidv4(),
                widgets: [],
                ...payload
            };

            dispatch.dashboards.addDashboard(newDashboard);
        },

        async createWidget(payload: CreateDashboardWidgetPayload) {
            const newWidget: Widget = {
                id: uuidv4(),
                ...payload
            };

            dispatch.dashboards.addWidget(newWidget);
        }
    })
});

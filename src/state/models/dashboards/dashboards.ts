import { createModel } from '@rematch/core';
import { v4 as uuidv4 } from 'uuid';
import { RootModel } from '..';
import { Dashboard } from '../../../types/dashboard';
import { CreateDashboardPayload, CreateDashboardWidgetPayload } from '../../../types/dashboard/payloads';
import { StatCardData, Widget } from '../../../types/dashboard/widget';

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
        }
    },
    effects: (dispatch) => ({
        async createDashboard(payload: CreateDashboardPayload) {
            await new Promise((resolve) => setTimeout(resolve, 2000));

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
        },
        async fetchDashboardById(dashboardId: string) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const newDashboard: Dashboard = {
                id: dashboardId,
                widgets: [
                    {
                        id: uuidv4(),
                        type: 'STAT_CARD',
                        dashboardId,
                        data: {
                            baseCurrency: 'BTC',
                            quoteCurrency: 'ETH',
                            data: 13.18,
                            dayDiffPrecent: 1.21
                        } as StatCardData
                    }
                ],
                title: 'Fetched Dashboard'
            };

            dispatch.dashboards.setSingleDashBoard(newDashboard);
        }
    })
});

import { createModel } from '@rematch/core';
import { RootModel } from '..';
import CoinGeckoClient from '../../../services/cryptoAPI/coinGeckoClient';
import { Dashboard } from '../../../types/dashboards';
import { CreateDashboardPayload } from '../../../types/dashboards/payloads';
import { Widget } from '../../../types/widgets';
import { CreateWidgetPayload } from '../../../types/widgets/payloads';

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
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const fetchedDashboards: Dashboard[] = [];

            for (let i = 0; i < 3; i++) {
                const newId = i;
                const newDashboard: Dashboard = {
                    id: newId,
                    userId: 'dsds',
                    widgets: [
                        {
                            id: i,
                            type: 'STAT_CARD',
                            dashboardId: newId,
                            data: {
                                baseCurrency: 'BTC',
                                baseCurrencyId: 'bitcoin',
                                quoteCurrency: 'ETH',
                                data: 13.18,
                                dayDiffPrecent: 1.21
                            },
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    ],
                    title: `Fetched Dashboard ${i}`,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                fetchedDashboards.push(newDashboard);
            }

            // dispatch.dashboards.setDashboards(fetchedDashboards);
        },
        async fetchDashboardById(dashboardId: number) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const newDashboard: Dashboard = {
                id: 1,
                userId: '1sa',
                widgets: [
                    {
                        id: 1,
                        type: 'STAT_CARD',
                        dashboardId: 1,
                        data: {
                            baseCurrencyId: 'bitcoin',
                            baseCurrency: 'BTC',
                            quoteCurrency: 'ETH',
                            data: 13.18,
                            dayDiffPrecent: 1.21
                        },
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                ],
                title: 'Fetched Single Dashboard',
                createdAt: new Date(),
                updatedAt: new Date()
            };

            dispatch.dashboards.setSingleDashBoard(newDashboard);
        },
        async createDashboard(payload: CreateDashboardPayload) {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const newDashboard: Dashboard = {
                id: 1,
                userId: 'kaki',
                widgets: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                ...payload
            };

            dispatch.dashboards.addDashboard(newDashboard);
        },
        async createWidget(payload: CreateWidgetPayload) {
            const { dashboardId, type, data } = payload;
            const { baseCurrency, baseCurrencyId, quoteCurrency } = data;

            const resp = await CoinGeckoClient.simplePrice([baseCurrencyId], [quoteCurrency]);

            const newWidget: Widget = {
                id: 1,
                dashboardId: dashboardId,
                type,
                data: {
                    baseCurrency,
                    baseCurrencyId,
                    quoteCurrency,
                    data: resp[baseCurrencyId]?.[quoteCurrency.toLowerCase()] || 0,
                    dayDiffPrecent: resp[baseCurrencyId]?.[`${quoteCurrency.toLowerCase()}_24h_change`] || 0
                },
                createdAt: new Date(),
                updatedAt: new Date()
            };

            dispatch.dashboards.addWidget(newWidget);
        }
    })
});

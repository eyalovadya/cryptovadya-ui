import { createModel } from '@rematch/core';
import { v4 as uuidv4 } from 'uuid';
import { RootModel } from '..';
import CoinGeckoClient from '../../../services/cryptoAPI/coinGeckoClient';
import { Dashboard } from '../../../types/dashboards';
import { CreateDashboardPayload, CreateDashboardWidgetPayload } from '../../../types/dashboards/payloads';
import { StatCardData, Widget, WidgetType } from '../../../types/dashboards/widget';

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
        addWidget<T extends WidgetType>(state: DashboardsStateType, widget: Widget<T>) {
            const dashboardIdx = state.dashboards.findIndex((q) => q.id === widget.dashboardId);

            if (dashboardIdx < 0) return state;

            const newDashboards: Dashboard[] = [...state.dashboards];

            const newDashboard: Dashboard = { ...newDashboards[dashboardIdx] };

            const newDashboardWidgets: Widget<WidgetType>[] = [...newDashboard.widgets, widget];

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
                const newId = uuidv4();
                const newDashboard: Dashboard = {
                    id: newId,
                    widgets: [
                        {
                            id: uuidv4(),
                            type: 'STAT_CARD',
                            dashboardId: newId,
                            data: {
                                baseCurrency: 'BTC',
                                quoteCurrency: 'ETH',
                                data: 13.18,
                                dayDiffPrecent: 1.21
                            } as StatCardData
                        }
                    ],
                    title: `Fetched Dashboard ${i}`
                };

                fetchedDashboards.push(newDashboard);
            }

            // dispatch.dashboards.setDashboards(fetchedDashboards);
        },
        async fetchDashboardById(dashboardId: string) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
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
                title: 'Fetched Single Dashboard'
            };

            dispatch.dashboards.setSingleDashBoard(newDashboard);
        },
        async createDashboard(payload: CreateDashboardPayload) {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const newDashboard: Dashboard = {
                id: uuidv4(),
                widgets: [],
                ...payload
            };

            dispatch.dashboards.addDashboard(newDashboard);
        },
        async createWidget<T extends WidgetType>(payload: CreateDashboardWidgetPayload<T>) {
            const { dashboardId, baseCurrency, quoteCurrency, baseCurrencyId, baseCurrencyName } = payload;

            const resp = await CoinGeckoClient.simplePrice([baseCurrencyId], [quoteCurrency]);

            const newWidget: Widget<'STAT_CARD'> = {
                id: uuidv4(),
                dashboardId: dashboardId,
                type: 'STAT_CARD',
                data: {
                    baseCurrency,
                    baseCurrencyName,
                    baseCurrencyId,
                    quoteCurrency,
                    data: resp[baseCurrencyId]?.[quoteCurrency.toLowerCase()] || 0,
                    dayDiffPrecent: resp[baseCurrencyId]?.[`${quoteCurrency.toLowerCase()}_24h_change`] || 0
                }
            };

            dispatch.dashboards.addWidget(newWidget);
        }
    })
});

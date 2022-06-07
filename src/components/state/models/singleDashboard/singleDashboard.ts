import { createModel } from '@rematch/core';
import { RootModel } from '..';

export type SingleDashboardStateType = {
    currentDashboardId: string | null;
};

export const singleDashboard = createModel<RootModel>()({
    state: {
        currentDashboardId: null
    } as SingleDashboardStateType,
    reducers: {
        setCuurentDashboardId(state: SingleDashboardStateType, dashboardId: string) {
            return { ...state, currentDashboardId: dashboardId };
        }
    }
});

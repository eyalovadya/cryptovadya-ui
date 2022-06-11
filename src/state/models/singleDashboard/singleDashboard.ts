import { createModel } from '@rematch/core';
import { RootModel } from '..';

export type SingleDashboardStateType = {
    currentDashboardId: number | null;
};

export const singleDashboard = createModel<RootModel>()({
    state: {
        currentDashboardId: null
    } as SingleDashboardStateType,
    reducers: {
        setCurrentDashboardId(state: SingleDashboardStateType, dashboardId: number) {
            return { ...state, currentDashboardId: dashboardId };
        }
    }
});

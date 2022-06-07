import { Models } from '@rematch/core';
import { user } from './user/user';
import { dashboards } from './dashboards/dashboards';
import { singleDashboard } from './singleDashboard/singleDashboard';

export interface RootModel extends Models<RootModel> {
    user: typeof user;
    dashboards: typeof dashboards;
    singleDashboard: typeof singleDashboard;
}

export const models: RootModel = { user, dashboards, singleDashboard };

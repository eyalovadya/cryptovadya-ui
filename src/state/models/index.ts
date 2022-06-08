import { Models } from '@rematch/core';
import { app } from './app/app';
import { user } from './user/user';
import { dashboards } from './dashboards/dashboards';
import { singleDashboard } from './singleDashboard/singleDashboard';

export interface RootModel extends Models<RootModel> {
    app: typeof app;
    user: typeof user;
    dashboards: typeof dashboards;
    singleDashboard: typeof singleDashboard;
}

export const models: RootModel = { app, user, dashboards, singleDashboard };

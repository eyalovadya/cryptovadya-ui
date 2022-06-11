import { Dashboard } from './../../../types/dashboard/dashboard';
import { CreateDashboardPayload } from './../../../types/dashboard/payloads/createDashboard';

export default interface IDashboard {
    fetchDashboards: () => Promise<Array<Dashboard>>;
    createDashboard: (payload: CreateDashboardPayload) => Promise<Dashboard>;
}

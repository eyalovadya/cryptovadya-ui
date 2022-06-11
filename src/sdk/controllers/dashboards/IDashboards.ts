import { Dashboard } from '../../../types/dashboards/dashboard';
import { CreateDashboardPayload } from '../../../types/dashboards/payloads/createDashboard';

export default interface IDashboards {
    fetchDashboards: () => Promise<Array<Dashboard>>;
    createDashboard: (payload: CreateDashboardPayload) => Promise<Dashboard>;
}

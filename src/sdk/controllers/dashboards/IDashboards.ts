import { CreateDashboardPayload, UpdateDashboardPayload } from '../../../types/dashboards/payloads';
import { DashboardResponse } from './../../../types/dashboards/responses';

export default interface IDashboards {
    fetchDashboards: () => Promise<DashboardResponse[]>;
    fetchDashboardById: (dashboardId: number) => Promise<DashboardResponse>;
    createDashboard: (payload: CreateDashboardPayload) => Promise<DashboardResponse>;
    updateDashboard: (dashboardId: number, payload: UpdateDashboardPayload) => Promise<DashboardResponse>;
    deleteDashboard: (dashboardId: number) => Promise<DashboardResponse>;
}

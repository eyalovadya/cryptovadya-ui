import BaseController from '..';
import IDashboards from './IDashboards';
import { CreateDashboardPayload, UpdateDashboardPayload } from '../../../types/dashboards/payloads';
import { DashboardResponse } from './../../../types/dashboards/responses';

export default class Dashboards extends BaseController implements IDashboards {
    async fetchDashboards(): Promise<DashboardResponse[]> {
        const response: DashboardResponse[] = await this.client.get('/dashboards');
        return response;
    }

    async fetchDashboardById(dashboardId: number): Promise<DashboardResponse> {
        const response: DashboardResponse = await this.client.get(`/dashboards/${dashboardId}`);
        return response;
    }

    async createDashboard(payload: CreateDashboardPayload): Promise<DashboardResponse> {
        const response: DashboardResponse = await this.client.post('/dashboards', JSON.stringify(payload));
        return response;
    }

    async updateDashboard(dashboardId: number, payload: UpdateDashboardPayload): Promise<DashboardResponse> {
        const response: DashboardResponse = await this.client.put(`/dashboards/${dashboardId}`, JSON.stringify(payload));
        return response;
    }

    async deleteDashboard(dashboardId: number): Promise<DashboardResponse> {
        const response: DashboardResponse = await this.client.delete(`/dashboards/${dashboardId}`);
        return response;
    }
}

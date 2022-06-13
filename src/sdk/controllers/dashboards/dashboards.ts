import BaseController from '..';
import IDashboards from './IDashboards';
import { CreateDashboardPayload, UpdateDashboardPayload } from '../../../types/dashboards/payloads';
import { DashboardResponse } from './../../../types/dashboards/responses';

export default class Dashboards extends BaseController implements IDashboards {
    private readonly baseEndpoint = '/dashboards';

    async fetchDashboards(): Promise<DashboardResponse[]> {
        const response: DashboardResponse[] = await this.client.get(this.baseEndpoint);
        return response;
    }

    async fetchDashboardById(dashboardId: number): Promise<DashboardResponse> {
        const response: DashboardResponse = await this.client.get(`${this.baseEndpoint}/${dashboardId}`);
        return response;
    }

    async createDashboard(payload: CreateDashboardPayload): Promise<DashboardResponse> {
        const response: DashboardResponse = await this.client.post(this.baseEndpoint, JSON.stringify(payload));
        return response;
    }

    async updateDashboard({ dashboardId, title }: UpdateDashboardPayload): Promise<DashboardResponse> {
        const response: DashboardResponse = await this.client.put(`${this.baseEndpoint}/${dashboardId}`, JSON.stringify({ title }));
        return response;
    }

    async deleteDashboard(dashboardId: number): Promise<DashboardResponse> {
        const response: DashboardResponse = await this.client.delete(`${this.baseEndpoint}/${dashboardId}`);
        return response;
    }
}

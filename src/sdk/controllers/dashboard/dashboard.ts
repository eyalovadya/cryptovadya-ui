import BaseController from '..';
import { Dashboard } from '../../../types/dashboard';
import IDashboard from './IDashboard';
import { CreateDashboardPayload } from './../../../types/dashboard/payloads/createDashboard';

export default class Task extends BaseController implements IDashboard {
    async fetchDashboards(): Promise<Dashboard[]> {
        const response = await this.client.get('/dashboards');
        return response;
    }

    async createDashboard(payload: CreateDashboardPayload): Promise<Dashboard> {
        const response = await this.client.post('/dashboards', JSON.stringify({ ...payload }));
        return response;
    }
}

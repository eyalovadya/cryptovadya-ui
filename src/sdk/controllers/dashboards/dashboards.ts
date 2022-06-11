import BaseController from '..';
import { Dashboard } from '../../../types/dashboards';
import IDashboards from './IDashboards';
import { CreateDashboardPayload } from '../../../types/dashboards/payloads/createDashboard';

export default class Dashboards extends BaseController implements IDashboards {
    async fetchDashboards(): Promise<Dashboard[]> {
        const response = await this.client.get('/dashboards');
        return response;
    }

    async createDashboard(payload: CreateDashboardPayload): Promise<Dashboard> {
        const response = await this.client.post('/dashboards', JSON.stringify({ ...payload }));
        return response;
    }
}

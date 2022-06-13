import BaseController from '..';
import IWidgets from './IWidgets';
import { CreateWidgetPayload, DeleteWidgetPayload } from './../../../types/widgets/payloads';
import { WidgetResponse } from '../../../types/widgets/responses';

export default class Widgets extends BaseController implements IWidgets {
    private readonly baseEndpoint = '/widgets';

    async createWidget(payload: CreateWidgetPayload): Promise<WidgetResponse> {
        const response: WidgetResponse = await this.client.post(this.baseEndpoint, JSON.stringify(payload));
        return response;
    }

    async deleteWidget({ dashboardId, widgetId }: DeleteWidgetPayload): Promise<WidgetResponse> {
        const response: WidgetResponse = await this.client.delete(`${this.baseEndpoint}/${widgetId}`, JSON.stringify({ dashboardId }));
        return response;
    }
}

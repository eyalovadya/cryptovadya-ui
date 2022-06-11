import BaseController from '..';
import IWidgets from './IWidgets';
import { CreateWidgetPayload, DeleteWidgetPayload } from './../../../types/widgets/payloads';
import { WidgetResponse } from '../../../types/widgets/responses';

export default class Widgets extends BaseController implements IWidgets {
    async createWidget(payload: CreateWidgetPayload): Promise<WidgetResponse> {
        const response: WidgetResponse = await this.client.post('/widgets', JSON.stringify(payload));
        return response;
    }

    async deleteWidget(widgetId: number, payload: DeleteWidgetPayload): Promise<WidgetResponse> {
        const response: WidgetResponse = await this.client.post(`/widgets/${widgetId}`, JSON.stringify(payload));
        return response;
    }
}

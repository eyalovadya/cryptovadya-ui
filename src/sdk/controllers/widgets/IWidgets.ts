import { CreateWidgetPayload, DeleteWidgetPayload } from './../../../types/widgets/payloads';
import { WidgetResponse } from '../../../types/widgets/responses';

export default interface IWidgets {
    createWidget: (payload: CreateWidgetPayload) => Promise<WidgetResponse>;
    deleteWidget: (payload: DeleteWidgetPayload) => Promise<WidgetResponse>;
}

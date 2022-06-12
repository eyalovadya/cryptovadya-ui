import { WidgetType } from '..';
import { CreateWidgetDataPayload } from './createWidgetDataPayload';

export type CreateWidgetPayload<T extends WidgetType = WidgetType> = {
    dashboardId: number;
    type: T;
    data: CreateWidgetDataPayload<T>;
};

import { WidgetType, WidgetData } from '..';

export type CreateWidgetPayload<T extends WidgetType = WidgetType> = {
    dashboardId: number;
    type: T;
    data: WidgetData<T>;
};

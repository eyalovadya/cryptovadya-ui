import { WidgetType, Widget } from './../widget';

export type CreateDashboardWidgetPayload<T extends WidgetType = any> = {
    dashboardId: string;
    type: T;
    data: Widget<T>;
};

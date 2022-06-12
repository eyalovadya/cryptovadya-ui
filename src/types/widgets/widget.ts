import { WidgetType, WidgetData } from '.';

export type Widget<T extends WidgetType = WidgetType> = {
    id: number;
    dashboardId: number;
    type: T;
    data: WidgetData<T>;
    createdAt: Date;
    updatedAt: Date;
};

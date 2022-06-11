import { WidgetType, WidgetData } from '..';

export type WidgetResponse<T extends WidgetType = WidgetType> = {
    id: number;
    dashboardId: number;
    type: T;
    data: WidgetData<T>;
    createdAt: Date;
    updatedAt: Date;
};

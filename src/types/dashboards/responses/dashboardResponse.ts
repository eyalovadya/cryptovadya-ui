import { WidgetResponse } from '../../widgets/responses';

export type DashboardResponse = {
    id: number;
    userId: string;
    title: string;
    widgets: WidgetResponse[];
    createdAt: Date;
    updatedAt: Date;
};

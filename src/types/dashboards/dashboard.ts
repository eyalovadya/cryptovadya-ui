import { WidgetResponse } from '../widgets/responses';

export type Dashboard = {
    id: number;
    userId: string;
    title: string;
    widgets: WidgetResponse[];
    createdAt: Date;
    updatedAt: Date;
};

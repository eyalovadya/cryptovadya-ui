import { Widget } from './widget';

export type Dashboard = {
    id: string;
    // userId: string;
    title: string;
    widgets: Widget[];
};

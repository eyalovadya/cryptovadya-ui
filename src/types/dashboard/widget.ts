export type WidgetType = 'STAT_CARD';

export type StatCardData = {
    baseCurrency: string;
    quoteCurrency: string;
    data: number;
    dayDiffPrecent: number;
};

export type Widget<T extends WidgetType = any> = {
    id: string;
    dashboardId: string;
    type: T;
    data: T extends 'STAT_CARD' ? StatCardData : any;
};

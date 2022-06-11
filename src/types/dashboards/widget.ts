export type WidgetType = 'STAT_CARD';

export type CryptoPair = {
    baseCurrencyId: string;
    baseCurrencyName: string;
    baseCurrency: string;
    quoteCurrency: string;
};

export type StatCardData = CryptoPair & {
    data: number;
    dayDiffPrecent: number;
};

export type Widget<T extends WidgetType> = {
    id: string;
    dashboardId: string;
    type: T;
    data: T extends 'STAT_CARD' ? StatCardData : any;
};

export type CreateStatCardPayload = {
    type: 'STAT_CARD';
    dashboardId: string;
    baseCurrency: string;
    baseCurrencyId: string;
    baseCurrencyName: string;
    quoteCurrency: string;
};

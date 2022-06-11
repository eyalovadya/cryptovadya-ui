import { SimplePriceResponse } from './types/simplePriceResponse';

class CoinGeckoClient {
    private baseUrl = 'https://api.coingecko.com/api/v3';

    async simplePrice(baseCurrenciesIds: string[], quoteCurrencies: string[]): Promise<SimplePriceResponse> {
        const ids = baseCurrenciesIds.join(',').toLowerCase();
        const vsCurrencies = quoteCurrencies.join(',').toLowerCase();
        const response = await fetch(`${this.baseUrl}/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}&include_24hr_change=true`);
        const data = await response.json();
        return data;
    }
}

export default new CoinGeckoClient();

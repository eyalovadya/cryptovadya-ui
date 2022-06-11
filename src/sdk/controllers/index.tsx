import { ApiClient, IApiClient } from '../infrastructure/apiClientProvider';

export default class BaseController {
    protected client: IApiClient;
    constructor(baseUrl: string) {
        this.client = ApiClient.getInstance(baseUrl);
    }
}

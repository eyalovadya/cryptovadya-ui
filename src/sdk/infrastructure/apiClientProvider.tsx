export class ApiClient implements IApiClient {
    private static instance: ApiClient;
    private _baseUrl: string;

    private constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    public static getInstance(baseUrl: string): ApiClient {
        if (!this.instance) {
            this.instance = new ApiClient(baseUrl);
        }
        return this.instance;
    }

    get baseUrl() {
        return this._baseUrl;
    }

    async get(url: string) {
        return await this.callRequest(url, { method: 'GET' });
    }

    async post(url: string, body?: BodyInit) {
        return await this.callRequest(url, { method: 'POST', body });
    }

    async put(url: string, body?: BodyInit) {
        return await this.callRequest(url, { method: 'PUT', body });
    }

    async delete(url: string, body?: BodyInit) {
        return await this.callRequest(url, { method: 'DELETE', body });
    }

    async callRequest(url: string, options?: RequestInit) {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };

        const requestOptions: RequestInit = { ...options, headers, credentials: 'include' };

        const response = await fetch(this.mergeUrl(url), requestOptions);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error');
        }

        return data;
    }

    mergeUrl(url: string) {
        return this._baseUrl + url;
    }
}

export interface IApiClient {
    baseUrl: string;
    get: (url: string) => Promise<any>;
    post: (url: string, body?: BodyInit) => Promise<any>;
    put: (url: string, body?: BodyInit) => Promise<any>;
    delete: (url: string, body?: BodyInit) => Promise<any>;
    callRequest(url: string, options?: RequestInit): Promise<any>;
}

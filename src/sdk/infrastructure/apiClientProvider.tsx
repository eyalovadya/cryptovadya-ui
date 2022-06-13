type body = string | ArrayBuffer | ArrayBufferView | NodeJS.ReadableStream | URLSearchParams | FormData | undefined;
type bodyType = 'JSON' | 'FORM-DATA';

export type headersType = {
    'Content-Type'?: string;
    Authorization?: string;
};

export const contentTypes = {
    urlencoded: 'application/x-www-form-urlencoded',
    json: 'application/json'
};

export class ApiClient implements IApiClient {
    private static instance: ApiClient;
    private _baseUrl: string;
    private bodyType: bodyType = 'JSON';
    headers: headersType = {};

    private constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    public static getInstance(baseUrl: string): ApiClient {
        if (!this.instance) {
            this.instance = new ApiClient(baseUrl);
        }
        return this.instance;
    }

    public setBodyType(bodyType: bodyType) {
        this.bodyType = bodyType;
    }

    get baseUrl() {
        return this._baseUrl;
    }

    async get(url: string) {
        return await this.callRequest(url, { method: 'GET' });
    }

    async post(url: string, body?: body) {
        return await this.callRequest(url, { method: 'POST', body });
    }

    async put(url: string, body?: body) {
        return await this.callRequest(url, { method: 'PUT', body });
    }

    async delete(url: string, body?: body) {
        return await this.callRequest(url, { method: 'DELETE', body });
    }

    async callRequest(url: string, options?: any) {
        const headers = { ...this.headers };
        if (this.bodyType === 'JSON') headers['Content-Type'] = contentTypes.json;

        const requestOptions = { ...options, headers, credentials: 'include' };

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
    headers: headersType;
    get: (url: string) => Promise<any>;
    post: (url: string, body?: body) => Promise<any>;
    put: (url: string, body?: body) => Promise<any>;
    delete: (url: string, body?: body) => Promise<any>;
    setBodyType: (bodyType: bodyType) => void;
    callRequest(url: string, options?: any): Promise<any>;
}

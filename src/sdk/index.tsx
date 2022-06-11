import Users from './controllers/users/users';
import Dashboards from './controllers/dashboards/dashboards';

class CryptOvadyaSDK {
    private baseUrl: string;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
    }
    users() {
        return new Users(this.baseUrl);
    }
    dashboards() {
        return new Dashboards(this.baseUrl);
    }
}

export const localSDK = new CryptOvadyaSDK(process.env.REACT_APP_API_URL);

import Users from './controllers/users/users';
import Dashboards from './controllers/dashboards/dashboards';
import Widgets from './controllers/widgets/widgets';

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
    widgets() {
        return new Widgets(this.baseUrl);
    }
}

export const localSDK = new CryptOvadyaSDK(process.env.REACT_APP_API_URL);

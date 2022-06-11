import Auth from './controllers/auth/auth';
import Task from './controllers/dashboard/dashboard';

class CryptOvadyaSDK {
    private baseUrl: string;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
    }
    auth() {
        return new Auth(this.baseUrl);
    }
    task() {
        return new Task(this.baseUrl);
    }
}

export const localSDK = new CryptOvadyaSDK(`${process.env.REACT_APP_API_URL}/api`);

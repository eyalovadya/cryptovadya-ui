import BaseController from '..';
import IAuth from './IAuth';

export type loginResponse = {
    token: string;
};
export default class Auth extends BaseController implements IAuth {
    async login(email: string, password: string) {
        const response: loginResponse = await this.client.post('/auth', JSON.stringify({ email, password }));
        return response;
    }

    async logout() {
        await this.client.post('/auth/logout');
    }
}

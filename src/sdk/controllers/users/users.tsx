import BaseController from '..';
import IUsers from './IUsers';

export type loginResponse = {
    token: string;
};
export default class Users extends BaseController implements IUsers {
    async login(email: string, password: string) {
        const response: loginResponse = await this.client.post('/auth', JSON.stringify({ email, password }));
        return response;
    }

    async logout() {
        await this.client.post('/auth/logout');
    }
}

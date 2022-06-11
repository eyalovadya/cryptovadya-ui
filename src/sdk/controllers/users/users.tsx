import BaseController from '..';
import IUsers from './IUsers';
import { UserRegisterPayload, UserLoginPayload, UserUpdatePayload } from '../../../types/users/payloads';
import { UserLoginResponse, UserResponse } from '../../../types/users/responses';

export default class Users extends BaseController implements IUsers {
    async register(payload: UserRegisterPayload): Promise<UserLoginResponse> {
        const response: UserLoginResponse = await this.client.post('/users/register', JSON.stringify(payload));
        return response;
    }

    async login(payload: UserLoginPayload): Promise<UserLoginResponse> {
        const response: UserLoginResponse = await this.client.post('/users/login', JSON.stringify(payload));
        return response;
    }

    async getMe(): Promise<UserResponse> {
        const response: UserResponse = await this.client.get('/users/me');
        return response;
    }

    async updateMe(payload: UserUpdatePayload): Promise<UserResponse> {
        const response: UserResponse = await this.client.put('/users/me', JSON.stringify(payload));
        return response;
    }

    async deleteMe(): Promise<UserResponse> {
        const response: UserResponse = await this.client.delete('/users/me');
        return response;
    }

    async logout() {
        await this.client.post('/users/logout');
    }
}

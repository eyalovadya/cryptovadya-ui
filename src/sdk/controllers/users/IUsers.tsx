import { loginResponse } from './users';

export default interface IUsers {
    login: (email: string, password: string) => Promise<loginResponse>;
    logout: () => Promise<void>;
}

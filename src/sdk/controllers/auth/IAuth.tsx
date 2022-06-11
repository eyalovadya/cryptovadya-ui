import { loginResponse } from './auth';

export default interface IAuth {
    login: (email: string, password: string) => Promise<loginResponse>;
    logout: () => Promise<void>;
}

import { UserRegisterPayload, UserLoginPayload, UserUpdatePayload } from '../../../types/users/payloads';
import { UserLoginResponse, UserResponse } from '../../../types/users/responses';

export default interface IUsers {
    register: (payload: UserRegisterPayload) => Promise<UserLoginResponse>;
    login: (payload: UserLoginPayload) => Promise<UserLoginResponse>;
    getMe: () => Promise<UserResponse>;
    updateMe: (payload: UserUpdatePayload) => Promise<UserResponse>;
    deleteMe: () => Promise<UserResponse>;
    logout: () => Promise<void>;
}

import { UserResponse } from './userResponse';

export type UserLoginResponse = UserResponse & {
    token: string;
};

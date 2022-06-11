import { createModel } from '@rematch/core';
import { RootModel } from '..';
import { User } from '../../../types/users';
import { localSDK as client } from '../../../sdk';
import { UserRegisterPayload, UserLoginPayload, UserUpdatePayload } from '../../../types/users/payloads';

export type UserStateType = {
    user: null | User;
};

export const user = createModel<RootModel>()({
    state: {
        user: null
    } as UserStateType,
    reducers: {
        setUser(state: UserStateType, user: User | null) {
            return { ...state, user };
        }
    },
    effects: (dispatch) => ({
        async register(payload: UserRegisterPayload) {
            const user = await client.users().register(payload);
            dispatch.user.setUser(user);
        },
        async login(payload: UserLoginPayload) {
            const user = await client.users().login(payload);
            dispatch.user.setUser(user);
        },
        async getMe() {
            const user = await client.users().getMe();
            dispatch.user.setUser(user);
        },
        async updateMe(payload: UserUpdatePayload) {
            const user = await client.users().updateMe(payload);
            dispatch.user.setUser(user);
        },
        async deleteMe() {
            await client.users().deleteMe();
            dispatch.user.setUser(null);
        },
        async logout() {
            await client.users().logout();
            dispatch.user.setUser(null);
        }
    })
});

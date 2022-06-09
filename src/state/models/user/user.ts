import { createModel } from '@rematch/core';
import { RootModel } from '..';
import { UserInfo } from '../../../types/user';

export type UserStateType = {
    user: null | UserInfo;
};

export const user = createModel<RootModel>()({
    state: {
        user: null
    } as UserStateType,
    reducers: {},
    effects: (dispatch) => ({})
});

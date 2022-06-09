import { createModel } from '@rematch/core';
import { RootModel } from '..';

export type AppThemeType = 'LIGHT' | 'DARK';

export type AppStateType = {
    theme: AppThemeType;
};

export const app = createModel<RootModel>()({
    state: {
        theme: 'DARK'
    } as AppStateType,
    reducers: {
        toggleTheme(state: AppStateType) {
            const newTheme: AppThemeType = state.theme === 'DARK' ? 'LIGHT' : 'DARK';

            return { ...state, theme: newTheme };
        }
    }
});

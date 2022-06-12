import { createModel } from '@rematch/core';
import { RootModel } from '..';

export type AppThemeType = 'LIGHT' | 'DARK';

export type AppStateType = {
    theme: AppThemeType;
};

export const app = createModel<RootModel>()({
    state: {
        theme: window.localStorage.getItem('APP_THEME') || 'DARK'
    } as AppStateType,
    reducers: {
        toggleTheme(state: AppStateType) {
            const newTheme: AppThemeType = state.theme === 'DARK' ? 'LIGHT' : 'DARK';
            window.localStorage.setItem('APP_THEME', newTheme);
            return { ...state, theme: newTheme };
        }
    }
});

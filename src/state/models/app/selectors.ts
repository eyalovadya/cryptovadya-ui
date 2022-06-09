import { darkTheme, lightTheme } from './../../../shared/theme';
import { AppThemeType } from './app';
import { createSelector } from 'reselect';
import { RootState } from './../../store';

const currentAppThemeType = (state: RootState) => state.app.theme;

const appTheme = createSelector(currentAppThemeType, (themeType: AppThemeType) => {
    return themeType === 'DARK' ? darkTheme : lightTheme;
});

const isDarkTheme = createSelector(currentAppThemeType, (themeType: AppThemeType) => {
    return themeType === 'DARK';
});

export { default as appSelectors } from './selectors';

const selectors = { appTheme, isDarkTheme };

export default selectors;

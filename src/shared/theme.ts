import { DefaultTheme } from 'styled-components';

const sharedTheme = {
    textSize: {
        default: '14px',
        title: '18px',
        titleBig: '22px'
    },
    borderRadius: '14px'
};
export const lightTheme: DefaultTheme = {
    appBackground: '#f1f1f1',
    textColor: '#22252b',
    ...sharedTheme
};

export const darkTheme: DefaultTheme = {
    appBackground: '#22252b',
    textColor: '#f1f1f1',
    ...sharedTheme
};

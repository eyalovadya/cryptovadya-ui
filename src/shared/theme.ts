import { DefaultTheme } from 'styled-components';

const sharedTheme = {
    textSize: {
        small: '12px',
        default: '14px',
        title: '18px',
        titleBig: '26px'
    },
    borderRadius: '14px',
    colors: {
        primary: '#31d8bf',
        secondary: '#0965f1',
        primaryGradient: 'linear-gradient(333.68deg,#0965f1 -25.37%,#31d8bf 103.14%)'
    }
};
export const lightTheme: DefaultTheme = {
    appBackground: '#f1f1f1',
    textColor: '#595d63',
    borderColor: '#595d63',
    cardBackground: 'linear-gradient(333.68deg,#d5dceb -25.37%,#e2ecf9 103.14%)',
    cardShadow: '0 3px 6px rgb(0 0 0 / 3%), 0 3px 6px rgb(0 0 0 / 8%)',
    input: {
        backgroundColor: '#c2d0e6',
        fontSize: '16px'
    },
    ...sharedTheme
};

export const darkTheme: DefaultTheme = {
    appBackground: '#22252b',
    textColor: '#c7d4e5',
    borderColor: '#c7d4e5',
    cardBackground: 'linear-gradient(333.68deg,#2d3036 -25.37%, #3b3f44 103.14%)',
    cardShadow: '0 3px 6px rgb(0 0 0 / 3%), 0 3px 6px rgb(0 0 0 / 8%)',
    input: {
        backgroundColor: '#697079',
        fontSize: '16px'
    },
    ...sharedTheme
};

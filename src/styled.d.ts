import 'styled-components';

// extend original declarations
declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: string;
        borderColor: string;
        cardBackground: string;
        cardShadow: string;
        appBackground: string;
        textColor: string;
        mainButtonColor: string;
        mainButtonColorHover: string;
        textSize: {
            small: string;
            default: string;
            title: string;
            titleBig: string;
        };
        colors: {
            primary: string;
            secondary: string;
            primaryGradient: string;
        };
        input: {
            backgroundColor: string;
            fontSize: string;
        };
    }
}

import 'styled-components';

// extend original declarations
declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: string;
        appBackground: string;
        textColor: string;
        textSize: {
            default: string;
            title: string;
            titleBig: string;
        };
    }
}

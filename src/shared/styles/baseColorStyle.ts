import { css } from 'styled-components';

export const baseColorStyle = css`
    background-color: ${(props) => props.theme.appBackground};
    color: ${(props) => props.theme.textColor};
    transition: background-color 0.2s ease;
`;

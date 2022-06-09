import { css } from 'styled-components';

export const baseColorStyle = css`
    background-color: ${(props) => props.theme.appBackground};
    color: ${(props) => props.theme.textColor};
`;

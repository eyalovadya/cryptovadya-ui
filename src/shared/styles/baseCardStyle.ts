import { css } from 'styled-components';

export const baseCardStyle = css`
    border-radius: ${(props) => props.theme.borderRadius};
    background: ${(props) => props.theme.cardBackground};
    box-shadow: ${(props) => props.theme.cardShadow};
    padding: 20px;
    box-sizing: border-box;
    display: flex;
`;

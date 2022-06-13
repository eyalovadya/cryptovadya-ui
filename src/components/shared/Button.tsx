import styled, { css } from 'styled-components';

type Props = {
    width?: string;
    height?: string;
    fontSize?: string;
    disabled?: boolean;
};

const Button = styled.button<Props>`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;

    color: ${(props) => props.theme.colors.primary};

    width: ${(props) => props.width ?? 'auto'};
    height: ${(props) => props.height ?? 'auto'};
    font-size: ${(props) => props.fontSize ?? '16px'};
    border-radius: ${(props) => props.theme.borderRadius};
    font-weight: 500;
    white-space: nowrap;

    ${(props) =>
        props.disabled
            ? css`
                  color: ${(props) => `${props.theme.colors.primary}aa`};
                  cursor: default;
              `
            : css`
                  &:hover {
                      color: ${(props) => props.theme.colors.primaryHover};
                  }
              `}
`;

export default Button;

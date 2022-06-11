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

    color: ${(props) => props.theme.mainButtonColor};

    width: ${(props) => props.width ?? 'auto'};
    height: ${(props) => props.height ?? 'auto'};
    font-size: ${(props) => props.fontSize ?? '16px'};
    border-radius: ${(props) => props.theme.borderRadius};
    font-weight: 500;

    ${(props) =>
        props.disabled
            ? css`
                  color: ${(props) => `${props.theme.mainButtonColor}aa`};
                  cursor: not-allowed;
              `
            : css`
                  &:hover {
                      color: ${(props) => props.theme.mainButtonColorHover};
                  }
              `}
`;

export default Button;

import styled, { css } from 'styled-components';

type Props = {
    width?: string;
    height?: string;
    fontSize?: string;
    delete?: boolean;
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

    color: ${(props) => props.color || props.theme.colors[props.delete ? 'delete' : 'primary']};

    width: ${(props) => props.width ?? 'auto'};
    height: ${(props) => props.height ?? 'auto'};
    font-size: ${(props) => props.fontSize ?? '16px'};
    border-radius: ${(props) => props.theme.borderRadius};
    font-weight: 500;
    white-space: nowrap;

    ${(props) =>
        props.disabled
            ? css`
                  color: ${props.theme.colors[props.delete ? 'delete' : 'primary']}aa;
                  cursor: default;
              `
            : css`
                  &:hover {
                      color: ${props.theme.colors[props.delete ? 'deleteHover' : 'primaryHover']};
                  }
              `}
`;

export default Button;

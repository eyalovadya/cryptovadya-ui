import styled, { css } from 'styled-components';

type Props = {
    width?: string;
    height?: string;
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

    background: ${(props) => props.theme.colors.primaryGradient};
    /* color: ${(props) => props.theme.textColor}; */

    width: ${(props) => props.width ?? 'auto'};
    height: ${(props) => props.height ?? 'auto'};
    font-size: 16px;
    margin: 10px;
    border-radius: ${(props) => props.theme.borderRadius};
    font-weight: 500;

    ${(props) =>
        props.disabled
            ? css`
                  background: linear-gradient(0deg, rgb(0 0 0 / 28%), rgb(31 35 43 / 28%)),
                      linear-gradient(333.68deg, #0965f1 -25.37%, #31d8bf 103.14%);
                  cursor: not-allowed;
              `
            : css`
                  &:hover {
                      background: linear-gradient(0deg, rgba(45, 48, 55, 0.2), rgba(45, 48, 55, 0.2)),
                          linear-gradient(333.68deg, #0965f1 -25.37%, #31d8bf 103.14%);
                  }
              `}

    background-clip: text !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
`;

export default Button;

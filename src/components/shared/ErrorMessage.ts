import styled from 'styled-components';

export const ErrorMessage = styled.div`
    color: red;
    height: 16px;
    font-size: ${(props) => props.theme.textSize.small};
    margin-bottom: 8px;
`;

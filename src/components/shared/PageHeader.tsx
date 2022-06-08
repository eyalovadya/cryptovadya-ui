import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import React, { ComponentProps } from 'react';
import Button from './Button';

export type PageHeaderActionButtonType = ComponentProps<typeof Button> & { text: string };
type Props = {
    children: string;
    actionButtons?: PageHeaderActionButtonType[];
};
const PageHeader = ({ children, actionButtons }: Props) => {
    return (
        <Header>
            <Title>{children}</Title>
            <ButtonsContainer>
                {actionButtons?.map(({ text, ...rest }) => (
                    <Button key={uuidv4()} {...rest}>
                        {text}
                    </Button>
                ))}
            </ButtonsContainer>
        </Header>
    );
};

const Header = styled.div`
    width: 100%;
    display: flex;
    font-weight: 400;
    padding: 20px 0 30px 0;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: ${(props) => props.theme.textSize.title};
`;

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
`;

export default PageHeader;

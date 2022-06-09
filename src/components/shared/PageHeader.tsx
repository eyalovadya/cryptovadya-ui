import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import React, { ComponentProps } from 'react';
import Button from './Button';
import Link from './Link';
import { LinkProps } from 'react-router-dom';

export type PageHeaderActionButtonType = ComponentProps<typeof Button> & { text: string; link?: LinkProps };
type Props = {
    children: string;
    goBackPath?: string;
    actionButtons?: PageHeaderActionButtonType[];
};
const PageHeader = ({ children, actionButtons, goBackPath }: Props) => {
    return (
        <Header>
            <Title>
                {children}
                {goBackPath && (
                    <Link to={goBackPath}>
                        <Button style={{ fontSize: 12, margin: '0 10px' }}>{'Go Back'}</Button>
                    </Link>
                )}
            </Title>

            <ButtonsContainer>
                {actionButtons?.map(({ text, link, ...rest }) =>
                    link ? (
                        <Link key={uuidv4()} {...link}>
                            <Button {...rest}>{text}</Button>
                        </Link>
                    ) : (
                        <Button key={uuidv4()} {...rest}>
                            {text}
                        </Button>
                    )
                )}
            </ButtonsContainer>
        </Header>
    );
};

const Header = styled.div`
    width: 100%;
    display: flex;
    font-weight: 400;
    padding: 20px 24px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
`;

const Title = styled.div`
    font-size: ${(props) => props.theme.textSize.title};
`;

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
`;

export default PageHeader;

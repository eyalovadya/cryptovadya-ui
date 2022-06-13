import { LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import Link from './Link';
import ThinkingImageDark from '../../static/thinkingDark.png';
import ThinkingImageLight from '../../static/thinkingLight.png';
import { useSelector } from 'react-redux';
import { appSelectors } from '../../state/models/app/selectors';

type Props = {
    message: string;
    subMessage?: string;
    linkButtonProps?: LinkProps;
    linkButtonText?: string;
};
const EmptyState = ({ message, subMessage, linkButtonProps, linkButtonText }: Props) => {
    const isDarkTheme = useSelector(appSelectors.isDarkTheme);
    return (
        <Container>
            <EmptyStateImage src={isDarkTheme ? ThinkingImageLight : ThinkingImageDark} alt="thinking" />
            <Message>{message}</Message>
            {subMessage && <SubMessage>{subMessage}</SubMessage>}
            {linkButtonProps && linkButtonText && (
                <LinkContainer>
                    <Link {...linkButtonProps}>
                        <Button>{linkButtonText}</Button>
                    </Link>
                </LinkContainer>
            )}
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 150px;
    box-sizing: border-box;
`;

const Message = styled.div`
    font-size: ${(props) => props.theme.textSize.title};
    margin-bottom: 10px;
`;

const SubMessage = styled.div`
    font-size: ${(props) => props.theme.textSize.small};
    color: ${(props) => `${props.theme.textColor}bb`};
`;

const LinkContainer = styled.div`
    margin-top: 20px;
`;

const EmptyStateImage = styled.img`
    width: 120px;
    margin-bottom: 50px;
`;
export default EmptyState;

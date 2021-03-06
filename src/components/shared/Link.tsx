import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(RouterLink)`
    text-decoration: none;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }

    color: ${(props) => props.theme.textColor};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Link = (props: LinkProps & React.RefAttributes<HTMLAnchorElement>) => <StyledLink {...props} />;

export default Link;

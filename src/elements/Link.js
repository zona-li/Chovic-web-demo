import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    text-decoration: none;
    font-family: Dosis-Bold;
    margin: 15px;

    &:active {
        color: black;
    }
`;

const HeaderLink = styled(StyledLink)`
    color: Gainsboro;
    text-transform: uppercase;
`;

export { StyledLink, HeaderLink };
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    text-decoration: none;
    font-family: Dosis-Bold;
    margin: 15px;
    color: white;

    &:active {
        color: powderblue;
    }

    &:hover {
        color: Black;
    }
`;

const HeaderLink = styled(StyledLink)`
    color: Silver;
    text-transform: uppercase;
`;

const A = styled.a`
    text-decoration: none;
    font-family: Dosis-Bold;
    margin-left: 50px;
    color: white;

    &:active {
        color: powderblue;
    }
`;

export { StyledLink, HeaderLink, A };
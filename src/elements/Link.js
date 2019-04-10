import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    text-decoration: ${props => props.decoration || 'none'};
    font-family: Dosis-Bold;
    color: DarkOrange;

    &:active {
        color: Orange;
    }

    &:hover {
        color: Orange;
    }
`;

const HeaderLink = styled(StyledLink)`
    color: Silver;
    text-transform: uppercase;
`;

const A = styled.a`
    text-decoration: none;
    font-family: Dosis-Bold;
    color: white;
    cursor: pointer;

    &:active {
        color: powderblue;
    }

    &:hover {
        color: powderblue;
    }
`;

export { StyledLink, HeaderLink, A };
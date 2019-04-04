import styled from 'styled-components';

const Img = styled.img`
    @media (max-width: 768px) {
        display: none;
    }
    @media (min-width: 768px) {
        width: 20vw;
        height: auto;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
`;

const WideImg = styled(Img)`
    width: 40vw;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;


export { Img, WideImg };
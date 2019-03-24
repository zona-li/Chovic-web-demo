import styled from 'styled-components';

const Img = styled.img`
    width: 20vw;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

const WideImg = styled(Img)`
    width: 40vw;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;


export { Img, WideImg };
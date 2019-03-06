import styled from 'styled-components';

const SectionLeft = styled.section`
    color: AliceBlue;
    width: 50%;
    height: 50vw;
    float: left;
    
    background: ${props => props.background};
`;

const SectionRight = styled.section`
    color: AliceBlue;
    width: 50%;
    height: 50vw;
    float: right;
    
    background: ${props => props.background};
`;

const Section = styled.section`
    color: AliceBlue;
    width: 100%;
    height: 100vw;
    
    background: ${props => props.background};
`;

export { SectionLeft, SectionRight, Section };
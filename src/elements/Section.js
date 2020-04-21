import styled from 'styled-components';

const SectionLeft = styled.section`
  width: 100%;
  height: 100vh;
  text-align: left;
  background: ${(props) => props.background};
  background-image: ${(props) => props.backgroundImage};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: 768px) {
    float: left;
    width: 50%;
  }
`;

const SectionRight = styled.section`
  color: AliceBlue;
  width: 100%;
  height: 100vh;
  text-align: center;
  background: ${(props) => props.background};

  @media (min-width: 768px) {
    float: right;
    width: 50%;
  }
`;

const Section = styled.section`
  color: AliceBlue;
  width: 100%;
  height: 100vh;
  float: left;

  background: ${(props) => props.background};
`;

export { SectionLeft, SectionRight, Section };

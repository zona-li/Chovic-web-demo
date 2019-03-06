import React from 'react';
import styled from 'styled-components';

import { SectionLeft, SectionRight, Section } from '../../elements/Section';
import { P } from '../../elements/P';
import art1 from '../../images/art1.png';
import { Img } from '../../elements/Img';
import { H1 } from '../../elements/H1';
import { Button } from '../../elements/Button';

const TitleLeft = styled.h1`
    text-align: right;
    margin-right: 5px;
    font-size: 6vw;
    color: Gainsboro;
`;

const TitleRight = styled.h1`
    text-align: left;
    margin-left: 5px;
    font-size: 6vw;
    color: Gainsboro;
`;

const Landing = () => (
    <div>
        <SectionLeft background="Cornflowerblue">
            <TitleLeft>cho</TitleLeft>
            <Img src={art1} alt="img1" />
        </SectionLeft>
        <SectionRight background="Salmon">
            <TitleRight>vic</TitleRight>
            <H1>A growth environment to help you build good habits, become more 
                disciplined, and execute to the highest standards</H1>
            <P>Join a group of people who relentlessly seek to learn, improve, 
                and, all the while, have fun during the process. We believe the 
                compound effect of small but steady improvements; we find our 
                strengths and weaknesses through transparent communication; 
                we hold each other to our highest standards and inspire each other 
                to constantly improve.</P>
            <br />
            <a href="#section1">
                <span role="img" aria-label="downward-arrow">👇</span>How it works
            </a>
            <Button color="white" primary="Salmon">
                Apply
            </Button>
        </SectionRight>
        <Section background="Black">
            <scroll-container>
                <scroll-page id="section1"></scroll-page>
            </scroll-container>
        </Section>
    </div>
);
export default Landing;
import React from 'react';
import styled from 'styled-components';

import { SectionLeft, SectionRight, Section } from '../../elements/Section';
import { P } from '../../elements/P';
import art1 from '../../images/art1.png';
import { Img } from '../../elements/Img';
import { H1 } from '../../elements/H1';
import { Button } from '../../elements/Button';
import { A } from '../../elements/Link';

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
            <H1>A growth environment to help you form good habits, become more 
                disciplined, and build the mental model that leads to success.</H1>
            <P>Have you ever had an idea but find it difficult to realize? or had a goal but always fall short?
                The reason might be that you are deploying the wrong method or lack a supportive community who 
                can keep you accountable. Join a group of people who relentlessly seek to learn, improve, and 
                constantly challenge themselves to do better. Chovic is a gathering place for people who are 
                unwilling to settle, who pushes hard and persist. Here, you will meet incredible people, find 
                supports, practice stoicism, overcome fear and doubt, have fun, and, most importantly, realize
                your true potential.
            </P>
            <br />
            <A href="#section1">
                <span role="img" aria-label="downward-arrow">👇</span>How it works
            </A>
            <Button color="white" primary="Salmon">
                Apply
            </Button>
        </SectionRight>

        <Section background="SeaGreen">
            <scroll-container>
                <scroll-page id="section1">
                    Page
                </scroll-page>
            </scroll-container>
        </Section>
    </div>
);
export default Landing;
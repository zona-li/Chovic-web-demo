import React, { Component } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import { SectionLeft, SectionRight, Section } from '../../elements/Section';
import { P } from '../../elements/P';
import art1 from '../../images/art1.png';
import meet from '../../images/meet.jpg';
import { Img, WideImg } from '../../elements/Img';
import { H1 } from '../../elements/H1';
import { Button } from '../../elements/Button';
import { A, StyledLink } from '../../elements/Link';
import * as ROUTES from '../../constants/routes';
import { Grid } from '@material-ui/core';

const TitleLeft = styled.h1`
    text-align: right;
    margin-right: 5px;
    font-size: 6vw;
    color: Gainsboro;
    z-index: 1;
`;

const TitleRight = styled.h1`
    text-align: left;
    margin-left: 5px;
    font-size: 6vw;
    color: Gainsboro;
`;

const styles = theme => ({
    root: {
        alignContent: 'center',
        paddingTop: '20vh',
        margin: '0 auto',
        height: '100%',
    },
    text: {
        color: 'MistyRose',
    }
});

class Landing extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <SectionLeft background="Cornflowerblue" background-image="url(art1)">
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
                        supports, practice stoicism, learn to lead from the front, have fun, and, most importantly, 
                        realize your true potential.
                    </P>
                    <br />
                    <A href="#section1">
                        <Button color="white" primary="Salmon">
                            How it works
                        </Button>
                    </A>
                    
                    <StyledLink to={ROUTES.APPLICATION}>
                        <Button color="white" primary="Salmon">
                            Apply
                        </Button>
                    </StyledLink>
                </SectionRight>
    
                <Section background="Seagreen">
                    <scroll-container>
                        <scroll-page id="section1">
                            <Grid  className={classes.root} container spacing={24}>
                                <Grid className={classes.text} item xs={5}>
                                    <P style={{marginLeft: '10vw'}}>
                                    The group is based in Charlottesville, Virginia. We meet once a week to discuss goals, 
                                    draft out weekly plans, analyze our trajectory of growth, and share anything we learned 
                                    from the previous week. Each member of the group have 1 personal challenge and 1 group 
                                    challenge to complete on a weekly or monthly basis. Based on those challenges, we arrange 
                                    daily check-ins on <A href="https://slack.com/" target="_blank">Slack</A> and keep track 
                                    of each individual’s progress on <A href="https://coda.io/welcome" target="_blank">Coda</A>. 
                                    Because we value the rate of improvement more than experience or current accomplishment, 
                                    reward or punishment will be given based on each individual’s progress, instead of the 
                                    weight of achievement.
                                    </P>
                                </Grid>
                                <Grid className={classes.pic} item xs={7}>
                                    <WideImg src={meet} alt="img1" />
                                </Grid>
                            </Grid>
                        </scroll-page>
                    </scroll-container>
                </Section>
            </div>
        )
    };    
}

export default withStyles(styles)(Landing);
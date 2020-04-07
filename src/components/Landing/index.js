import React, { Component } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import { SectionLeft, SectionRight, Section } from '../../elements/Section';
import { P } from '../../elements/P';
import art1 from '../../assets/art1.jpg';
import meet from '../../assets/meet.jpg';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Group from '@material-ui/icons/Group';
import ShowChart from '@material-ui/icons/ShowChart';
import Chat from '@material-ui/icons/Chat';
import { H1 } from '../../elements/H1';
import { StyledLink } from '../../elements/Link';
import * as ROUTES from '../../constants/routes';
import { Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './styles.css';

const TitleLeft = styled.h1`
    @media (min-width: 768px) {
        text-align: right;
        margin-right: 5px;
        font-size: 6vw;
        color: BlanchedAlmond;
        z-index: 1;
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

const TitleRight = styled.h1`
    @media (min-width: 768px) {
        text-align: left;
        margin-left: 5px;
        font-size: 6vw;
        color: BlanchedAlmond;
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

const Title = styled.h1`
    @media (min-width: 768px) {
        display: none;
    }
    @media (max-width: 768px) {
        font-size: 25vw;
        margin-top: 30vh;
    }
`;

const styles = theme => ({
    root: {
        alignContent: 'center',
        margin: '0 auto',
        height: '100%',
    },
    text: {
        color: 'MistyRose',
    },
    title: {
        color: '#E83F6F',
        fontSize: '6em',
        display: 'inline-block',
        marginLeft: '10%',
        marginRight: '10%',
        [theme.breakpoints.down('sm')]: {
            fontSize: '15vw',
        },
    },
    title2: {
        color: 'SandyBrown',
        fontSize: '6em',
        margin: '10vw',
        [theme.breakpoints.down('sm')]: {
            fontSize: '15vw',
        },
    },
    list: {
        display: 'inline-block',
        margin: '10%',
    },
    listItem: {
        marginBottom: '10%',
    },
    listItemText: {
        fontSize:'1.2em',
        color: 'DimGray',
    },
    pic: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    }
});

class Landing extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid>
                    <SectionLeft backgroundImage={`url(${art1})`}>
                        <TitleLeft>cho</TitleLeft>
                        <Title>CHOVIC</Title>
                    </SectionLeft>
                    <SectionRight background="CadetBlue">
                        <TitleRight>vic</TitleRight>
                        <H1>A growth environment to help you form good habits, become more 
                            disciplined, and procrastinate less.</H1>
                        <P>Have you ever had an idea but find it difficult to realize? or had a goal but always fall short?
                            Most of the time, it is because you are deploying the wrong method or lack a supportive community 
                            to keep you accountable. Join a group of people who relentlessly seek to learn, improve, and 
                            constantly challenge themselves to do better. Chovic is a gathering place for people who are 
                            unwilling to settle, who pushes hard and persist. Here, you will meet incredible people, find 
                            supports, learn the methods that will help you succeed, have fun, and, most importantly, achieve the
                            goals you set for yourself.
                        </P>
                    </SectionRight>
                    <section id="section0">
                        <a href="#section1"><span></span></a>
                    </section>
                </Grid>
                
    
                <Section id="section1" background="Seagreen">
                    <Grid  className={classes.root} container spacing={1}>
                        <Grid className={classes.text} item md={6} sm={12}>
                            <P style={{marginLeft: '10vw'}}>
                            We have a Meetup group based in Charlottesville, Virginia. The group meets once a week to discuss goals, 
                            draft out weekly plans, and share anything we learned from the previous week. We keep track 
                            of each individual’s progress on our website, which offers the tool to help each person to build up good habits.
                            We occasionally have group challenges that aim to encourage people to step out of their comfort zone and experiment
                            with different methods of improving their lives.
                            </P>
                        </Grid>
                        <Grid className={classes.pic} item xs={6} >
                            <img src={meet} alt="img1" height="380" width="auto" />
                        </Grid>
                    </Grid>
                    <section id="section1">
                        <a href="#section2"><span></span></a>
                    </section>
                </Section>

                <SectionLeft id="section2" background="AntiqueWhite">
                    <h1 className={classes.title}>WHY IT WORKS</h1>
                </SectionLeft>
                <SectionRight background="Seashell" >
                    <Grid>
                        <div className={classes.list}>
                        <List>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon>
                                    <Group />
                                </ListItemIcon>
                                <ListItemText classes={{primary: classes.listItemText}}>
                                    Your behavior is held accountable by your friends. When you have a group of people to help you navigate through challenges
                                    and celebrate with each of the milestone you have reached, you would be much likely to follow through.
                                </ListItemText>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon>
                                    <ShowChart />
                                </ListItemIcon>
                                <ListItemText classes={{primary: classes.listItemText}}>
                                    Instead of focusing on the goal, which only states what people want but not how to get there, we design the system that is 
                                    more likely to impact your daily behavior and guide you along the way.
                                </ListItemText>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon>
                                    <Chat />
                                </ListItemIcon>
                                <ListItemText classes={{primary: classes.listItemText}}>
                                    We hold regular talks on topics such as health, finance, behavioral science, and career to share the proven ways of improving 
                                    the quality of our lives.
                                </ListItemText>
                            </ListItem>
                        </List>
                        </div>
                    </Grid>
                    <section id="section2">
                        <a href="#section3"><span></span></a>
                    </section>
                </SectionRight>

                <Section id="section3" background="PowderBlue">
                    <h1 className={classes.title2}><strong>Ready for the challenge? <br/><StyledLink decoration='underline' to={ROUTES.SIGN_UP}>Sign up now</StyledLink></strong> to start the journey</h1>
                </Section>
            </div>
        )
    };    
}

export default withStyles(styles)(Landing);
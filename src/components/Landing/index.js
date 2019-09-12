import React, { Component } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import { SectionLeft, SectionRight, Section } from '../../elements/Section';
import { P } from '../../elements/P';
import art1 from '../../assets/art1.png';
import meet from '../../assets/meet.jpg';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Group from '@material-ui/icons/Group';
import ShowChart from '@material-ui/icons/ShowChart';
import Chat from '@material-ui/icons/Chat';
import { Img } from '../../elements/Img';
import { H1 } from '../../elements/H1';
import { A, StyledLink } from '../../elements/Link';
import * as ROUTES from '../../constants/routes';
import { Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const TitleLeft = styled.h1`
    @media (min-width: 768px) {
        text-align: right;
        margin-right: 5px;
        font-size: 6vw;
        color: Gainsboro;
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
        color: Gainsboro;
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
                    <SectionLeft background="Cornflowerblue" background-image="url(art1)">
                        <TitleLeft>cho</TitleLeft>
                        <Title>CHOVIC</Title>
                        <Img src={art1} alt="img1" />
                    </SectionLeft>
                    <SectionRight background="Salmon">
                        <TitleRight>vic</TitleRight>
                        <H1>A growth environment to help you form good habits, become more 
                            disciplined, end procrastination, and realize your true potential.</H1>
                        <P>Have you ever had an idea but find it difficult to realize? or had a goal but always fall short?
                            Most of the times, it is because you are deploying the wrong method or lack a supportive community 
                            to keep you accountable. Join a group of people who relentlessly seek to learn, improve, and 
                            constantly challenge themselves to do better. Chovic is a gathering place for people who are 
                            unwilling to settle, who pushes hard and persist. Here, you will meet incredible people, find 
                            supports, practice stoicism, learn to lead from the front, have fun, and, most importantly, 
                            discover your true potential.
                        </P>
                    </SectionRight>
                </Grid>
                
    
                <Section background="Seagreen">
                    <Grid  className={classes.root} container spacing={24}>
                        <Grid className={classes.text} item md={6} sm={12}>
                            <P style={{marginLeft: '10vw'}}>
                            The group is based in Charlottesville, Virginia. We meet once a week to discuss goals, 
                            draft out weekly plans, analyze our trajectory of growth, and share anything we learned 
                            from the previous week. Each member of the group have 1 personal challenge and 1 group 
                            challenge to complete on a weekly or monthly basis. Based on those challenges, we arrange 
                            daily check-ins on <A href="https://slack.com/" target="_blank">Slack</A> and keep track 
                            of each individual’s progress on <A href="https://coda.io/welcome" target="_blank">Coda</A>.
                            The group challenges aim to improve different areas such as one's intellect, pain tolerance, 
                            health, and other essential skills that will help us during our life's journey.
                            </P>
                        </Grid>
                        <Grid className={classes.pic} item xs={6} sm={0} >
                            <img src={meet} alt="img1" height="380" width="auto" />
                        </Grid>
                    </Grid>
                </Section>

                <SectionLeft background="AntiqueWhite">
                    <h1 className={classes.title}>WHY OUR METHOD WILL WORK</h1>
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
                                    The peer-to-peer mentoring system powered by scientific proven methods 
                                    will help you get things done faster and better.
                                </ListItemText>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon>
                                    <ShowChart />
                                </ListItemIcon>
                                <ListItemText classes={{primary: classes.listItemText}}>
                                    We value the rate of improvement more than experience or current accomplishment, 
                                    so the incentivizing system will work for anyone from all walks of life.
                                </ListItemText>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon>
                                    <Chat />
                                </ListItemIcon>
                                <ListItemText classes={{primary: classes.listItemText}}>
                                    We keep an authentic and open dialogue at all times to cultivate camaraderie and 
                                    also to make our system work better for everyone involved.
                                </ListItemText>
                            </ListItem>
                        </List>
                        </div>
                    </Grid>
                </SectionRight>

                <Section background="PowderBlue">
                    <h1 className={classes.title2}><strong>Ready for the challenge? Apply <StyledLink decoration='underline' to={ROUTES.APPLICATION}>HERE</StyledLink>!</strong></h1>
                </Section>
            </div>
        )
    };    
}

export default withStyles(styles)(Landing);
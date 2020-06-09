import React, { Component } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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

import { SectionLeft, SectionRight, Section } from '../../elements/Section';
import { P } from '../../elements/P';
import art1 from '../../assets/art1.jpg';
import section2Image from '../../assets/section2.svg';
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

const Title = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  @media (max-width: 768px) {
    font-size: 25vw;
    padding-top: 50px;
    padding-left: 15px;
  }
`;

const Subtitle = styled.div`
  @media (min-width: 768px) {
    color: #e83f6f;
    font-size: 6em;
    margin-left: 50px;
    margin-top: 100px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const styles = (theme) => ({
  root: {
    alignContent: 'center',
    margin: '0 auto',
    height: '100%',
  },
  text: {
    color: 'MistyRose',
  },
  title2: {
    color: 'SandyBrown',
    fontSize: '5em',
    margin: '10vw',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15vw',
    },
  },
  list: {
    display: 'inline-block',
    margin: '10%',
    overflow: 'scroll',
  },
  listItem: {
    marginBottom: '10%',
  },
  listItemText: {
    fontSize: '1.2em',
    color: 'DimGray',
  },
  pic: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
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
            <H1>
              A growth environment to help you form good habits, become more
              disciplined, and implement the right mental model for long-term
              success.
            </H1>
            <br />
            <P>
              Have you ever had an idea but find it difficult to realize? Or had
              a goal but always fell short? Most of the time, it is not because
              you are lazy or unmotivated, but because there is a lack of a
              supportive community to keep you accountable or an assemble of
              methods and mental models to help you deal with difficult
              situations at hand. Choivc implements a system that allows you to
              address that. On our platform, you would be able to share a habit
              with your friend, track your progress, and make improvements in a
              systematic way. Whenever you feel down or face a challenging
              situation, our coaching bot would point you to the right resources
              and nudge you to get back on track.
            </P>
          </SectionRight>
          <section id="section0">
            <a href="#section1">
              <span></span>
            </a>
          </section>
        </Grid>

        <Section id="section1" background="Seagreen">
          <Grid className={classes.root} container spacing={1}>
            <Grid className={classes.text} item md={6} sm={12}>
              <P style={{ marginLeft: '10vw' }}>
                Our habit tracker (web version) is released! You can try it out
                for free by{' '}
                <Link
                  style={{
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    color: 'MistyRose',
                  }}
                  to={ROUTES.SIGN_UP}
                >
                  signing up here
                </Link>{' '}
                and verifying your email address. We will keep all our current
                users up to date with our new releases.
              </P>
            </Grid>
            <Grid className={classes.pic} item xs={5}>
              <img src={section2Image} alt="" />
            </Grid>
          </Grid>
          <section id="section1">
            <a href="#section2">
              <span></span>
            </a>
          </section>
        </Section>

        <SectionLeft id="section2" background="AntiqueWhite">
          <Subtitle>WHY OUR METHOD WORKS</Subtitle>
        </SectionLeft>
        <SectionRight background="Seashell">
          <Grid>
            <div className={classes.list}>
              <List>
                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <Group />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.listItemText }}>
                    Your behavior is held accountable by your friends. When you
                    have a group of people to help you navigate through
                    challenges and celebrate with each of the milestone you have
                    reached, you would be much likely to follow through.
                  </ListItemText>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <ShowChart />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.listItemText }}>
                    Instead of focusing on the goal, which only states what
                    people want but not how to get there, we design the system
                    that is more likely to impact your daily behavior and guide
                    you along the way.
                  </ListItemText>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <Chat />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.listItemText }}>
                    We hold regular talks on health, personal finance, how to
                    learn quickly and effectively, career development, and
                    topics on personal growth.
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          </Grid>
          <section id="section2">
            <a href="#section3">
              <span></span>
            </a>
          </section>
        </SectionRight>

        <Section id="section3" background="PowderBlue">
          <h2 className={classes.title2}>
            <strong>
              Ready to step up your game? <br />
              <StyledLink decoration="underline" to={ROUTES.SIGN_UP}>
                Sign up
              </StyledLink>
            </strong>{' '}
            to access the tools and resources we offer.
          </h2>
        </Section>
      </div>
    );
  }
}

export default withStyles(styles)(Landing);

import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { 
    Button, 
    FormControl, 
    FormLabel, 
    RadioGroup,
    FormControlLabel,
    Radio,
    withStyles,
} from '@material-ui/core';

import { withFirebase } from '../Firebase';
import Input from '../Input';
import * as ROUTES from '../../constants/routes';

const styles = theme => ({
    container: {
        marginLeft: '15%',
        marginRight: '15%',
        marginButtom: '15%',
        fontFamily: 'Dosis',
    },
    button: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%',
        marginBottom: '10%',
        width: '20%',
        fontFamily: 'Dosis',
    },
    select: {
        marginLeft: '2%',
        marginTop: '5%',
        display: 'block',
    },
});

class ApplicationPageBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            ans1: '',
            ans1Error: '',
            ans2: '',
            ans3: '',
            ans4: '',
            profession: '',
            major: '',
            error: null,
        }
    }

    onSubmit = event => {
        const { firstName, lastName, email, ans1, ans2, ans3, ans4, profession, major } = this.state;
        const notValid = this.validateForm();
        if (!notValid) {
            this.props.firebase
            .applications()
            .push({
                firstName,
                lastName,
                email,
                profession,
                major,
                ans1,
                ans2,
                ans3,
                ans4,
            })
            .then(() => {
                const route = this.props.history;
                route.push(ROUTES.CONFIRMATION);
            })
            .catch((error) => {
                this.setState({ error });
            });
        }

        event.preventDefault();
    }

    onChange = event => {
        const errorName = `${event.target.name}Error`;
        this.setState({
            [event.target.name]: event.target.value,
            [errorName]: '',
        });
    };

    onSelect = event => {
        this.setState({
            profession: event.target.value,
        })
    };

    validateForm = () => {
        const { ans1 } = this.state;
        let notValid = false;
        if (ans1.length < 10) {
            notValid = true;
            this.setState({
                ans1Error: "Your answer is too short."
            })
        }
        return notValid;
    };

    render() {
        const { 
            firstName, 
            lastName, 
            email, 
            emailError, 
            ans1, 
            ans1Error, 
            ans2, 
            ans3,
            ans4,
            error,
            profession,
            major,
        } = this.state;
        const { classes } = this.props;
        let professionQuestion = "What do you study?";

        const isInvalid = 
            firstName === '' ||
            lastName === '' ||
            email === '' ||
            ans1 === '' ||
            ans2 === '' ||
            ans3 === '' ||
            ans4 === '';

        return (
            <form className={classes.container} onSubmit={this.onSubmit}>
                <Input
                    name="firstName"
                    value={firstName}
                    title="First Name"
                    onChange={this.onChange}
                />

                <Input
                    name="lastName"
                    value={lastName}
                    title="Last Name"
                    onChange={this.onChange}
                />

                <br />

                <Input
                    name="email"
                    value={email}
                    title="Email"
                    type="email"
                    onChange={this.onChange}
                    error={emailError ? true : false}
                    helperText={emailError}
                />

                <FormControl component="fieldset" className={classes.select}>
                    <FormLabel component="legend">Profession</FormLabel>
                    <RadioGroup aria-label="profession" value={profession} onChange={this.onSelect}>
                        <FormControlLabel value="student" control={<Radio />} label="I'm a student" />
                        <FormControlLabel value="worker" control={<Radio />} label="I'm in the work force" />
                        {
                            profession === "student" ? null : professionQuestion = "What's your specialty?"
                        }
                    </RadioGroup>
                    <Input
                        name="major"
                        value={major}
                        title={professionQuestion}
                        onChange={this.onChange}
                    />
                </FormControl>

                <Input
                    name="ans1"
                    value={ans1}
                    title="What an ideal day/week should look like for you?"
                    onChange={this.onChange}
                    error={ans1Error ? true : false}
                    helperText={ans1Error}
                    fullWidth
                    multiline
                />

                <Input
                    name="ans2"
                    value={ans2}
                    title="What drives you in your personal and professional life?"
                    fullWidth
                    onChange={this.onChange}
                    multiline
                />

                <Input
                    name="ans3"
                    value={ans3}
                    title="What's one thing you believe that the majority of the people don't believe?"
                    fullWidth
                    onChange={this.onChange}
                    multiline
                />

                <Input
                    name="ans4"
                    value={ans4}
                    title="Name the last 3 books you've read."
                    fullWidth
                    onChange={this.onChange}
                    multiline
                />

                <Button 
                    disabled={isInvalid} 
                    variant="outlined"
                    color="primary"
                    type="submit"
                    className={classes.button}
                >
                    Submit
                </Button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
} 

const ApplicationPage = compose(
    withRouter,
    withFirebase,
    withStyles(styles),
)(ApplicationPageBase);

export default ApplicationPage;
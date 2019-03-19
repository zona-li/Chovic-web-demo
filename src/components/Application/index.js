import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Divider from '@material-ui/core/Divider';

import { withFirebase } from '../Firebase';
import Input from '../Input';
import * as ROUTES from '../../constants/routes';

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
            ans2Error: '',
            ans3: '',
            ans4: '',
            profession: 'student',
            major: '',
            error: null,
        }
    }

    onSubmit = event => {
        const { firstName, lastName, email, ans1, ans2, ans3 } = this.state;
        const notValid = this.validateForm();
        if (!notValid) {
            this.props.firebase
            .applications()
            .push({
                firstName,
                lastName,
                email,
                ans1,
                ans2,
                ans3
            })
            .then(() => {
                this.props.history.push(ROUTES.LANDING);
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
            <form onSubmit={this.onSubmit}>
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
                <Divider variant="middle" />

                <FormControl component="fieldset">
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
                <Divider variant="middle" />

                <Input
                    name="ans1"
                    value={ans1}
                    title="Describe an ideal day/week of your life."
                    onChange={this.onChange}
                    error={ans1Error ? true : false}
                    helperText={ans1Error}
                    fullWidth
                    multiline
                />

                <Input
                    name="ans2"
                    value={ans2}
                    title="What keeps you going?"
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
                    title="What's the name of the last 3 books you've read that you loved?"
                    fullWidth
                    onChange={this.onChange}
                    multiline
                />

                <Button 
                    disabled={isInvalid} 
                    variant="outlined"
                    color="primary"
                    type="submit"
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
)(ApplicationPageBase);

export default ApplicationPage;
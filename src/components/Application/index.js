import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

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
            ans2: '',
            ans3: '',
            error: null,
        }
    }

    onSubmit = event => {
        const { firstName, lastName, email, ans1, ans2, ans3 } = this.state;
        
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

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    checkFormValid = (inValid) => {
        if (inValid) {
            this.setState({
                error: 'Please make sure you answered all questions before you submit.'
            })
        }
    };

    render() {
        const { firstName, lastName, email, ans1, ans2, ans3, error } = this.state;
        const isInvalid = 
            firstName === '' ||
            lastName === '' ||
            email === '' ||
            ans1 === '' ||
            ans2 === '' ||
            ans3 === '';

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

                <Input
                    name="email"
                    value={email}
                    title="Email"
                    type="email"
                    onChange={this.onChange}
                />

                <Input
                    name="ans1"
                    value={ans1}
                    title="3 biggest goals?"
                    onChange={this.onChange}
                />

                <Input
                    name="ans2"
                    value={ans2}
                    title="What changes do you wish to see in yourself?"
                    onChange={this.onChange}
                />

                <Input
                    name="ans3"
                    value={ans3}
                    title="Biggest accomplishment so far?"
                    onChange={this.onChange}
                />

                <button 
                    // disabled={isInvalid} 
                    onClick={(isInvalid) => this.checkFormValid(isInvalid)} 
                    type="submit"
                >
                    Submit
                </button>

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
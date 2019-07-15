import React, { Component } from 'react';
import { compose } from 'recompose';
import { Switch, Route, Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => (
    <div>
        <h1>Admin</h1>
        <p>The Admin Page is accessible by every signed in admin user.</p>

        <Switch>
            <Route path={ROUTES.ADMIN_DETAILS} component={UserItem} />
            <Route path={ROUTES.ADMIN} component={UserList} />
        </Switch>
    </div>
);

class UserListBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: {},
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.users().then(snapshot => {
            const usersList = {};
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                usersList[doc.id] = doc.data();
            });

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    render() {
        const { users, loading } = this.state;

        return (
            <div>
                <h2>Users</h2>
                {loading && <div>Loading...</div>}

                <ul>
                    {Object.values(users).forEach(user => (
                        <li key={user.uid}>
                            <span>
                                <strong>ID:</strong> {user.uid}
                            </span>
                            <span>
                                <strong>Email:</strong> {user.email}
                            </span>
                            <span>
                                <strong>Username:</strong> {user.username}
                            </span>
                            <span>
                                <Link 
                                    to={{
                                        pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                        state: { user },
                                    }}
                                >
                                    Details
                                </Link>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

class UserItemBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            user: null,
            ...props.location.state,
        };
    }

    componentDidMount() {
        if (this.state.user) {
            // return;
        }

        console.log("something");

        this.setState({ loading: true });

        this.props.firebase
            .user(this.props.match.params.id)
            .on('value', snapshot => {
                this.setState({
                    user: snapshot.val(),
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.match.params.id).off();
    }

    onSendPasswordResetEmail = () => {
        this.props.firebase.doPasswordReset(this.state.user.email);
    };

    render() {
        const { user, loading } = this.state;

        return (
            <div>
                <h2>User ({this.props.match.params.id})</h2>
                {loading && <div>Loading...</div>}

                {user && (
                    <div>
                        <span>
                            <strong>ID:</strong> {user.uid}
                        </span>
                        <span>
                            <strong>Email:</strong> {user.email}
                        </span>
                        <span>
                            <strong>Username:</strong> {user.username}
                        </span>
                        <span>
                            <button
                                type="button"
                                onClick={this.onSendPasswordResetEmail}
                            >
                                Send Password Reset
                            </button>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}

const condition = authUser =>
    authUser && authUser.roles.includes(ROLES.ADMIN);

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AdminPage);
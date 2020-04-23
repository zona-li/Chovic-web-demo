import React from 'react';

import { withFirebase } from '../Firebase';
import AuthUserContext from './context';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(sessionStorage.getItem('authUser')),
        isMember: false,
      };
    }

    componentDidMount() {
      this.unsubscribe = this.props.firebase.onAuthUserListener(
        (authUser) => {
          sessionStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
          this.props.firebase.checkPayment(authUser.uid).then((docs) => {
            docs.forEach((doc) => {
              if (doc.data().status === 'succeeded') {
                this.setState({ isMember: true });
              }
            });
          });
        },
        () => {
          sessionStorage.removeItem('authUser');
          this.setState({ authUser: null, isMember: false });
        }
      );
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;

import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { compose } from 'recompose';

import CardForm from './cardForm';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';

class Home extends Component {
    render() {
        return (
          <AuthUserContext.Consumer>
            {authUser => (
              <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                <div style={{ position: 'absolute', left: '10%', top: '5%', width: '60%'}}>
                  <h1>Home</h1>
                  <Elements>
                    <CardForm authUser={authUser}/>
                  </Elements>
                </div>
              </StripeProvider>            
            )}
          </AuthUserContext.Consumer>
        );
    }
}

export default compose(
  withEmailVerification,
  withEmailVerification,
  withAuthorization(authUser => !!authUser),
)(Home);
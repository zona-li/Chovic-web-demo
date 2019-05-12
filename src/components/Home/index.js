import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CardForm from './cardForm';

class Home extends Component {
    render() {
        return (
            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
              <div>
                <h1>React Stripe Elements Example</h1>
                <Elements>
                  <CardForm />
                </Elements>
              </div>
            </StripeProvider>
        );
    }
}

export default Home;
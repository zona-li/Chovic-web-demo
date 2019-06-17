import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CardForm from './cardForm';

class Home extends Component {
    render() {
        return (
            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
              <div style={{ position: 'absolute', left: '10%', top: '5%', width: '60%'}}>
                <h1>Home</h1>
                <Elements>
                  <CardForm />
                </Elements>
              </div>
            </StripeProvider>
        );
    }
}

export default Home;
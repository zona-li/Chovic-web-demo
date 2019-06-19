import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

class CardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      errorMessage: '',
      signedInUser: props.authUser,
    };
    this.submit = this.submit.bind(this);
  }

  async submit(event) {
    const {token, error} = await this.props.stripe.createToken(signedInUser.email);
    console.log(token, error);
    if (error) {
      this.setState({errorMessage: error.message});
    } 
    else {
      this.props.firebase.setToken(signedInUser.uid, token.id)
        .then(docRef => {
          console.log(`Token added: ${token.id} ${docRef.id}`);
          this.setState({complete: true});
        })
        .catch(error => console.error(`${error}`));
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Payment Method</p>
        <CardElement />
        <br />
        {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : ''}
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default compose(
  injectStripe,
  withFirebase,
)(CardForm);
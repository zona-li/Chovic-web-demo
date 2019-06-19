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
    };
    this.submit = this.submit.bind(this);
  }

  async submit(event) {
    const {token, error} = await this.props.stripe.createToken();
    console.log(token, error);
    if (error) {
      this.setState({errorMessage: error.message});
    } 
    else {

    }

    if (token.id) this.setState({complete: true});
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
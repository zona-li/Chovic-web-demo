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
      signedInUser: this.props.authUser,
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
      const uid = this.state.signedInUser.uid;
      this.props.firebase.setToken(uid, token.id)
        .then(docRef => {
          console.log(`Token added: ${token.id} ${docRef.id}`);
          this.setState({complete: true});
        })
        .then(res => this.props.firebase.setCharge(uid))
        .catch(error => console.error(`${error}`));
    }
  }

  render() {
    if (this.state.complete) return <p>Card saved</p>;
    return (
      <div className="checkout">
        <CardElement />
        <br />
        {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}
        <button onClick={this.submit}>save</button>
      </div>
    );
  }
}

export default compose(
  injectStripe,
  withFirebase,
)(CardForm);
import React, { Component } from 'react';
import { CardExpiryElement, CardCVCElement, CardNumberElement, injectStripe } from 'react-stripe-elements';
import { compose } from 'recompose';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase';
import './styles.css';

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
    if (this.state.complete) return <Redirect to={ROUTES.AFTERPAYMENT} />;
    return (
      <>
        <form className="cardForm">
          <Typography variant="subtitle2">Email</Typography>
          <input type="email" className='inputFeild' />

          <Typography variant="subtitle2">Card Information</Typography>
          <CardNumberElement className='inputFeild cardNumber'/>
          <CardExpiryElement className='inputFeild cardExpiration'/>
          <CardCVCElement className='inputFeild cardCvc'/>
          <br />
          {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}
          <button onClick={this.submit}>pay</button>
        </form>
      </>
    );
  }
}

export default compose(
  injectStripe,
  withFirebase,
)(CardForm);
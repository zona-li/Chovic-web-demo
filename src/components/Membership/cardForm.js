import React, { Component } from 'react';
import { CardExpiryElement, CardCVCElement, CardNumberElement, injectStripe } from 'react-stripe-elements';
import { compose } from 'recompose';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
      email: '',
      firstname: '',
      lastname: ''
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addCard = async () => {
    const { token, error } = await this.props.stripe.createToken();
    if (error) {
      this.setState({errorMessage: error.message});
    }
    else {
      const uid = this.state.signedInUser.uid;
      // This will create a token entry in the DB and trigger a cloud function to add customer's card information to Stripe.
      try {
        await this.props.firebase.setToken(uid, token.id);
        const sourceDoc = await this.props.firebase.stripe_customer(uid);
        if (sourceDoc.docs[0]) {
          this.submit(uid);
        }  
      } catch (err) {
        console.log(err);
      }
    }
  }

  submit = (uid) => {
    this.props.firebase.setCharge(uid)
      .then(() => {
        this.setState({complete: true});
      })
      .catch(error => console.error(`${error}`));
  }

  render() {
    const { complete } = this.state;
    if (complete) return <Redirect to={ROUTES.AFTERPAYMENT} />;
    return (
      <form className="cardForm">
        <Typography variant="h6" style={{marginBottom: '40px'}}>Payment method</Typography>
        <Typography variant="subtitle2">Email</Typography>
        <input type="email" name="email" className='inputFeild' onChange={this.onChange}/>

        <Typography variant="subtitle2">Card information</Typography>
        <CardNumberElement className='inputFeild cardNumber'/>
        <CardExpiryElement className='inputFeild cardExpiration'/>
        <CardCVCElement className='inputFeild cardCvc'/>

        <Typography variant="subtitle2" mr={2} className='name'>First Name</Typography>
        <Typography variant="subtitle2">Last Name</Typography>
        <input type="text" name="firstname" className='inputFeild firstname' onChange={this.onChange}/>
        <input type="text" name="lastname" className='inputFeild lastname' onChange={this.onChange}/>
        <br />
        {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}
        <Button variant='contained' className='paymentButton' onClick={this.addCard}>Confirm</Button>
        <Typography variant='caption'>By clicking this button, you agree to Chovic's <a href="https://app.termly.io/document/terms-of-use-for-ecommerce/a0e6f34e-98b4-47a8-acd8-313ebbdf1e8c" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>.</Typography>
      </form>
    );
  }
}

export default compose(
  injectStripe,
  withFirebase,
)(CardForm);
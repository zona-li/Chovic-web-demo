import React from 'react';
import { Elements, StripeProvider } from "react-stripe-elements";
import { compose } from "recompose";

import CardForm from "./cardForm";
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification
} from "../Session";


const PaymentPage = () => {
    const stripeKey = process.env.NODE_ENV === 'development' ? 'pk_test_Qu2iqCKHXB7r5v2nopdcctsg' : 'pk_live_X7cICKwgTSFDg3bHinuGHCCd';
    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <StripeProvider apiKey={stripeKey}>
                    <div>
                    <Elements>
                        <CardForm authUser={authUser} />
                    </Elements>
                    </div>
                </StripeProvider>
            )}
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;
export default compose(withEmailVerification, withAuthorization(condition))(PaymentPage);
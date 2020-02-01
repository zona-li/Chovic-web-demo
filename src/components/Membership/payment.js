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
    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <StripeProvider apiKey="pk_live_X7cICKwgTSFDg3bHinuGHCCd">
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
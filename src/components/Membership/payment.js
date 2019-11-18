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
                <StripeProvider apiKey="pk_test_Qu2iqCKHXB7r5v2nopdcctsg">
                    <div style={{ position: "absolute", left: "10%", top: "5%", width: "60%" }}>
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
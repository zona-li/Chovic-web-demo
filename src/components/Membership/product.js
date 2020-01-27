import React from 'react';

import Typography from '@material-ui/core/Typography';
import './styles.css';
import payment from '../../assets/payment.png';

const ProductPage = () => {
    return (
        <div className='product'>
            <Typography variant="h6" className='productTitle'>Chovic Lifetime Membership</Typography>
            <Typography variant="h4">$3</Typography>
            <Typography variant="subtitle2">Limited time offer</Typography>
            <img src={payment} className='paymentImage' alt="img1"/>
        </div>
    );
}

export default ProductPage;
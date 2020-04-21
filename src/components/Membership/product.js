import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import './styles.css';
import payment from '../../assets/payment.png';

const ProductPage = () => {
  return (
    <div className="product">
      <Typography variant="h5" className="productTitle">
        Chovic Membership (Lifetime)
      </Typography>
      <Typography variant="h4">$5</Typography>
      <Typography variant="subtitle2">
        Beta • All proceeds will be donated to{' '}
        <Link href="https://www.feedingamerica.org/" target="_blank">
          Feeding America.
        </Link>
      </Typography>
      <img src={payment} className="paymentImage" alt="img1" />
    </div>
  );
};

export default ProductPage;

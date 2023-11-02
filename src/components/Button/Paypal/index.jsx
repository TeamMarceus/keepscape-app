import React, { useEffect, useRef } from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import { toastError, toastSuccess } from '@/utils/toasts';

function PayPalButton({ className, total }) {
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'PHP',
              value: total,
            },
          }],
        }),
      onApprove: (data, actions) => actions.order.capture().then((details) => {
        toastSuccess(`Transaction completed by ${details.payer.name.given_name}`);
        // TODO: Send transaction data to your server for further processing.
        }),
      onError: (err) => {
        console.error(err);
        toastError('An error occurred during the transaction.');
      },
      style: {
        layout: 'horizontal',
        height: 40,
        color: 'blue',
        shape: 'rect',
        label: 'pay',
      },
    }).render(paypalRef.current);
  }, [total]);

  return (
    <div ref={paypalRef} className={cn(className)} />
  );
}

PayPalButton.propTypes = {
  className: PropTypes.string,
  total: PropTypes.number.isRequired,
};

export default PayPalButton;

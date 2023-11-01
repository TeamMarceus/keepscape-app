import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { toast } from 'sonner';

function PayPalButton({ total }) {
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
          toast.success(`Transaction completed by ${details.payer.name.given_name}`, {
            style: {
              backgroundColor: '#1ab394',
              color: '#fff',
            },
          });
          // TODO: Send transaction data to your server for further processing.
        }),
      onError: (err) => {
        console.error(err);
        toast.error('An error occurred during the transaction.', {
          style: {
            backgroundColor: '#ed5565',
            color: '#fff',
          },
        });
      }
    }).render(paypalRef.current);
  }, [total]);

  return (
    <div ref={paypalRef} />
  );
}

PayPalButton.propTypes = {
  total: PropTypes.number.isRequired,
};

export default PayPalButton;

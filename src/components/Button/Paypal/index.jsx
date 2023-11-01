import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

function PayPalButton({ total }) {
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: total,
            },
          }],
        }),
      onApprove: (data, actions) => actions.order.capture().then((details) => {
          alert(`Transaction completed by ${  details.payer.name.given_name}`);
          // TODO: Send transaction data to your server for further processing.
        }),
      onError: (err) => {
        console.error(err);
        alert('An error occurred during the transaction.');
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
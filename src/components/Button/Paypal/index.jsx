import React, { useEffect, useRef } from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import { usePayOrder } from '@/hooks';
import { toastError, toastSuccess } from '@/utils/toasts';

function PayPalButton({ 
  className, 
  total, 
  orderId, 
  setOrders 
}) {
  const paypalRef = useRef();
  const {isPaying, payOrder, generateGift } = usePayOrder();

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
      onApprove: (data, actions) => actions.order.capture().then(async (details) => {
        const { responseCode: payOrderResponseCode } = await payOrder(orderId, details.id);

            const payOrderCallbacks = {
              created: async () => {
                toastSuccess('Transaction completed');
                // Remove the order from the list
                setOrders((orders) => orders.filter((order) => order.id !== orderId));

                await generateGift(orderId);
              },
              invalidFields: () => {
                toastError('Oops, something went wrong.');
              },
              internalError: () => {
                toastError('Oops, something went wrong.');
              },
            };

            switch (payOrderResponseCode) {
              case 200:
                payOrderCallbacks.created();
                break;
              case 400:
                payOrderCallbacks.invalidFields();
                break;
              case 401:
                payOrderCallbacks.internalError();
                break;
              case 500:
                payOrderCallbacks.internalError();
                break;
              default:
                break;
            }
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
  orderId: PropTypes.string.isRequired,
  setOrders: PropTypes.func.isRequired,
};

export default PayPalButton;

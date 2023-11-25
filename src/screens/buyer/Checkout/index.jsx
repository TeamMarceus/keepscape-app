import React from 'react';

import Image from 'next/image';

import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

import ShoppingCart from '%/images/Misc/shopping-cart.png';
import { colorClasses, textTypes } from '@/app-globals';
import { Button, ButtonLink, Card, Icon, NoResults, Text } from '@/components';

import { getCheckoutCart, getUser } from '@/ducks';

import { useCheckout } from '@/hooks';

import CheckoutCardList from './CheckoutCardList';

import styles from './styles.module.scss';

function Checkout() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const userCart = useSelector((store) => getCheckoutCart(store));
  const user = useSelector((store) => getUser(store));

  const {
    isLoading: isPlacingOrder,
    checkoutOrder,
    checkoutProduct,
  } = useCheckout();

  const totalPrice = userCart.reduce(
    (acc, curr) =>
      acc +
      curr.cartItems.reduce(
        (accs, currs) => accs + currs.price * currs.quantity,
        0
      ),
    0
  );

  return (
    <div className={styles.Checkout}>
      <div className={styles.Checkout_banner}>
        <div className={styles.Checkout_banner_text}>
          <Text
            colorClass={colorClasses.BLUE['400']}
            type={textTypes.HEADING.MD}
          >
            Artisan Checkout
          </Text>

          <Image
            alt="Shopping Checkout"
            height={60}
            src={ShoppingCart}
            width={60}
          />
        </div>
      </div>

      <Card className={styles.Checkout_delivery}>
        <div className={styles.Checkout_delivery_title}>
          <Icon
            className={styles.Checkout_delivery_title_icon}
            icon="location_on"
          />

          <Text
            colorClass={colorClasses.BLUE['400']}
            type={textTypes.HEADING.XS}
          >
            Delivery Address
          </Text>
        </div>

        <div className={styles.Checkout_delivery_details}>
          <Text type={textTypes.HEADING.XXS}>{user?.deliveryFullName}</Text>
          <Text type={textTypes.BODY.LG}>
            {user?.phoneNumber}
            {user?.phoneNumber && user?.altMobileNumber && ' | '}
            {user?.altMobileNumber}
          </Text>

          <Text type={textTypes.BODY.LG}>{user?.deliveryAddress}</Text>

          <ButtonLink
            className={styles.Checkout_delivery_details_button}
            to="/buyer/delivery"
          >
            Change Address
          </ButtonLink>
        </div>
      </Card>

      <Card className={styles.Checkout_details}>
        <Text
          className={styles.Checkout_details_products}
          type={textTypes.HEADING.XXXS}
        >
          Products Ordered
        </Text>
        <Text
          className={styles.Checkout_details_customization}
          colorClass={colorClasses.NEUTRAL['400']}
        >
          Customization
        </Text>

        <Text
          className={styles.Checkout_details_price}
          colorClass={colorClasses.NEUTRAL['400']}
        >
          Unit Price
        </Text>

        <Text
          className={styles.Checkout_details_quantity}
          colorClass={colorClasses.NEUTRAL['400']}
        >
          Quantity
        </Text>

        <Text
          className={styles.Checkout_details_total}
          colorClass={colorClasses.NEUTRAL['400']}
        >
          Total Price
        </Text>
      </Card>

      {userCart.length > 0 ? (
        <CheckoutCardList
          className={styles.Checkout_products}
          userCart={userCart}
        />
      ) : (
        <NoResults
          className={styles.Checkout_noResults}
          message="No products ordered yet."
        />
      )}

      <div className={styles.Checkout_footer}>
        <div className={styles.Checkout_footer_container}>
          <div className={styles.Checkout_footer_content}>
            <Text
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XXS}
            >
              Total Payment:
            </Text>

            <Text
              colorClass={colorClasses.BLUE['300']}
              type={textTypes.HEADING.XS}
            >
              ₱{totalPrice.toLocaleString()}
            </Text>

            <Button
              className={styles.Checkout_footer_button}
              disabled={totalPrice === 0 || isPlacingOrder}
              onClick={async () => {
                if (productId) {
                  const { quantity, customizationMessage } =
                    userCart[0].cartItems[0];

                  await checkoutProduct(productId, {
                    quantity,
                    customizationMessage,
                  });
                } else {
                  const cartItemIds = userCart.map((cart) =>
                    cart.cartItems.map((item) => item.id)
                  );

                  await checkoutOrder(cartItemIds.flat());
                }
              }}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

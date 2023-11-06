import React from 'react';

import cn from 'classnames';

import PropTypes from 'prop-types';

import { 
  colorClasses, 
  textTypes 
} from '@/app-globals';

import { 
  Card, 
  ControlledTextArea, 
  Icon, 
  Text
} from '@/components';

import { textAreaTypes } from '../../../../components/TextArea/constants';

import styles from './styles.module.scss';

function CheckoutCardList({
  className,
  userCart,
}) {

  return (
    <>
    { 
      userCart.map((cart) => (
        cart.cartItems.length > 0 &&
        <Card key={cart.id} className={cn(styles.Card, className)}>
          <div className={styles.CheckoutCardList}>
            {  cart.cartItems.length > 0 &&
              <div className={styles.CheckoutCardList_seller}>
                <Icon 
                  className={styles.CheckoutCardList_seller_icon}
                  icon="storefront" 
                />

                <Text
                  className={styles.CheckoutCardList_seller_text}
                  type={textTypes.HEADING.XXXS}
                >
                  {cart.sellerName}
                </Text>
              </div>
            }

            { cart.cartItems.length > 0 &&
              cart.cartItems.map((product) => (
                <div key={product.id} className={styles.CheckoutCardList_item}>
                  <div className={styles.CheckoutCardList_product}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={product.name}
                      className={styles.CheckoutCardList_product_details_image}
                      height={60}
                      src={product.productImageUrl}
                      width={60}
                    />
                    <div>
                      <Text 
                        className={styles.CheckoutCardList_product_details_text}
                        type={textTypes.HEADING.XXS}
                      >
                        {product.name}
                      </Text>
                    </div>
                  </div>
                
              {(product.isCustomizable && product.customizationMessage) ?
                  <ControlledTextArea
                    disabled
                    inputClassName={styles.CheckoutCardList_customization}
                    name="customize"
                    placeholder="Enter customization details here..."
                    type={textAreaTypes.SLIM}
                    value={product.customizationMessage}
                  /> 
                  : 
                  <Text 
                    className={styles.CheckoutCardList_customizationText}
                    colorClass={colorClasses.NEUTRAL['400']}
                    type={textTypes.HEADING.XXS}
                  >
                    No customization
                  </Text>
                }

                  <div className={styles.CheckoutCardList_price}>
                    <Text
                      className={styles.CheckoutCardList_price_text}
                      colorClass={colorClasses.NEUTRAL['400']}
                      type={textTypes.HEADING.XXS}
                    >
                    ₱{product.price.toLocaleString()}
                    </Text>
                  </div>

                  <div className={styles.CheckoutCardList_quantity}>
                    <Text
                      className={styles.CheckoutCardList_price_text}
                      colorClass={colorClasses.NEUTRAL['400']}
                      type={textTypes.HEADING.XXS}
                    >
                      {product.quantity}
                    </Text>
                  </div>

                  <div className={styles.CheckoutCardList_totalPrice}>
                    <Text
                      className={styles.CheckoutCardList_totalPrice_text}
                      colorClass={colorClasses.NEUTRAL['400']}
                      type={textTypes.HEADING.XXS}
                    >
                      ₱{(product.price * product.quantity).toLocaleString()}
                    </Text>
                  </div>
                </div>
              ))
            }

          </div>

          <div className={styles.CheckoutCardList_orderTotal}>
              <Text 
                colorClass={colorClasses.NEUTRAL['400']}
                type={textTypes.HEADING.XXXS}
              >
                Order Total {cart.cartItems.length > 1 ? `(${cart.cartItems.length} items)` : '(1 item)'}
              </Text>

              <Text 
                colorClass={colorClasses.BLUE['300']}
                type={textTypes.HEADING.XXS}
              >
                ₱{(cart.cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)).toLocaleString()}
              </Text>
          </div>
        </Card>
      ))
    }
    </>
  );
}

CheckoutCardList.propTypes = {
  className: PropTypes.string,
  userCart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    sellerName: PropTypes.string,
    cartItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      productId: PropTypes.string,
      isCustomizable: PropTypes.bool,
      customizationMessage: PropTypes.string,
      productImageUrl: PropTypes.string,
      name: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
    })),
  })),
};

export default CheckoutCardList;
import React, { useEffect } from 'react';

import cn from 'classnames';

import PropTypes from 'prop-types';

import { 
  buttonTypes, 
  colorClasses, 
  iconButtonTypes, 
  textTypes 
} from '@/app-globals';

import { 
  Button, 
  Card, 
  Checkbox, 
  ControlledTextArea, 
  Icon, 
  IconButton, 
  Text
} from '@/components';

import { textAreaTypes } from '../TextArea/constants';

import styles from './styles.module.scss';

function CheckoutCardList({
  className,
  userCart,
}) {

  return (
    <>
    { 
      userCart.map((cart) => (
        cart.products.length > 0 &&
        <Card key={cart.id} className={cn(styles.Card, className)}>
          <div className={styles.CheckoutCardList}>
            {  cart.products.length > 0 &&
              <div className={styles.CheckoutCardList_seller}>
                <Icon 
                  className={styles.CheckoutCardList_seller_icon}
                  icon="storefront" 
                />

                <Text
                  className={styles.CheckoutCardList_seller_text}
                  type={textTypes.HEADING.XXXS}
                >
                  {cart.seller}
                </Text>
              </div>
            }

            { cart.products.length > 0 &&
              cart.products.map((product) => (
                <div key={product.id} className={styles.CheckoutCardList_item}>
                  <div className={styles.CheckoutCardList_product}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={product.image}
                      className={styles.CheckoutCardList_product_details_image}
                      height={60}
                      src={product.image}
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
                
              {product.customization ?
                  <ControlledTextArea
                    disabled
                    inputClassName={styles.CheckoutCardList_customization}
                    name="customize"
                    placeholder="Enter customization details here..."
                    type={textAreaTypes.SLIM}
                    value={product.customization}
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
                    ₱{product.price}
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
                      ₱{product.price * product.quantity}
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
                Order Total {cart.products.length > 1 ? `(${cart.products.length} items)` : '(1 item)'}
              </Text>

              <Text 
                colorClass={colorClasses.BLUE['300']}
                type={textTypes.HEADING.XXS}
              >
                ₱{cart.products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)}
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
    seller: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      customization: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
    })),
  })),
};

export default CheckoutCardList;
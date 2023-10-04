import React from 'react';

import cn from 'classnames';

import PropTypes from 'prop-types';

import { 
  buttonTypes, 
  colorClasses, 
  textTypes 
} from '@/app-globals';

import { 
  Button, 
  ButtonLink, 
  Card, 
  Icon, 
  Text
} from '@/components';


import styles from './styles.module.scss';

function PurchaseCard({
  className,
  id,
  dateOrdered,
  seller,
  status,
  customization,
  image,
  name,
  quantity,
  total,
  price,
  qrCode,
}) {

  return (
    <Card className={cn(styles.Card, className)}>
      <div className={styles.PurchaseCard}>
        <div className={styles.PurchaseCard_seller}>
          <div className={styles.PurchaseCard_seller_left}>
            <Icon 
              className={styles.PurchaseCard_seller_icon}
              icon="storefront" 
            />

            <Text
              className={styles.PurchaseCard_seller_text}
              type={textTypes.HEADING.XXXS}
            >
              {seller}
            </Text>

            <div className={styles.PurchaseCard_seller_date}>
              Date Ordered: 

              <Text
                colorClass={colorClasses.NEUTRAL['400']}
                type={textTypes.HEADING.XXXS}
              >
                {dateOrdered}
              </Text>
            </div>
          </div>

          <div className={styles.PurchaseCard_seller_right}>
            { status === 'Delivered' &&
              <>
                <Icon
                  className={cn(styles.PurchaseCard_seller_right_icon, 
                    styles.PurchaseCard_seller_right___delivered)}
                  icon="check"
                />
                <Text
                  colorClass={colorClasses.GREEN['400']}
                  type={textTypes.HEADING.XXXS}
                >
                  {status}
                </Text>
              </>
            }

            { status === 'Cancelled' &&
              <>
                <Icon
                  className={cn(styles.PurchaseCard_seller_right_icon, 
                    styles.PurchaseCard_seller_right___cancelled)}
                  icon="close"
                />
                <Text
                  colorClass={colorClasses.RED['400']}
                  type={textTypes.HEADING.XXXS}
                >
                  {status}
                </Text>
              </>
            }

            { status === 'On Going' &&
              <>
                <Icon
                  className={cn(styles.PurchaseCard_seller_right_icon, 
                    styles.PurchaseCard_seller_right___ongoing)}
                  icon="local_shipping"
                />
                <Text
                  colorClass={colorClasses.BLUE['400']}
                  type={textTypes.HEADING.XXXS}
                >
                  {status}
                </Text>
              </>
            }

            { status === 'Pending' &&
              <>
                <Icon
                  className={cn(styles.PurchaseCard_seller_right_icon, 
                    styles.PurchaseCard_seller_right___pending)}
                  icon="pending"
                />
                <Text
                  colorClass={colorClasses.NEUTRAL['400']}
                  type={textTypes.HEADING.XXXS}
                >
                  {status}
                </Text>
              </>
            }
          </div>
        </div>
        
        <div className={styles.PurchaseCard_item}>
          <div className={styles.PurchaseCard_product}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={image}
              className={styles.PurchaseCard_product_image}
              height={60}
              src={image}
              width={60}
            />

            <div>
              <Text 
                className={styles.PurchaseCard_product_text}
                type={textTypes.HEADING.XXS}
              >
                {name}
              </Text>
              x{quantity}
            </div>
          </div>
        
          {customization &&
            <Text 
              className={styles.PurchaseCard_customizationText}
              colorClass={colorClasses.NEUTRAL['400']}
            >
              {customization}
            </Text>
          }

          <div className={styles.PurchaseCard_price}>
            <Text
              className={styles.PurchaseCard_price_text}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XXS}
            >
              ₱{price}
            </Text>
          </div>

          <div className={styles.PurchaseCard_qrCode}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={qrCode}
                className={styles.PurchaseCard_qrCode_image}
                height={60}
                src={qrCode}
                width={60}
              />
          </div>
        </div>

      </div>

      <div className={styles.PurchaseCard_orderTotal}>
        <div className={styles.PurchaseCard_orderTotal_text}>
          <Text 
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.HEADING.XXXS}
          >
            Order Total:
          </Text>

          <Text 
            colorClass={colorClasses.BLUE['300']}
            type={textTypes.HEADING.XXS}
          >
            ₱{total}
          </Text>    
        </div> 

        <div className={styles.PurchaseCard_orderTotal_buttons}> 
        
          <ButtonLink
            className={styles.PurchaseCard_orderTotal_buttons_button}
            to='/buyer/cart'
            onClick={() => {}}
          >

            Buy Again
          </ButtonLink>

          { status === 'Pending' &&
            <Button
              className={styles.PurchaseCard_orderTotal_buttons_button}
              type={buttonTypes.SECONDARY.BLUE}
              onClick={() => {}}
            >
              Cancel Order
            </Button>
          }
        </div>
      </div>
    </Card>
  );
}

PurchaseCard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  dateOrdered: PropTypes.string,
  seller: PropTypes.string,
  status: PropTypes.string,
  customization: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  quantity: PropTypes.number,
  total: PropTypes.number,
  price: PropTypes.number,
  qrCode: PropTypes.string,
};

export default PurchaseCard;
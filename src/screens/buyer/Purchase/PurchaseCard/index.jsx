import React, { useState } from 'react';

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


import AddReviewModal from '../AddReviewModal';
import DeliveryLogsModal from '../DeliveryLogsModal';
import QrCodeModal from '../QrCodeModal';

import ReportProblemModal from '../ReportProblemModal';

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

  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);
  const [isDeliveryLogsModalOpen, setIsDeliveryLogsModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [isReportProblemModalOpen, setIsReportProblemModalOpen] = useState(false);

  return (
    <>
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
       
            <Button
              icon={
                (() => {
                  if (status === 'Pending') {
                    return 'pending';
                  } if (status === 'Delivered') {
                    return 'check';
                  } if (status === 'Cancelled') {
                    return 'close';
                  } 
                    return 'local_shipping';
                })()
              }
              type={
                (() => {
                  if (status === 'Pending') {
                    return buttonTypes.TEXT.NEUTRAL;
                  } if (status === 'Delivered') {
                    return buttonTypes.TEXT.GREEN;
                  } if (status === 'Cancelled') {
                    return buttonTypes.TEXT.RED;
                  } 
                    return buttonTypes.TEXT.BLUE;
                })()
              }
              onClick={() => setIsDeliveryLogsModalOpen(true)}
            >
              {status}
            </Button>
            
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
                {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                <img
                  alt={qrCode}
                  className={styles.PurchaseCard_qrCode_image}
                  height={60}
                  src={qrCode}
                  width={60}
                  onClick={() => setIsQrCodeModalOpen(true)}
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

            <Button
              className={styles.PurchaseCard_orderTotal_buttons_button}
              type={buttonTypes.SECONDARY.BLUE}
              onClick={() => {
                setIsReportProblemModalOpen(true);
              }}
            >
              Report a Problem
            </Button>

            { status === 'Pending' &&
              <Button
                className={styles.PurchaseCard_orderTotal_buttons_button}
                type={buttonTypes.SECONDARY.BLUE}
                onClick={() => {}}
              >
                Cancel Order
              </Button>
            }

            { status === 'Delivered' &&
              <Button
                className={styles.PurchaseCard_orderTotal_buttons_button}
                type={buttonTypes.SECONDARY.BLUE}
                onClick={() => {
                  setIsAddReviewModalOpen(true);
                }}
              >
                Add a Review
              </Button>
            }
          </div>
        </div>
      </Card>

      {isQrCodeModalOpen &&
        <QrCodeModal
          handleClose={() => setIsQrCodeModalOpen(false)}
          isOpen={isQrCodeModalOpen}
          qrCode={qrCode}
          title={`${name} QR Code`}
        />  
      }

      {isDeliveryLogsModalOpen &&
        <DeliveryLogsModal
          handleClose={() => setIsDeliveryLogsModalOpen(false)}
          isOpen={isDeliveryLogsModalOpen}
          title={`${name} Delivery Details`}
        />
      }

      {isAddReviewModalOpen &&
        <AddReviewModal
          handleClose={() => setIsAddReviewModalOpen(false)}
          isOpen={isAddReviewModalOpen}
          title={`Add a Review for ${name}`}
        />
      }

      {isReportProblemModalOpen &&
        <ReportProblemModal
          handleClose={() => setIsReportProblemModalOpen(false)}
          isOpen={isReportProblemModalOpen}
          seller={seller}
          title={`Report a Problem for ${name}`}
        />
      }
    </>
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
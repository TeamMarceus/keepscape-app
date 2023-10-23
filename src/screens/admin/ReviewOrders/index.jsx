import React, { useState } from 'react';

import cn from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  buttonTypes,
  colorClasses,
  iconButtonTypes,
  textTypes,
} from '@/app-globals';

import { 
  Button, 
  ButtonLink, 
  Card, 
  ControlledInput, 
  Icon, 
  IconButton, 
  NoResults, 
  Pagination, 
  Text 
} from '@/components';

import { useReportedOrders, useWindowSize } from '@/hooks';

import BuyerModal from '../Modals/BuyerModal';
import OrderReportModal from '../Modals/OrderReportModal';
import SellerModal from '../Modals/SellerModal';

import DeliveryLogsModal from './DeliveryLogsModal';

import PreloaderOrders from './Preloader';

import styles from './styles.module.scss';


function ReviewOrders() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1)

  const [isDeliveryLogsModalOpen, setIsDeliveryLogsModalOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isBuyerModalOpen, setIsBuyerModalOpen] = useState(false);
  const [isOrderReportModalOpen, setIsOrderReportModalOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState({});

  const {
    isLoading: isReportedOrdersLoading, 
    reportedOrders,
    resolveOrderReports,
    totalPages, 
  } = useReportedOrders({ page, pageSize: 10 });

  const filteredOrders = reportedOrders.filter((order) => (
        order
    ));

  return (
    <>
      <div className={styles.ReviewOrders}>
        
        <Text type={textTypes.HEADING.XS}>
          Review Orders
        </Text>

        <ControlledInput
          className={styles.ReviewOrders_search}
          icon="search"
          name="search"
          placeholder="You can search by Date Ordered, Seller, Buyer, or Status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isReportedOrdersLoading ? (
          <PreloaderOrders />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredOrders.length ? (
              <>
                <div className={styles.ReviewOrders_orders}>
                  {filteredOrders.map(
                    ({ id, seller, buyer, dateTimeCreated, report, items, totalPrice, status}) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.ReviewOrders_order}>
                          <div className={styles.ReviewOrders}>
                            <div className={styles.ReviewOrders_info}>
                              <div className={styles.ReviewOrders_info_left}>
                                <Button
                                  className={styles.ReviewOrders_info_text}
                                  icon="storefront"
                                  type={buttonTypes.TEXT.BLUE}
                                  onClick={() => {
                                    setSelectedOrder({id, seller});
                                    setIsSellerModalOpen(true);
                                  }}
                                >
                                  <Text type={textTypes.HEADING.XXXS}>
                                    {seller.sellerName}
                                  </Text>
                                </Button>

                                <Button
                                  className={styles.ReviewOrders_info_text}
                                  icon="person"
                                  type={buttonTypes.TEXT.BLUE}
                                  onClick={() => {
                                    setSelectedOrder({id, buyer});
                                    setIsBuyerModalOpen(true)
                                  }}
                                >
                                  <Text type={textTypes.HEADING.XXXS}>
                                    {buyer.firstName} {buyer.lastName}
                                  </Text>
                                </Button>

                                <div className={styles.ReviewOrders_info_date}>
                                  Date Ordered: 

                                  <Text
                                    colorClass={colorClasses.NEUTRAL['400']}
                                    type={textTypes.HEADING.XXXS}
                                  >
                                    {dateTimeCreated.split('T')[0]}
                                  </Text>
                                </div>
                              </div>

                              <div className={styles.ReviewOrders_info_buttons}>
                                <Button
                                  className={styles.ReviewOrders_info_statusButton}
                                  icon={
                                    (() => {
                                      if (status === 'Pending') {
                                        return 'pending';
                                      } if (status === 'Delivered') {
                                        return 'check';
                                      } if ('Cancelled' === 'Cancelled') {
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
                                      } if ('Cancelled' === 'Cancelled') {
                                        return buttonTypes.TEXT.RED;
                                      } 
                                        return buttonTypes.TEXT.BLUE;
                                    })()
                                  }
                                  onClick={() => {
                                    setSelectedOrder({id, buyer});
                                    setIsDeliveryLogsModalOpen(true);
                                  }}
                                >
                                  Cancelled
                                </Button>

                                <IconButton
                                  className={styles.ReviewOrders_info_reportsButton}
                                  icon="flag"
                                  type={iconButtonTypes.OUTLINE.XS}
                                  onClick={() => {
                                    setSelectedOrder({id, buyer, report});
                                    setIsOrderReportModalOpen(true);
                                  }}
                                />
                              </div>
                              
                            </div>

                            {items.map(
                              ({ productId, image, productName, price, quantity, customizedMessage }) => (
                            
                              <div key={productId} className={styles.ReviewOrders_item}>
                                <div className={styles.ReviewOrders_product}>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    alt={image}
                                    className={styles.ReviewOrders_product_image}
                                    height={60}
                                    src="https://picsum.photos/200"
                                    width={60}
                                  />

                                  <div>
                                    <Text 
                                      className={styles.ReviewOrders_product_text}
                                      type={textTypes.HEADING.XXS}
                                    >
                                      {productName}
                                    </Text>
                                    x{quantity}
                                  </div>
                                </div>
                              
                                {customizedMessage &&
                                  <Text 
                                    className={styles.ReviewOrders_customizationText}
                                    colorClass={colorClasses.NEUTRAL['400']}
                                  >
                                    {customizedMessage}
                                  </Text>
                                }

                                <div className={styles.ReviewOrders_price}>
                                  <Text
                                    className={styles.ReviewOrders_price_text}
                                    colorClass={colorClasses.NEUTRAL['400']}
                                    type={textTypes.HEADING.XXS}
                                  >
                                    ₱{price}
                                  </Text>
                                </div>
                              </div>
                              )
                            )}
                          </div>

                          <div className={styles.ReviewOrders_orderTotal}>
                            <div className={styles.ReviewOrders_orderTotal_text}>
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
                                ₱{totalPrice}
                              </Text>    
                            </div> 

                            <div className={styles.ReviewOrders_orderTotal_buttons}> 
                              <Button
                                  className={styles.ReviewOrders_orderTotal_buttons_button}
                                  onClick={() => {
                                
                                  }}
                                >
                                Resolve
                              </Button>

                              <Button
                                className={styles.ReviewOrders_orderTotal_buttons_button}
                                type={buttonTypes.SECONDARY.BLUE}
                                onClick={() => {}}
                              >

                                Refund
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        // Mobile View
                        <>
                        </>
                      )
                  )}
                </div>

                <Pagination 
                  className={styles.ReviewOrders_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);
                    router.push(`/admin/review-orders?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.ReviewOrders_noResults}
                message="No orders found"
              />
            )}
          </>
        )}

      </div>

      {isDeliveryLogsModalOpen &&
        <DeliveryLogsModal
          deliveryDetails={
            (() => ({
              fullName: selectedOrder.buyer.deliveryFullName,
              contactNumber: selectedOrder.buyer.altMobileNumber,
              fullAddress: selectedOrder.buyer.deliveryAddress,
            }))()
          }
          handleClose={() => setIsDeliveryLogsModalOpen(false)}
          isOpen={isDeliveryLogsModalOpen}
          title="Order Delivery Details"
        />
      }

      {isSellerModalOpen && (
        <SellerModal
          handleClose={() => setIsSellerModalOpen(false)}
          isOpen={isSellerModalOpen}
          sellerId={selectedOrder.seller.id}
          title="Seller Details"
        />
      )}

      {isBuyerModalOpen && (
        <BuyerModal
          buyer={selectedOrder.buyer}
          handleClose={() => setIsBuyerModalOpen(false)}
          isOpen={isBuyerModalOpen}
          title="Buyer Details"
        />
      )}

      {isOrderReportModalOpen &&
        <OrderReportModal
          buyer={selectedOrder.buyer}
          handleClose={() => setIsOrderReportModalOpen(false)}
          isOpen={isOrderReportModalOpen}
          report={selectedOrder.report}
          title="Order Report Details"
        />
      }
    </>
)
}
export default ReviewOrders;

import React, { useState } from 'react';

import cn from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  buttonTypes,
  colorClasses,
  colorNames,
  iconButtonTypes,
  spinnerSizes,
  textTypes,
} from '@/app-globals';

import { 
  Button, 
  ButtonLink, 
  Card, 
  ConfirmModal, 
  ControlledInput, 
  Icon, 
  IconButton, 
  NoResults, 
  Pagination, 
  Spinner, 
  Text 
} from '@/components';

import { useReportedOrders, useWindowSize } from '@/hooks';

import BuyerModal from '../../common/Modals/BuyerModal';
import SellerModal from '../CommonModals/SellerModal';

import DeliveryLogsModal from './DeliveryLogsModal';
import OrderReportModal from './OrderReportModal';
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
  const [isRefundConfirmationToggled, toggleRefundConfirmation] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState({});

  const {
    isLoading: isReportedOrdersLoading, 
    isResolvingLoading,
    isRefundingLoading,
    reportedOrders,
    resolveOrderReports,
    refundOrder,
    totalPages, 
  } = useReportedOrders({ page, pageSize: 10, search });

  const filteredOrders = reportedOrders.filter((order) => (
    order.seller.sellerName.toLowerCase().includes(search.toLowerCase()) ||
    order.buyer.firstName.toLowerCase().includes(search.toLowerCase()) ||
    order.buyer.lastName.toLowerCase().includes(search.toLowerCase())
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
          placeholder="You can search by Seller or Buyer"
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
                    ({ id, seller, buyer, dateTimeCreated, report, items, totalPrice, status,
                      deliveryLogs, deliveryFeeProofImageUrl, deliveryFee}) =>
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
                                  icon='pending'
                                  type={buttonTypes.TEXT.BLUE}
                                  onClick={() => {
                                    setSelectedOrder({id, buyer, deliveryLogs, deliveryFeeProofImageUrl, deliveryFee});
                                    setIsDeliveryLogsModalOpen(true);
                                  }}
                                >
                                  Awaiting Confirmation
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
                              ({ productId, productImageUrl, productName, price, quantity, customizationMessage  }) => (
                            
                              <div key={productId} className={styles.ReviewOrders_item}>
                                <div className={styles.ReviewOrders_product}>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    alt="Product"
                                    className={styles.ReviewOrders_product_image}
                                    height={60}
                                    src={productImageUrl}
                                    width={60}
                                  />

                                  <div>
                                    <Text 
                                      className={styles.ReviewOrders_product_text}
                                      type={textTypes.HEADING.XXS}
                                    >
                                      {productName}
                                    </Text>
                                  </div>
                                </div>

                                <div className={styles.ReviewOrders_quantity}>
                                  Quantity:
                                  <Text 
                                    colorClass={colorClasses.NEUTRAL['400']}
                                    type={textTypes.HEADING.XXS}
                                  >
                                    {quantity}
                                  </Text>
                                </div>

                                <div className={styles.ReviewOrders_customizationText}>
                                  Customization:
                                  {customizationMessage  ? (
                                    <Text 
                                      colorClass={colorClasses.NEUTRAL['400']}
                                      type={textTypes.HEADING.XXXS}
                                    >
                                      {customizationMessage } 
                                    </Text>
                                    ) : (
                                    <Text 
                                      colorClass={colorClasses.NEUTRAL['400']}
                                      type={textTypes.HEADING.XXS}
                                    >
                                      No Customization
                                    </Text>
                                  )}
                                </div>
                              

                                <div className={styles.ReviewOrders_price}>
                                  Price:
                                  <Text
                                    className={styles.ReviewOrders_price_text}
                                    colorClass={colorClasses.NEUTRAL['400']}
                                    type={textTypes.HEADING.XXS}
                                  >
                                    ₱{price.toFixed(2)}
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
                                ₱{totalPrice.toFixed(2)}
                              </Text>    
                            </div> 

                            <div className={styles.ReviewOrders_orderTotal_buttons}> 
                              <Button
                                  className={styles.ReviewOrders_orderTotal_buttons_button}
                                  disabled={isResolvingLoading && id === selectedOrder.id}
                                  onClick={ async () => {
                                    setSelectedOrder({id});
                                    await resolveOrderReports(id);
                                  }}
                                >
                                {(isResolvingLoading && id === selectedOrder.id) ? 'Resolving' : 'Resolve'}
                                {(isResolvingLoading && id === selectedOrder.id) && (
                                  <Spinner
                                    className={styles.ReviewOrders_orderTotal_buttons_button_spinner}
                                    colorName={colorNames.WHITE}
                                    size={spinnerSizes.XS}
                                  />
                                )}
                              </Button>

                              <Button
                                className={styles.ReviewOrders_orderTotal_buttons_button}
                                disabled={isRefundingLoading && id === selectedOrder.id}
                                type={buttonTypes.SECONDARY.BLUE}
                                onClick={() => {
                                  setSelectedOrder({id});
                                  toggleRefundConfirmation(true);
                                }}
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
          deliveryFee={selectedOrder.deliveryFee}
          deliveryFeeProofImageUrl={selectedOrder.deliveryFeeProofImageUrl}
          deliveryLogs={selectedOrder.deliveryLogs}
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

      <ConfirmModal
        actions={[
          {
            id: 'refundConfirmButton',
            text: 'Confirm',
            type: buttonTypes.PRIMARY.BLUE,
            onClick: async () => {
      
              await refundOrder(selectedOrder.id);
              toggleRefundConfirmation(false);
            },
            disabled: isRefundingLoading,
          },
          {
            id: 'refundConfirmButton',
            text: 'Back',
            type: buttonTypes.SECONDARY.BLUE,
            onClick: () => toggleRefundConfirmation(false),
          },
        ]}
        body="Are you sure you want to refund this order?"
        handleClose={() => {
          toggleRefundConfirmation(false);
        }}
        isOpen={isRefundConfirmationToggled}
        title="Refund?"
      />
    </>
)
}
export default ReviewOrders;

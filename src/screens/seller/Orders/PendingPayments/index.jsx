import React, { useState } from 'react';

import cn from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  buttonTypes,
  colorClasses,
  orderStatus,
  textTypes,
} from '@/app-globals';

import { 
  Button, 
  Card, 
  ControlledInput, 
  NoResults, 
  Pagination, 
  Text 
} from '@/components';

import { useSellerOrders, useWindowSize } from '@/hooks';

import PreloaderOrders from '@/screens/admin/ReviewOrders/Preloader';
import BuyerModal from '@/screens/common/Modals/BuyerModal';

import DeliveryFeeProofModal from '@/screens/common/Modals/DeliveryFeeProofModal';

import DeliveryLogsModal from '../../../common/Modals/DeliveryLogsModal';

import styles from './styles.module.scss';

function PendingPayements() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1)

  const [isBuyerModalOpen, setIsBuyerModalOpen] = useState(false);
  const [isDeliveryFeeProofModalOpen, setIsDeliveryFeeProofModalOpen] = useState(false);
  const [isDeliveryLogsModalOpen, setIsDeliveryLogsModalOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState({});

  const { 
    isLoading: isOrdersLoading, 
    orders,
    totalPages,
  } = useSellerOrders({
    status: orderStatus.AWAITING_BUYER,
    search,
    page,
    pageSize: 10,
  });

  const filteredOrders = orders.filter((order) => {
    const searchTerm = search.toLowerCase();
  
    return (
      order.buyer.firstName.toLowerCase().includes(searchTerm) ||
      order.buyer.lastName.toLowerCase().includes(searchTerm) || 
      order.dateTimeCreated.toLowerCase().includes(searchTerm)  ||
      order.items.some(({ productName }) => productName.toLowerCase().includes(searchTerm))
    );
  });
  return (
    <>
      <div className={styles.PendingPayements}>
        <Text type={textTypes.HEADING.XS}>
          Pending Payments
        </Text>

        <ControlledInput
          className={styles.PendingPayements_search}
          icon="search"
          name="search"
          placeholder="You can search by Buyer Name, Date Ordered, or Product Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isOrdersLoading ? (
          <PreloaderOrders />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredOrders.length ? (
              <>
                <div className={styles.PendingPayements_orders}>
                  {filteredOrders.map(
                    ({ id, buyer, dateTimeCreated, items, totalPrice, status,
                      deliveryLogs, deliveryFeeProofImageUrl, deliveryFee}) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.PendingPayements_order}>
                          <div className={styles.PendingPayements_info}>
                            <div className={styles.PendingPayements_info_left}>
                              <Button
                                className={styles.PendingPayements_info_text}
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

                              <div className={styles.PendingPayements_info_date}>
                                Date Ordered: 

                                <Text
                                  colorClass={colorClasses.NEUTRAL['400']}
                                  type={textTypes.HEADING.XXXS}
                                >
                                  {dateTimeCreated.split('T')[0]}
                                </Text>
                              </div>
                            </div>

                            <div className={styles.PendingPayements_info_buttons}>
                              <Button
                                className={styles.PendingPayements_info_statusButton}
                                icon='payments'
                                type={buttonTypes.TEXT.GREEN}
                                onClick={() => {
                                  setSelectedOrder({id, buyer, deliveryLogs, deliveryFeeProofImageUrl, deliveryFee});
                                  setIsDeliveryLogsModalOpen(true);
                                }}
                              >
                                Awaiting Payment
                              </Button>
                            </div>
                            
                          </div>

                          {items.map(
                            ({ productId, productImageUrl, productName, price, quantity, customizationMessage  }) => (
                            <div key={productId} className={styles.PendingPayements_item}>
                              <div className={styles.PendingPayements_product}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  alt="Product"
                                  className={styles.PendingPayements_product_image}
                                  height={60}
                                  src={productImageUrl}
                                  width={60}
                                />

                                <div>
                                  <Text 
                                    className={styles.PendingPayements_product_text}
                                    type={textTypes.HEADING.XXS}
                                  >
                                    {productName}
                                  </Text>
                                </div>
                              </div>

                              <div className={styles.PendingPayements_quantity}>
                                Quantity:
                                <Text 
                                  colorClass={colorClasses.NEUTRAL['400']}
                                  type={textTypes.HEADING.XXS}
                                >
                                  {quantity}
                                </Text>
                              </div>

                              <div className={styles.PendingPayements_customizationText}>
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
                            

                              <div className={styles.PendingPayements_price}>
                                Price:
                                <Text
                                  className={styles.PendingPayements_price_text}
                                  colorClass={colorClasses.NEUTRAL['400']}
                                  type={textTypes.HEADING.XXS}
                                >
                                  ₱{price.toLocaleString()}
                                </Text>
                              </div>
                            </div>
                            )
                          )}

                          <div className={styles.PendingPayements_orderTotal}>
                            <Button 
                              className={cn(styles.PendingPayements_orderTotal_text, 
                                styles.PendingPayements_orderTotal_text_deliveryFee)}
                              type={buttonTypes.TEXT.NEUTRAL}
                              onClick={() => {
                                setSelectedOrder({id, deliveryFeeProofImageUrl});
                                setIsDeliveryFeeProofModalOpen(true);
                              }}
                            >
                              <Text 
                                colorClass={colorClasses.NEUTRAL['400']}
                                type={textTypes.HEADING.XXXS}
                              >
                                Delivery Fee:
                              </Text>

                              <Text 
                                colorClass={colorClasses.BLUE['300']}
                                type={textTypes.HEADING.XXXS}
                              >
                                ₱{deliveryFee.toLocaleString()}
                              </Text>    
                            </Button> 

                            <div className={styles.PendingPayements_orderTotal_text}>
                              <Text 
                                colorClass={colorClasses.NEUTRAL['400']}
                                type={textTypes.HEADING.XXS}
                              >
                                Order Total:
                              </Text>

                              <Text 
                                colorClass={colorClasses.GREEN['300']}
                                type={textTypes.HEADING.XS}
                              >
                                ₱{totalPrice.toLocaleString()}
                              </Text>    
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
                  className={styles.PendingPayements_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);
                    router.push(`/seller/orders/on-hold?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.PendingPayements_noResults}
                message="No orders found"
              />
            )}
          </>
        )}

      </div>

      {isDeliveryFeeProofModalOpen && (
        <DeliveryFeeProofModal
          handleClose={() => setIsDeliveryFeeProofModalOpen(false)}
          isOpen={isDeliveryFeeProofModalOpen}
          proof={selectedOrder.deliveryFeeProofImageUrl}
          title="Delivery Fee Proof"
        />
      )}
      
      {isDeliveryLogsModalOpen &&
        <DeliveryLogsModal
          deliveryDetails={
            (() => ({
              fullName: selectedOrder.buyer.deliveryFullName,
              contactNumber: selectedOrder.buyer.phoneNumber,
              altMobileNumber: selectedOrder.buyer.altMobileNumber,
              fullAddress: selectedOrder.buyer.deliveryAddress,
            }))()
          }
          deliveryFee={selectedOrder.deliveryFee}
          deliveryLogs={selectedOrder.deliveryLogs}
          handleClose={() => setIsDeliveryLogsModalOpen(false)}
          isOpen={isDeliveryLogsModalOpen}
          title="Order Delivery Details"
        />
      }

      {isBuyerModalOpen && (
        <BuyerModal
          buyer={selectedOrder.buyer}
          handleClose={() => setIsBuyerModalOpen(false)}
          hasUserId={false}
          isOpen={isBuyerModalOpen}
          title="Buyer Details"
        />
      )}
    </>
)
}
export default PendingPayements;

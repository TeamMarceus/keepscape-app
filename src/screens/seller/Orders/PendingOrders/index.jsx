import React, { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  buttonTypes,
  colorClasses,
  textTypes,
} from '@/app-globals';

import { 
  Button, 
  Card, 
  ConfirmModal, 
  ControlledInput, 
  NoResults, 
  Pagination, 
  Text 
} from '@/components';

import { useSellerOrders, useWindowSize } from '@/hooks';

import PreloaderOrders from '@/screens/admin/ReviewOrders/Preloader';
import BuyerModal from '@/screens/common/Modals/BuyerModal';

import AddDeliveryFeeModal from './AddDeliveryFeeModal';
import DeliveryDetailsModal from './DeliveryDetailsModal';
import styles from './styles.module.scss';


function PendingOrders() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1)

  const [isDeliveryDetailsModalOpen, setIsDeliveryDetailsModalOpen] = useState(false);
  const [isAddDeliveryFeeModalOpen, setIsAddDeliveryFeeModalOpen] = useState(false);
  const [isBuyerModalOpen, setIsBuyerModalOpen] = useState(false);
  const [isRefundConfirmationToggled, toggleRefundConfirmation] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState({});

  const { 
    isLoading: isOrdersLoading, 
    orders,
    totalPages,
    isAdding: isAddingDeliveryFee,
    addDeliveryFee,
    isCancelling: isCancellingOrder,
    cancelOrder, 
  } = useSellerOrders({
    status: 'Pending',
    productName: search,
    buyerName: search,
    page,
    pageSize: 10,
  });

  const filteredOrders = orders.filter((order) => (
    order.buyer.firstName.toLowerCase().includes(search.toLowerCase()) ||
    order.buyer.lastName.toLowerCase().includes(search.toLowerCase())
  ));

  return (
    <>
      <div className={styles.PendingOrders}>
        <Text type={textTypes.HEADING.XS}>
          Pending Orders
        </Text>

        <ControlledInput
          className={styles.PendingOrders_search}
          icon="search"
          name="search"
          placeholder="You can search by Buyer Name or Product Name"
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
                <div className={styles.PendingOrders_orders}>
                  {filteredOrders.map(
                    ({ id, buyer, dateTimeCreated, items, totalPrice, status,
                      deliveryLogs, deliveryFeeProofImageUrl, deliveryFee}) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.PendingOrders_order}>
                          <div className={styles.PendingOrders}>
                            <div className={styles.PendingOrders_info}>
                              <div className={styles.PendingOrders_info_left}>
                                <Button
                                  className={styles.PendingOrders_info_text}
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

                                <div className={styles.PendingOrders_info_date}>
                                  Date Ordered: 

                                  <Text
                                    colorClass={colorClasses.NEUTRAL['400']}
                                    type={textTypes.HEADING.XXXS}
                                  >
                                    {dateTimeCreated.split('T')[0]}
                                  </Text>
                                </div>
                              </div>

                              <div className={styles.PendingOrders_info_buttons}>
                                <Button
                                  className={styles.PendingOrders_info_statusButton}
                                  icon='pending'
                                  type={buttonTypes.TEXT.BLUE}
                                  onClick={() => {
                                    setSelectedOrder({id, buyer});
                                    setIsDeliveryDetailsModalOpen(true)
                                  }}
                                >
                                  Pending
                                </Button>
                              </div>
                              
                            </div>

                            {items.map(
                              ({ productId, productImageUrl, productName, price, quantity, customizationMessage  }) => (
                              <div key={productId} className={styles.PendingOrders_item}>
                                <div className={styles.PendingOrders_product}>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    alt="Product"
                                    className={styles.PendingOrders_product_image}
                                    height={60}
                                    src={productImageUrl}
                                    width={60}
                                  />

                                  <div>
                                    <Text 
                                      className={styles.PendingOrders_product_text}
                                      type={textTypes.HEADING.XXS}
                                    >
                                      {productName}
                                    </Text>
                                  </div>
                                </div>

                                <div className={styles.PendingOrders_quantity}>
                                  Quantity:
                                  <Text 
                                    colorClass={colorClasses.NEUTRAL['400']}
                                    type={textTypes.HEADING.XXS}
                                  >
                                    {quantity}
                                  </Text>
                                </div>

                                <div className={styles.PendingOrders_customizationText}>
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
                              

                                <div className={styles.PendingOrders_price}>
                                  Price:
                                  <Text
                                    className={styles.PendingOrders_price_text}
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

                          <div className={styles.PendingOrders_orderTotal}>
                            <div className={styles.PendingOrders_orderTotal_text}>
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

                            <div className={styles.PendingOrders_orderTotal_buttons}> 
                              <Button
                                className={styles.PendingOrders_orderTotal_buttons_button}
                                disabled={false}
                                onClick={() => {
                                  setSelectedOrder({ id });
                                  setIsAddDeliveryFeeModalOpen(true);
                                }}
                              >
                                Add Delivery Fee
                              </Button>

                              <Button
                                className={styles.PendingOrders_orderTotal_buttons_button}
                                disabled={false}
                                type={buttonTypes.SECONDARY.BLUE}
                                onClick={() => {
                                  setSelectedOrder({id});
                                  toggleRefundConfirmation(true);
                                }}
                              >
                                Cancel Order
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
                  className={styles.PendingOrders_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);
                    router.push(`/seller/orders/pending?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.PendingOrders_noResults}
                message="No orders found"
              />
            )}
          </>
        )}

      </div>

      {isDeliveryDetailsModalOpen && (
        <DeliveryDetailsModal
          altMobileNumber={selectedOrder.buyer.altPhoneNumber}
          contactNumber={selectedOrder.buyer.phoneNumber}
          fullAddress={selectedOrder.buyer.deliveryFullAddress}
          fullName={selectedOrder.buyer.deliveryFullName}
          handleClose={() => setIsDeliveryDetailsModalOpen(false)}
          isOpen={isDeliveryDetailsModalOpen}
        />
      )}

      {isAddDeliveryFeeModalOpen && (
        <AddDeliveryFeeModal 
          addDeliveryFee={addDeliveryFee}
          handleClose={() => setIsAddDeliveryFeeModalOpen(false)}
          isAdding={isAddingDeliveryFee}
          isOpen={isAddDeliveryFeeModalOpen}
          orderId={selectedOrder.id}
          title="Add Delivery Fee"
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

      <ConfirmModal
        actions={[
          {
            id: 'cancelConfirmButton',
            text: 'Cancel',
            type: buttonTypes.PRIMARY.BLUE,
            onClick: async () => {
              await cancelOrder(selectedOrder.id);
              toggleRefundConfirmation(false);
            },
            disabled: isCancellingOrder,
          },
          {
            id: 'cancelConfirmButton',
            text: 'Back',
            type: buttonTypes.SECONDARY.BLUE,
            onClick: () => toggleRefundConfirmation(false),
          },
        ]}
        body="Are you sure you want to cancel this order?"
        handleClose={() => {
          toggleRefundConfirmation(false);
        }}
        isOpen={isRefundConfirmationToggled}
        title="Cancel?"
      />
    </>
)
}
export default PendingOrders;

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
  ConfirmModal,
  ControlledInput,
  NoResults,
  Pagination,
  Text,
} from '@/components';

import { useSellerOrders, useWindowSize } from '@/hooks';

import PreloaderOrders from '@/screens/admin/ReviewOrders/Preloader';
import BuyerModal from '@/screens/common/Modals/BuyerModal';

import DeliveryLogsModal from '../../../common/Modals/DeliveryLogsModal';

import AddLogsModal from './AddLogsModal';
import styles from './styles.module.scss';

function OngoingOrders() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddDeliveryLogsModalOpen, setIsAddDeliveryLogsModalOpen] =
    useState(false);
  const [isDeliveryLogsModalOpen, setIsDeliveryLogsModalOpen] = useState(false);
  const [isBuyerModalOpen, setIsBuyerModalOpen] = useState(false);
  const [isDeliveredConfirmationToggled, toggleDeliveredConfirmation] =
    useState(false);

  const [selectedOrder, setSelectedOrder] = useState({});

  const {
    isLoading: isOrdersLoading,
    orders,
    totalPages,
    setOrders,
    isSettingDelivered,
    setOrderDelivered,
  } = useSellerOrders({
    status: orderStatus.ON_GOING,
    search,
    page,
    pageSize: 10,
  });

  const filteredOrders = orders.filter(
    (order) =>
      order.buyer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      order.buyer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(search.toLowerCase())
      ) ||
      order.dateTimeCreated.split('T')[0].includes(search.toLowerCase())
  );

  return (
    <>
      <div className={styles.OngoingOrders}>
        <Text type={textTypes.HEADING.XS}>Ongoing Orders</Text>

        <ControlledInput
          className={styles.OngoingOrders_search}
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
                <div className={styles.OngoingOrders_orders}>
                  {filteredOrders.map(
                    ({
                      id,
                      buyer,
                      dateTimeCreated,
                      items,
                      totalPrice,
                      deliveryLogs,
                      deliveryFeeProofImageUrl,
                      deliveryFee,
                    }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.OngoingOrders_order}>
                          <div className={styles.OngoingOrders_info}>
                            <div className={styles.OngoingOrders_info_left}>
                              <Button
                                className={styles.OngoingOrders_info_text}
                                icon="person"
                                type={buttonTypes.TEXT.BLUE}
                                onClick={() => {
                                  setSelectedOrder({ id, buyer });
                                  setIsBuyerModalOpen(true);
                                }}
                              >
                                <Text type={textTypes.HEADING.XXXS}>
                                  {buyer.firstName} {buyer.lastName}
                                </Text>
                              </Button>

                              <div className={styles.OngoingOrders_info_date}>
                                Date Ordered:
                                <Text
                                  colorClass={colorClasses.NEUTRAL['400']}
                                  type={textTypes.HEADING.XXXS}
                                >
                                  {dateTimeCreated.split('T')[0]}
                                </Text>
                              </div>
                            </div>

                            <div className={styles.OngoingOrders_info_buttons}>
                              <Button
                                className={
                                  styles.OngoingOrders_info_statusButton
                                }
                                icon="local_shipping"
                                type={buttonTypes.TEXT.BLUE}
                                onClick={() => {
                                  setSelectedOrder({
                                    id,
                                    buyer,
                                    deliveryLogs,
                                    deliveryFeeProofImageUrl,
                                    deliveryFee,
                                  });
                                  setIsDeliveryLogsModalOpen(true);
                                }}
                              >
                                Ongoing
                              </Button>
                            </div>
                          </div>

                          {items.map(
                            ({
                              productId,
                              productImageUrl,
                              productName,
                              price,
                              quantity,
                              customizationMessage,
                            }) => (
                              <div
                                key={productId}
                                className={styles.OngoingOrders_item}
                              >
                                <div className={styles.OngoingOrders_product}>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    alt="Product"
                                    className={
                                      styles.OngoingOrders_product_image
                                    }
                                    height={60}
                                    src={productImageUrl}
                                    width={60}
                                  />

                                  <div>
                                    <Text
                                      className={
                                        styles.OngoingOrders_product_text
                                      }
                                      type={textTypes.HEADING.XXS}
                                    >
                                      {productName}
                                    </Text>
                                  </div>
                                </div>

                                <div className={styles.OngoingOrders_quantity}>
                                  Quantity:
                                  <Text
                                    colorClass={colorClasses.NEUTRAL['400']}
                                    type={textTypes.HEADING.XXS}
                                  >
                                    {quantity}
                                  </Text>
                                </div>

                                <div
                                  className={
                                    styles.OngoingOrders_customizationText
                                  }
                                >
                                  Customization:
                                  {customizationMessage ? (
                                    <Text
                                      colorClass={colorClasses.NEUTRAL['400']}
                                      type={textTypes.HEADING.XXXS}
                                    >
                                      {customizationMessage}
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

                                <div className={styles.OngoingOrders_price}>
                                  Price:
                                  <Text
                                    className={styles.OngoingOrders_price_text}
                                    colorClass={colorClasses.NEUTRAL['400']}
                                    type={textTypes.HEADING.XXS}
                                  >
                                    ₱{price.toLocaleString()}
                                  </Text>
                                </div>
                              </div>
                            )
                          )}

                          <div className={styles.OngoingOrders_orderTotal}>
                            <div>
                              <div
                                className={cn(
                                  styles.OngoingOrders_orderTotal_text,
                                  styles.OngoingOrders_orderTotal_text_fee
                                )}
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
                                  ₱{deliveryFee}
                                </Text>
                              </div>

                              <div
                                className={styles.OngoingOrders_orderTotal_text}
                              >
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

                            <div
                              className={
                                styles.OngoingOrders_orderTotal_buttons
                              }
                            >
                              <Button
                                className={
                                  styles.OngoingOrders_orderTotal_buttons_button
                                }
                                disabled={false}
                                onClick={() => {
                                  setSelectedOrder({ id });
                                  setIsAddDeliveryLogsModalOpen(true);
                                }}
                              >
                                Add Delivery Logs
                              </Button>

                              <Button
                                className={
                                  styles.OngoingOrders_orderTotal_buttons_button
                                }
                                disabled={false}
                                type={buttonTypes.SECONDARY.BLUE}
                                onClick={() => {
                                  setSelectedOrder({ id });
                                  toggleDeliveredConfirmation(true);
                                }}
                              >
                                Set as Delivered
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        // Mobile View
                        <></>
                      )
                  )}
                </div>

                <Pagination
                  className={styles.OngoingOrders_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);
                    router.push(`/seller/orders/on-going?page=${value}`, {
                      scroll: false,
                    });
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.OngoingOrders_noResults}
                message="No orders found"
              />
            )}
          </>
        )}
      </div>

      {isDeliveryLogsModalOpen && (
        <DeliveryLogsModal
          deliveryDetails={(() => ({
            fullName: selectedOrder.buyer.deliveryFullName,
            contactNumber: selectedOrder.buyer.phoneNumber,
            altMobileNumber: selectedOrder.buyer.altMobileNumber,
            fullAddress: selectedOrder.buyer.deliveryAddress,
          }))()}
          deliveryFee={selectedOrder.deliveryFee}
          deliveryLogs={selectedOrder.deliveryLogs}
          handleClose={() => setIsDeliveryLogsModalOpen(false)}
          isOpen={isDeliveryLogsModalOpen}
          title="Order Delivery Details"
        />
      )}

      {isAddDeliveryLogsModalOpen && (
        <AddLogsModal
          handleClose={() => setIsAddDeliveryLogsModalOpen(false)}
          isOpen={isAddDeliveryLogsModalOpen}
          orderId={selectedOrder.id}
          orders={orders}
          setOrders={setOrders}
          title="Add Delivery Logs"
        />
      )}

      {isBuyerModalOpen && (
        <BuyerModal
          buyer={selectedOrder.buyer}
          handleClose={() => setIsBuyerModalOpen(false)}
          hasUserId={false}
          isOpen={isBuyerModalOpen}
          title="Buyer Details"
        />
      )}

      <ConfirmModal
        actions={[
          {
            id: 'deliveredOrderConfirmButton',
            text: 'Confirm',
            type: buttonTypes.PRIMARY.BLUE,
            onClick: async () => {
              await setOrderDelivered(selectedOrder.id);
              toggleDeliveredConfirmation(false);
            },
            disabled: isSettingDelivered,
          },
          {
            id: 'deliveredOrderConfirmButton',
            text: 'Back',
            type: buttonTypes.SECONDARY.BLUE,
            onClick: () => toggleDeliveredConfirmation(false),
          },
        ]}
        body="Are you sure you that this order has been delivered?"
        handleClose={() => {
          toggleDeliveredConfirmation(false);
        }}
        isOpen={isDeliveredConfirmationToggled}
        title="Delivered?"
      />
    </>
  );
}
export default OngoingOrders;

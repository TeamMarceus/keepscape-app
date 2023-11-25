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
  Text,
} from '@/components';

import { useSellerOrders, useWindowSize } from '@/hooks';

import PreloaderOrders from '@/screens/admin/ReviewOrders/Preloader';
import BuyerModal from '@/screens/common/Modals/BuyerModal';

import DeliveryFeeProofModal from '@/screens/common/Modals/DeliveryFeeProofModal';

import DeliveryDetailsModal from '../../../common/Modals/DeliveryDetailsModal';

import styles from './styles.module.scss';

function PendingApprovals() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeliveryFeeProofModalOpen, setIsDeliveryFeeProofModalOpen] =
    useState(false);
  const [isDeliveryDetailsModalOpen, setIsDeliveryDetailsModalOpen] =
    useState(false);
  const [isBuyerModalOpen, setIsBuyerModalOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState({});

  const {
    isLoading: isOrdersLoading,
    orders,
    totalPages,
  } = useSellerOrders({
    status: orderStatus.AWAITING_CONFIRMATION,
    search,
    page,
    pageSize: 10,
  });

  const filteredOrders = orders.filter((order) => {
    const searchTerm = search.toLowerCase();

    return (
      order.buyer.firstName.toLowerCase().includes(searchTerm) ||
      order.buyer.lastName.toLowerCase().includes(searchTerm) ||
      order.dateTimeCreated.toLowerCase().includes(searchTerm) ||
      order.items.some(({ productName }) =>
        productName.toLowerCase().includes(searchTerm)
      )
    );
  });
  return (
    <>
      <div className={styles.PendingApprovals}>
        <Text type={textTypes.HEADING.XS}>Pending Approvals</Text>

        <ControlledInput
          className={styles.PendingApprovals_search}
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
                <div className={styles.PendingApprovals_orders}>
                  {filteredOrders.map(
                    ({
                      id,
                      buyer,
                      dateTimeCreated,
                      items,
                      totalPrice,
                      status,
                      deliveryLogs,
                      deliveryFeeProofImageUrl,
                      deliveryFee,
                    }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card
                          key={id}
                          className={styles.PendingApprovals_order}
                        >
                          <div className={styles.PendingApprovals_info}>
                            <div className={styles.PendingApprovals_info_left}>
                              <Button
                                className={styles.PendingApprovals_info_text}
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

                              <div
                                className={styles.PendingApprovals_info_date}
                              >
                                Date Ordered:
                                <Text
                                  colorClass={colorClasses.NEUTRAL['400']}
                                  type={textTypes.HEADING.XXXS}
                                >
                                  {dateTimeCreated.split('T')[0]}
                                </Text>
                              </div>
                            </div>

                            <div
                              className={styles.PendingApprovals_info_buttons}
                            >
                              <Button
                                className={
                                  styles.PendingApprovals_info_statusButton
                                }
                                icon="check"
                                type={buttonTypes.TEXT.BLUE}
                                onClick={() => {
                                  setSelectedOrder({
                                    id,
                                    buyer,
                                    deliveryLogs,
                                    deliveryFeeProofImageUrl,
                                    deliveryFee,
                                  });
                                  setIsDeliveryDetailsModalOpen(true);
                                }}
                              >
                                Awaiting Confirmation
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
                                className={styles.PendingApprovals_item}
                              >
                                <div
                                  className={styles.PendingApprovals_product}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    alt="Product"
                                    className={
                                      styles.PendingApprovals_product_image
                                    }
                                    height={60}
                                    src={productImageUrl}
                                    width={60}
                                  />

                                  <div>
                                    <Text
                                      className={
                                        styles.PendingApprovals_product_text
                                      }
                                      type={textTypes.HEADING.XXS}
                                    >
                                      {productName}
                                    </Text>
                                  </div>
                                </div>

                                <div
                                  className={styles.PendingApprovals_quantity}
                                >
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
                                    styles.PendingApprovals_customizationText
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

                                <div className={styles.PendingApprovals_price}>
                                  Price:
                                  <Text
                                    className={
                                      styles.PendingApprovals_price_text
                                    }
                                    colorClass={colorClasses.NEUTRAL['400']}
                                    type={textTypes.HEADING.XXS}
                                  >
                                    ₱{price.toLocaleString()}
                                  </Text>
                                </div>
                              </div>
                            )
                          )}

                          <div className={styles.PendingApprovals_orderTotal}>
                            <Button
                              className={cn(
                                styles.PendingApprovals_orderTotal_text,
                                styles.PendingApprovals_orderTotal_text_deliveryFee
                              )}
                              type={buttonTypes.TEXT.NEUTRAL}
                              onClick={() => {
                                setSelectedOrder({
                                  id,
                                  deliveryFeeProofImageUrl,
                                });
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

                            <div
                              className={
                                styles.PendingApprovals_orderTotal_text
                              }
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
                        </Card>
                      ) : (
                        // Mobile View
                        <></>
                      )
                  )}
                </div>

                <Pagination
                  className={styles.PendingApprovals_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);
                    router.push(`/seller/orders/on-hold?page=${value}`, {
                      scroll: false,
                    });
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.PendingApprovals_noResults}
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

      {isDeliveryDetailsModalOpen && (
        <DeliveryDetailsModal
          altMobileNumber={selectedOrder.buyer.altMobileNumber}
          contactNumber={selectedOrder.buyer.phoneNumber}
          fullAddress={selectedOrder.buyer.deliveryAddress}
          fullName={selectedOrder.buyer.deliveryFullName}
          handleClose={() => setIsDeliveryDetailsModalOpen(false)}
          isOpen={isDeliveryDetailsModalOpen}
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
    </>
  );
}
export default PendingApprovals;

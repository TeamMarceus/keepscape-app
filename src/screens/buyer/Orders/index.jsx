
import { useState } from 'react';

import cn from 'classnames';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  textTypes,
  buttonTypes,
  colorClasses,
  orderStatus,
  iconButtonTypes,
} from '@/app-globals';

import { 
  Button,
  Text,
  ControlledInput,
  NoResults,
  Pagination,
  Card, 
  ConfirmModal,
  PaypalButton,
  ButtonLink,
  IconLink
} from '@/components';

import { useBuyerOrders, useWindowSize } from '@/hooks';

import PreloaderOrders from '@/screens/admin/ReviewOrders/Preloader';

import DeliveryDetailsModal from '@/screens/common/Modals/DeliveryDetailsModal';

import DeliveryFeeProofModal from './DeliveryFeeProofModal';
import SellerModal from './SellerModal';

import styles from './styles.module.scss';

function Orders() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;
  const filter = searchParams.get('filter') || orderStatus.PENDING;
 
  const [search, setSearch] = useState('');
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isDeliveryDetailsModalOpen, setIsDeliveryDetailsModalOpen] = useState(false);
  const [isCancelConfirmationToggled, toggleCancelConfirmation] = useState(false);
  const [isDeliveryFeeProofModalOpen, setIsDeliveryFeeProofModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const { 
    isLoading: isOrdersLoading, 
    orders,
    totalPages,
    isCancelling: isOrderCancelling,
    cancelOrder,
    setOrders,
  } = useBuyerOrders({
    status: filter,
    search,
    page,
    pageSize: 5,
  });
  
  const filteredOrders = orders.filter((order) => {
    const searchTerm = search.toLowerCase();
  
    return (
      order.seller.sellerName.toLowerCase().includes(searchTerm) ||
      order.dateTimeCreated.toLowerCase().includes(searchTerm)  ||
      order.items.some(({ productName }) => productName.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <>
      <div className={styles.Orders}>
        <Text className={styles.Orders_title} type={textTypes.HEADING.SM}>
          My Orders
        </Text>

        <div className={styles.Orders_filters}>
          <Button
            className={cn(styles.Orders_filters_button, {
              [styles.Orders_filters_button___active]: filter === orderStatus.PENDING,
            })}
            type={buttonTypes.TEXT.BLUE}
            onClick={() => {
              router.push(`/buyer/account?activeTab=orders&page=${1}&filter=${orderStatus.PENDING}`, { scroll: false })
            }}
          >
            <Text
              className={styles.Orders_filters_button_text}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XXXS}
            >
              Pending
            </Text>
          </Button>

          <Button
            className={cn(styles.Orders_filters_button, {
              [styles.Orders_filters_button___active]: filter === orderStatus.AWAITING_BUYER,
            })}
            type={buttonTypes.TEXT.BLUE}
            onClick={() => {
              router.push(`/buyer/account?activeTab=orders&page=${1}&filter=${orderStatus.AWAITING_BUYER}`, { scroll: false })
            }}
          >
            <Text
              className={styles.Orders_filters_button_text}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XXXS}
            >
              Awaiting Payment
            </Text>
          </Button>

          <Button
            className={cn(styles.Orders_filters_button, {
              [styles.Orders_filters_button___active]: filter === orderStatus.CANCELLED,
            })}
            type={buttonTypes.TEXT.BLUE}
            onClick={() => {
              router.push(`/buyer/account?activeTab=orders&page=${1}&filter=${orderStatus.CANCELLED}`, { scroll: false })
            }}
          >
            <Text
              className={styles.Orders_filters_button_text}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XXXS}
            >
              Cancelled
            </Text>
          </Button>
        </div>

        <ControlledInput
          className={styles.Orders_search}
          icon='search'
          name="search"
          placeholder="You can search by Seller Name, Product Name or Date Ordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isOrdersLoading ? (
          <PreloaderOrders />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredOrders.length > 0 ? (
              <>
                <div className={styles.Orders_orders}>
                  {filteredOrders.map(
                    ({ id, seller, dateTimeCreated, items, totalPrice, status, 
                      deliveryAddress, deliveryFullName, altMobileNumber, 
                      phoneNumber, deliveryFeeProofImageUrl, deliveryFee}) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.Orders_order}>
                          <div className={styles.Orders_info}>
                            <div className={styles.Orders_info_left}>
                              <Button
                                className={styles.Orders_info_text}
                                icon="storefront"
                                type={buttonTypes.TEXT.BLUE}
                                onClick={() => {
                                  setSelectedOrder({id, seller});
                                  setIsSellerModalOpen(true)
                                }}
                              >
                                <Text type={textTypes.HEADING.XXXS}>
                                  {seller.sellerName}
                                </Text>
                              </Button>

                              <div className={styles.Orders_info_date}>
                                Date Ordered: 
                                <Text
                                  colorClass={colorClasses.NEUTRAL['400']}
                                  type={textTypes.HEADING.XXXS}
                                >
                                  {dateTimeCreated.split('T')[0]}
                                </Text>
                              </div>
                            </div>

                            <div className={styles.Orders_info_buttons}>
                              <Button
                                className={styles.Orders_info_statusButton}
                                icon={(()=> {
                                  if (status === orderStatus.AWAITING_BUYER) {
                                    return 'payments';
                                  } if (status === orderStatus.PENDING) {
                                    return 'pending';
                                  } 
                                    return 'cancel';
                                  })()
                                }
                                type={(() => {
                                    if (status === orderStatus.AWAITING_BUYER) {
                                      return buttonTypes.TEXT.GREEN
                                    } if (status === orderStatus.PENDING) {
                                      return buttonTypes.TEXT.BLUE;
                                    } 
                                      return buttonTypes.TEXT.RED;
                                  })()
                                }
                                onClick={() => {
                                  setSelectedOrder({id, deliveryAddress, deliveryFullName, altMobileNumber, phoneNumber});
                                
                                  setIsDeliveryDetailsModalOpen(true);
                                }}
                              >
                                {status === orderStatus.AWAITING_BUYER && 'Awaiting Payment'}
                                {status === orderStatus.PENDING && 'Pending'}
                                {status === orderStatus.CANCELLED && 'Cancelled'}
                              </Button>
                            </div>
                            
                          </div>

                          {items.map(
                            ({ productId, productImageUrl, productName, price, quantity, customizationMessage  }) => (
                            <div key={productId} className={styles.Orders_item}>
                              <div className={styles.Orders_product}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  alt="Product"
                                  className={styles.Orders_product_image}
                                  height={60}
                                  src={productImageUrl}
                                  width={60}
                                />

                                <div>
                                  <Text 
                                    className={styles.Orders_product_text}
                                    type={textTypes.HEADING.XXS}
                                  >
                                    {productName}
                                  </Text>
                                </div>
                              </div>

                              <div className={styles.Orders_quantity}>
                                Quantity:
                                <Text 
                                  colorClass={colorClasses.NEUTRAL['400']}
                                  type={textTypes.HEADING.XXS}
                                >
                                  {quantity}
                                </Text>
                              </div>

                              <div className={styles.Orders_customizationText}>
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
                            
                              <div className={styles.Orders_price}>
                                Price:
                                <Text
                                  className={styles.Orders_price_text}
                                  colorClass={colorClasses.NEUTRAL['400']}
                                  type={textTypes.HEADING.XXS}
                                >
                                  ₱{price.toLocaleString()}
                                </Text>
                              </div>

                              {status === orderStatus.CANCELLED && 
                                <IconLink
                                  className={styles.Orders_buyAgain}
                                  icon="redo"
                                  to={`/buyer/product/${productId}`}
                                  type={iconButtonTypes.OUTLINE.SM}
                                >
                                  Buy Again
                                </IconLink>
                              }
                            </div>
                            )
                          )}

                          <div className={styles.Orders_orderTotal}>
                            <div className={styles.Orders_orderTotal_fees}>
                              {status === orderStatus.AWAITING_BUYER && (
                                <Button 
                                  className={cn(styles.Orders_orderTotal_text, 
                                    styles.Orders_orderTotal_text_deliveryFee)}
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
                              )}

                              <div className={styles.Orders_orderTotal_text}>
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

                            <div className={styles.Orders_orderTotal_buttons}>
                              {status === orderStatus.AWAITING_BUYER && (
                                <PaypalButton
                                  className={styles.Orders_orderTotal_buttons_button}
                                  orderId={id}
                                  setOrders={setOrders}
                                  total={totalPrice}
                                />
                              )}

                              {status !== orderStatus.CANCELLED && (
                                <Button
                                  className={styles.Orders_orderTotal_buttons_button}
                                  type={buttonTypes.SECONDARY.BLUE}
                                  onClick={() => {
                                    setSelectedOrder({ id });
                                    toggleCancelConfirmation(true);
                                  }}
                                >
                                  Cancel Order
                                </Button>
                              )}
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
                  className={styles.Orders_pagination}
                  currentPage={page}
                  pageJump={(value) => {
                    router.push(`/buyer/account?activeTab=orders&page=${value}&filter=${filter}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.Orders_noResults}
                message="No orders found"
              />
            )}
          </>
        )}
      </div>

      {isDeliveryDetailsModalOpen && (
        <DeliveryDetailsModal
          altMobileNumber={selectedOrder.altPhoneNumber}
          contactNumber={selectedOrder.phoneNumber}
          fullAddress={selectedOrder.deliveryAddress}
          fullName={selectedOrder.deliveryFullName}
          handleClose={() => setIsDeliveryDetailsModalOpen(false)}
          isOpen={isDeliveryDetailsModalOpen}
        />
      )}

      {isDeliveryFeeProofModalOpen && (
        <DeliveryFeeProofModal
          handleClose={() => setIsDeliveryFeeProofModalOpen(false)}
          isOpen={isDeliveryFeeProofModalOpen}
          proof={selectedOrder.deliveryFeeProofImageUrl}
          title="Delivery Fee Proof"
        />
      )}

      {isSellerModalOpen && (
        <SellerModal
          description={selectedOrder.seller.description}
          email={selectedOrder.seller.email}
          handleClose={() => setIsSellerModalOpen(false)}
          idImageUrl={selectedOrder.seller.idImageUrl}
          isOpen={isSellerModalOpen}
          phoneNumber={selectedOrder.seller.phoneNumber}
          sellerName={selectedOrder.seller.sellerName}
          title="Seller Details"
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
              toggleCancelConfirmation(false);
            },
            disabled: isOrderCancelling,
          },
          {
            id: 'cancelConfirmButton',
            text: 'Back',
            type: buttonTypes.SECONDARY.BLUE,
            onClick: () => toggleCancelConfirmation(false),
          },
        ]}
        body="Are you sure you want to cancel this order?"
        handleClose={() => {
          toggleCancelConfirmation(false);
        }}
        isOpen={isCancelConfirmationToggled}
        title="Cancel?"
      />
    </>
  );
}

export default Orders;

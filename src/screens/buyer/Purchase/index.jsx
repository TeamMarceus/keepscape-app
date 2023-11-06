
import { useState } from 'react';

import cn from 'classnames';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  textTypes,
  buttonTypes,
  colorClasses,
  orderStatus,
} from '@/app-globals';

import { 
  Button,
  Text,
  ControlledInput,
  NoResults,
  Pagination,
  Card, 
  ConfirmModal,
  Icon
} from '@/components';

import { useBuyerOrders, useWindowSize } from '@/hooks';

import PreloaderPurchase from '@/screens/admin/ReviewOrders/Preloader';
import DeliveryLogsModal from '@/screens/common/Modals/DeliveryLogsModal';

import DeliveryFeeProofModal from '../../common/Modals/DeliveryFeeProofModal';
import SellerModal from '../CommonModals/SellerModal';

import AddReviewModal from './AddReviewModal';
import QrCodeModal from './QrCodeModal';
import ReportOrderModal from './ReportOrderModal';
import styles from './styles.module.scss';

function Purchase() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;
  const filter = searchParams.get('filter') || orderStatus.ON_GOING;
 
  const [search, setSearch] = useState('');
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [isDeliveryFeeProofModalOpen, setIsDeliveryFeeProofModalOpen] = useState(false);
  const [isDeliveryLogsModalOpen, setIsDeliveryLogsModalOpen] = useState(false);
  const [isReportOrderModalOpen, setIsReportOrderModalOpen] = useState(false);
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isConfirmOrderConfirmationToggled, toggleConfirmOrderConfirmation] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState({});

  const { 
    isLoading: isPurchaseLoading, 
    orders: purchases,
    totalPages,
    isConfirming,
    confirmOrder,
    setOrders,
  } = useBuyerOrders({
    status: filter,
    search,
    page,
    pageSize: 5,
  });
  
  const filteredPurchase = purchases.filter((order) => {
    const searchTerm = search.toLowerCase();
  
    return (
      order.seller.sellerName.toLowerCase().includes(searchTerm) ||
      order.dateTimeCreated.toLowerCase().includes(searchTerm)  ||
      order.items.some(({ productName }) => productName.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <>
      <div className={styles.Purchase}>
        <Text className={styles.Purchase_title} type={textTypes.HEADING.SM}>
          My Purchase
        </Text>

        <div className={styles.Purchase_filters}>
          <Button
            className={cn(styles.Purchase_filters_button, {
              [styles.Purchase_filters_button___active]: filter === orderStatus.ON_GOING,
            })}
            type={buttonTypes.TEXT.BLUE}
            onClick={() => {
              router.push(`/buyer/account?activeTab=purchase&page=${1}&filter=${orderStatus.ON_GOING}`, { scroll: false })
            }}
          >
            <Text
              className={styles.Purchase_filters_button_text}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XXXS}
            >
              Ongoing
            </Text>
          </Button>

          <Button
            className={cn(styles.Purchase_filters_button, {
              [styles.Purchase_filters_button___active]: filter === orderStatus.ON_HOLD,
            })}
            type={buttonTypes.TEXT.BLUE}
            onClick={() => {
              router.push(`/buyer/account?activeTab=purchase&page=${1}&filter=${orderStatus.ON_HOLD}`, { scroll: false })
            }}
          >
            <Text
              className={styles.Purchase_filters_button_text}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XXXS}
            >
              Awaiting Confirmation
            </Text>
          </Button>

          <Button
            className={cn(styles.Purchase_filters_button, {
              [styles.Purchase_filters_button___active]: filter === orderStatus.DELIVERED,
            })}
            type={buttonTypes.TEXT.BLUE}
            onClick={() => {
              router.push(`/buyer/account?activeTab=purchase&page=${1}&filter=${orderStatus.DELIVERED}`, { scroll: false })
            }}
          >
            <Text
              className={styles.Purchase_filters_button_text}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XXXS}
            >
              Delivered
            </Text>
          </Button>
        </div>

        <ControlledInput
          className={styles.Purchase_search}
          icon='search'
          name="search"
          placeholder="You can search by Seller Name, Product Name or Date Purchased"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isPurchaseLoading ? (
          <PreloaderPurchase />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredPurchase.length > 0 ? (
              <>
                <div className={styles.Purchase_orders}>
                  {filteredPurchase.map(
                    ({ id, seller, dateTimeCreated, items, totalPrice, status, 
                      deliveryAddress, deliveryFullName, altMobileNumber, deliveryLogs,
                      phoneNumber, deliveryFeeProofImageUrl, deliveryFee}) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.Purchase_order}>
                          <div className={styles.Purchase_info}>
                            <div className={styles.Purchase_info_left}>
                              <Button
                                className={styles.Purchase_info_text}
                                icon="storefront"
                                type={buttonTypes.TEXT.BLUE}
                                onClick={() => {
                                  setSelectedPurchase({id, seller});
                                  setIsSellerModalOpen(true)
                                }}
                              >
                                <Text type={textTypes.HEADING.XXXS}>
                                  {seller.sellerName}
                                </Text>
                              </Button>

                              <div className={styles.Purchase_info_date}>
                                Date Purchased: 
                                <Text
                                  colorClass={colorClasses.NEUTRAL['400']}
                                  type={textTypes.HEADING.XXXS}
                                >
                                  {dateTimeCreated.split('T')[0]}
                                </Text>
                              </div>
                            </div>

                            <div className={styles.Purchase_info_buttons}>
                              <Button
                                className={styles.Purchase_info_statusButton}
                                icon={(()=> {
                                  if (status === orderStatus.AWAITING_CONFIRMATION || status === orderStatus.REPORTED) {
                                    return 'recommend';
                                  } if (status === orderStatus.ON_GOING) {
                                    return 'local_shipping';
                                  } 
                                    return 'done';
                                  })()
                                }
                                type={(() => {
                                    if (status === orderStatus.AWAITING_CONFIRMATION || status === orderStatus.REPORTED) {
                                      return buttonTypes.TEXT.NEUTRAL
                                    } if (status === orderStatus.ON_GOING) {
                                      return buttonTypes.TEXT.BLUE;
                                    } 
                                      return buttonTypes.TEXT.GREEN;
                                  })()
                                }
                                onClick={() => {
                                  setSelectedPurchase({
                                    id, 
                                    deliveryAddress, 
                                    deliveryFullName, 
                                    altMobileNumber, 
                                    phoneNumber, 
                                    deliveryLogs,
                                    deliveryFee,
                                  });
                                
                                  setIsDeliveryLogsModalOpen(true);
                                }}
                              >
                                {(status === orderStatus.AWAITING_CONFIRMATION || status === orderStatus.REPORTED) && 'Awaiting Confirmation'}
                                {status === orderStatus.ON_GOING && 'On Going'}
                                {status === orderStatus.DELIVERED && 'Delivered'}
                              </Button>
                            </div>
                            
                          </div>

                          {items.map(
                            ({ productId, productImageUrl, productName, price, quantity, customizationMessage, qrImageUrl  }) => (
                            <Card key={productId} className={styles.Purchase_item}>
                              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                              <div 
                                className={cn(styles.Purchase_product, {
                                  [styles.Purchase_product___delivered]: status === orderStatus.DELIVERED,
                                })}
                                onClick={() => {
                                  if (status === orderStatus.DELIVERED) {
                                    setSelectedPurchase({ productId, productName });
                                    setIsAddReviewModalOpen(true);
                                  }
                                }}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  alt={productName}
                                  className={styles.Purchase_product_image}
                                  height={60}
                                  src={productImageUrl}
                                  width={60}
                                />
                  
                                <Text 
                                  className={styles.Purchase_product_text}
                                  type={textTypes.HEADING.XXS}
                                >
                                  {productName}
                                </Text>

                                {status === orderStatus.DELIVERED &&
                                  <Icon
                                    className={styles.Purchase_product_icon}
                                    icon="rate_review"
                                  />
                                }
                    
                              </div>

                              <div className={styles.Purchase_quantity}>
                                Quantity:
                                <Text 
                                  colorClass={colorClasses.NEUTRAL['400']}
                                  type={textTypes.HEADING.XXS}
                                >
                                  {quantity}
                                </Text>
                              </div>

                              <div className={styles.Purchase_customizationText}>
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
                            
                              <div className={styles.Purchase_price}>
                                Price:
                                <Text
                                  className={styles.Purchase_price_text}
                                  colorClass={colorClasses.NEUTRAL['400']}
                                  type={textTypes.HEADING.XXS}
                                >
                                  ₱{price.toLocaleString()}
                                </Text>
                              </div>

                              <div className={styles.Purchase_qrCode}>
                              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                                <img
                                  alt='Generating QR Code...'
                                  className={styles.Purchase_qrCode_image}
                                  height={60}
                                  src={qrImageUrl}
                                  width={60}
                                  onClick={() => {
                                    setSelectedPurchase({id, qrCode: qrImageUrl, name: productName});
                                    setIsQrCodeModalOpen(true);
                                  }}
                                />
                              </div>
                            </Card>
                            )
                          )}

                          <div className={styles.Purchase_orderTotal}>
                            <div className={styles.Purchase_orderTotal_fees}>
                              <Button 
                                className={cn(styles.Purchase_orderTotal_text, 
                                  styles.Purchase_orderTotal_text_deliveryFee)}
                                type={buttonTypes.TEXT.NEUTRAL}
                                onClick={() => {
                                  setSelectedPurchase({id, deliveryFeeProofImageUrl});
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
                     
                              <div className={styles.Purchase_orderTotal_text}>
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

                            <div className={styles.Purchase_orderTotal_buttons}>

                              {(status === orderStatus.AWAITING_CONFIRMATION || status === orderStatus.REPORTED) && (
                                <>
                                 <Button
                                  className={styles.Purchase_orderTotal_buttons_button}
                                  onClick={() => {
                                    setSelectedPurchase({ id  });
                                    toggleConfirmOrderConfirmation(true);
                                  }}
                                >
                                  Confirm Order
                                </Button>

                                <Button
                                  className={styles.Purchase_orderTotal_buttons_button}
                                  type={buttonTypes.SECONDARY.BLUE}
                                  onClick={() => {
                                    setSelectedPurchase({ id  });
                                    setIsReportOrderModalOpen(true);
                                  }}
                                >
                                  Report a Problem
                                </Button>
                                </>
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
                  className={styles.Purchase_pagination}
                  currentPage={page}
                  pageJump={(value) => {
                    router.push(`/buyer/account?activeTab=purchase&page=${value}&filter=${filter}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.Purchase_noResults}
                message="No purchase found"
              />
            )}
          </>
        )}
      </div>

      {isAddReviewModalOpen &&
        <AddReviewModal
          handleClose={() => setIsAddReviewModalOpen(false)}
          isOpen={isAddReviewModalOpen}
          productId={selectedPurchase.productId}
        />
      }

      {isReportOrderModalOpen &&
        <ReportOrderModal
          handleClose={() => setIsReportOrderModalOpen(false)}
          isOpen={isReportOrderModalOpen}
          orderId={selectedPurchase.id}
          title="Report a Problem"
        />
      }

      {isQrCodeModalOpen &&
        <QrCodeModal
          handleClose={() => setIsQrCodeModalOpen(false)}
          isOpen={isQrCodeModalOpen}
          qrCode={selectedPurchase.qrCode}
          title={`${selectedPurchase.name} QR Code`}
        />  
      }

      {isDeliveryLogsModalOpen &&
        <DeliveryLogsModal
          deliveryDetails={
            (() => ({
              fullName: selectedPurchase.deliveryFullName,
              contactNumber: selectedPurchase.phoneNumber,
              altMobileNumber: selectedPurchase.altMobileNumber,
              fullAddress: selectedPurchase.deliveryAddress,
            }))()
          }
          deliveryFee={selectedPurchase.deliveryFee}
          deliveryLogs={selectedPurchase.deliveryLogs}
          handleClose={() => setIsDeliveryLogsModalOpen(false)}
          isOpen={isDeliveryLogsModalOpen}
          title="Purchase Delivery Details"
        />
      }

      {isDeliveryFeeProofModalOpen && (
        <DeliveryFeeProofModal
          handleClose={() => setIsDeliveryFeeProofModalOpen(false)}
          isOpen={isDeliveryFeeProofModalOpen}
          proof={selectedPurchase.deliveryFeeProofImageUrl}
          title="Delivery Fee Proof"
        />
      )}

      {isSellerModalOpen && (
        <SellerModal
          description={selectedPurchase.seller.description}
          email={selectedPurchase.seller.email}
          handleClose={() => setIsSellerModalOpen(false)}
          idImageUrl={selectedPurchase.seller.idImageUrl}
          isOpen={isSellerModalOpen}
          phoneNumber={selectedPurchase.seller.phoneNumber}
          sellerName={selectedPurchase.seller.sellerName}
          title="Seller Details"
        />
      )}

      <ConfirmModal
        actions={[
          {
            id: 'confirmOrderConfirmButton',
            text: 'Confirm',
            type: buttonTypes.PRIMARY.BLUE,
            onClick: async () => {
              await confirmOrder(selectedPurchase.id);
              toggleConfirmOrderConfirmation(false);
            },
            disabled: isConfirming,
          },
          {
            id: 'confirmOrderConfirmButton',
            text: 'Back',
            type: buttonTypes.SECONDARY.BLUE,
            onClick: () => toggleConfirmOrderConfirmation(false),
          },
        ]}
        body="Are you sure you to confirm this order?"
        handleClose={() => {
          toggleConfirmOrderConfirmation(false);
        }}
        isOpen={isConfirmOrderConfirmationToggled}
        title="Confirm?"
      />
    </>
  );
}

export default Purchase;

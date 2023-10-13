import React, { useState } from 'react';

import cn from 'classnames';
import { useSearchParams } from 'next/navigation';

import {
  buttonTypes,
  colorClasses,
  textTypes,
} from '@/app-globals';

import { 
  Button, 
  ButtonLink, 
  Card, 
  ControlledInput, 
  Icon, 
  NoResults, 
  Text 
} from '@/components';

import { useWindowSize } from '@/hooks';

import DeliveryLogsModal from './DeliveryLogsModal';

import PreloaderOrders from './Preloader';

import styles from './styles.module.scss';

const orders = [
  {
    id: '11113e4567-e89b-12d3-a456-426614174000',
    dateOrdered: '2021-08-01',
    product: {
        id: 1,
        name: 'Buntanding KeyChain 1',
        image: 'https://picsum.photos/200',
      },
    buyer: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Buyer 1',
      deliveryDetails: {
        fullName: 'Buyer 1',
        fullAddress: 'Zone 5, Barangay 1, City 1, Province 1, 1000',
        contactNumber: '09123456789',
      },
    },
    quantity: 1,
    sellerId: '123e4567-e89b-12d3-a456-426614174000',
    status: 'On Going',
  },
  {
    id: 2,
    dateOrdered: '2021-08-01',
    product: {
        id: 1,
        name: 'Buntanding KeyChain 1',
        image: 'https://picsum.photos/200',
      },
    buyer: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Buyer 1',
      deliveryDetails: {
        fullName: 'Buyer 1',
        fullAddress: 'Zone 5, Barangay 1, City 1, Province 1, 1000',
        contactNumber: '09123456789',
      },
    },
    quantity: 1,
    sellerId: '123e4567-e89b-12d3-a456-426614174000',
    status: 'Delivered',
  },
  {
    id: 4,
    dateOrdered: '2021-08-01',
    product: {
        id: 1,
        name: 'Buntanding KeyChain 1',
        image: 'https://picsum.photos/200',
      },
    buyer: {
      id: 1,
      name: 'Buyer 1',
      deliveryDetails: {
        fullName: 'Buyer 1',
        fullAddress: 'Zone 5, Barangay 1, City 1, Province 1, 1000',
        contactNumber: '09123456789',
      },
    },
    quantity: 1,
    sellerId: 1,
    status: 'Pending',
  },
  {
    id: 3,
    dateOrdered: '2021-08-01',
    product: {
        id: 1,
        name: 'Buntanding KeyChain 1',
        image: 'https://picsum.photos/200',
      },
    buyer: {
      id: 1,
      name: 'Buyer 1',
      deliveryDetails: {
        fullName: 'Buyer 1',
        fullAddress: 'Zone 5, Barangay 1, City 1, Province 1, 1000',
        contactNumber: '09123456789',
      },
    },
    quantity: 1,
    sellerId: 1,
    status: 'Cancelled',
  },
]

function ReviewOrders() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get('id');

  const { windowSize } = useWindowSize();

  const isOrdersLoading = false;

  const [search, setSearch] = useState('');
  const [isDeliveryLogsModalOpen, setIsDeliveryLogsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const filteredOrders = orders.filter((order) => {
    const { product, buyer, status } = order;

    if (orderIdParam && search === '') {
      return order.id === orderIdParam;
    }

    return (
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      buyer.name.toLowerCase().includes(search.toLowerCase()) ||
      status.toLowerCase().includes(search.toLowerCase()) ||
      order.dateOrdered.toLowerCase().includes(search.toLowerCase())
    );
  });

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
          placeholder="You can search by Date Ordered, Product, Buyer, or Status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isOrdersLoading ? (
          <PreloaderOrders />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredOrders.length ? (
              <div className={styles.ReviewOrders_grid}>
                {/* Header of OrderGrid starts here */}
                <Card
                  className={cn(
                    styles.ReviewOrders_grid_orderGrid,
                    styles.ReviewOrders_grid_headers
                  )}
                >
                  <div
                    className={cn(
                      styles.ReviewOrders_grid_header,
                      styles.ReviewOrders_grid_column
                    )}
                  >
                    Date Ordered
                  </div>

                  <div
                    className={cn(
                      styles.ReviewOrders_grid_header,
                      styles.ReviewOrders_grid_column
                    )}
                  >
                    Product
                  </div>

                  <div
                    className={cn(
                      styles.ReviewOrders_grid_header,
                      styles.ReviewOrders_grid_column
                    )}
                  >
                    Quantity
                  </div>

                  <div
                    className={cn(
                      styles.ReviewOrders_grid_header,
                      styles.ReviewOrders_grid_column
                    )}
                  >
                    Buyer ID
                  </div>

                  <div
                    className={cn(
                      styles.ReviewOrders_grid_header,
                      styles.ReviewOrders_grid_column
                    )}
                  >
                    Seller ID
                  </div>

                  <div
                    className={cn(
                      styles.ReviewOrders_grid_header,
                      styles.ReviewOrders_grid_column,
                      styles.ReviewOrders_grid_header_action
                    )}
                  >
                    Status
                  </div>

                  
                  {/* Header of OrderGrid ends here */}
                </Card>

                {/* Body of OrderGrid starts here */}
                {filteredOrders.map(
                  ({ id, dateOrdered, product, quantity, buyer, sellerId, status }) =>
                    windowSize.width > 767 ? (
                      // Desktop View
                      <Card key={id} className={styles.ReviewOrders_grid_orderGrid}>
                        <div className={styles.ReviewOrders_grid_column}>
                          {dateOrdered}
                        </div>

                        <ButtonLink 
                          className={cn(styles.ReviewOrders_grid_column,
                            styles.ReviewOrders_grid_column_product)}
                          to={`/admin/review-products?id=${product.id}`}
                          type={buttonTypes.TEXT.NEUTRAL}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt={product.name}
                            className={styles.ReviewOrders_grid_column_product_image}
                            height={60}
                            src={product.image}
                            width={60}
                          />
                          <Text>
                            {product.name}  
                          </Text>
                        </ButtonLink>

                        <div className={styles.ReviewOrders_grid_column}>
                          {quantity}
                        </div>

                        <ButtonLink 
                          className={styles.ReviewOrders_grid_column}
                          to={`/admin/buyers?id=${buyer.id}`}
                          type={buttonTypes.TEXT.NEUTRAL}
                        >
                          {buyer.id}
                        </ButtonLink>

                        <ButtonLink 
                          className={styles.ReviewOrders_grid_column}
                          to={`/admin/sellers?id=${sellerId}`}
                          type={buttonTypes.TEXT.NEUTRAL}
                        >
                          {sellerId}
                        </ButtonLink>

                        <Button
                          className={styles.ReviewOrders_grid_column}
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
                          onClick={() => {
                            if (status === 'Cancelled' || status === 'Pending') {
                              return;
                            }
                            setSelectedOrder({ id, product, buyer });
                            setIsDeliveryLogsModalOpen(true);
                          }}
                        >
                          {status}
                        </Button>
                      </Card>
                    ) : (
                      // Mobile View
                      <details
                        key={id}
                        className={styles.ReviewOrders_grid_orderGrid}
                      >
                        <summary className={styles.ReviewOrders_grid_title}>
                          <div className={styles.ReviewOrders_grid_title_info}>
                            <Icon
                              className={styles.ReviewOrders_grid_title_icon}
                              icon="expand_more"
                            />

                            <Text type={textTypes.HEADING.XS}>
                              {dateOrdered} {product.name}
                            </Text>
                          </div>
                        </summary>

                        <div className={styles.ReviewOrders_grid_column}>
                          <Text
                            colorClass={colorClasses.NEUTRAL['400']}
                            type={textTypes.HEADING.XXS}
                          >
                            Buyer Name:
                          </Text>

                          <Text type={textTypes.HEADING.XXS}>{buyer.name}</Text>
                        </div>
                      </details>
                    )
                )}
                {/* Body of OrderGrid ends here */}
              </div>
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
          deliveryDetails={selectedOrder.buyer.deliveryDetails}
          handleClose={() => setIsDeliveryLogsModalOpen(false)}
          isOpen={isDeliveryLogsModalOpen}
          title={`${selectedOrder.product.name} Delivery Details`}
        />
      }
    </>
)
}
export default ReviewOrders;

import React, { useState } from 'react';

import cn from 'classnames';

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

import DeliveryLogsModal from '../DeliveryLogsModal';

import PreloaderOrders from '../Preloader';

import styles from './styles.module.scss';

const orders = [
  {
    id: 1,
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
    customization: 'I want this to be blue and red so that it will be more beautiful',
    status: 'Delivered',
  },
  {
    id: 2,
    dateOrdered: '2021-08-01',
    product: {
        id: 2,
        name: 'Buntanding KeyChain 2',
        image: 'https://picsum.photos/200',
      },
    buyer: {
      id: 2,
      name: 'Buyer 2',
      deliveryDetails: {
        fullName: 'Buyer 2',
        fullAddress: 'Zone 5, Barangay 2, City 2, Province 2, 2000',
        contactNumber: '09123456789',
      },
    },
    quantity: 2,
    customization: 'I want this to be blue and red so that it will be more beautiful',
    status: 'Delivered',
  },
  {
    id: 3,
    dateOrdered: '2021-08-01',
    product: {
        id: 2,
        name: 'Buntanding KeyChain 2',
        image: 'https://picsum.photos/200',
      },
    buyer: {
      id: 2,
      name: 'Buyer 2',
      deliveryDetails: {
        fullName: 'Buyer 2',
        fullAddress: 'Zone 5, Barangay 2, City 2, Province 2, 2000',
        contactNumber: '09123456789',
      },
    },
    quantity: 2,
    customization: 'I want this to be blue and red so that it will be more beautiful',
    status: 'Cancelled',
  },
  {
    id: 4,
    dateOrdered: '2021-08-01',
    product: {
        id: 2,
        name: 'Buntanding KeyChain 2',
        image: 'https://picsum.photos/200',
      },
    buyer: {
      id: 2,
      name: 'Buyer 2',
      deliveryDetails: {
        fullName: 'Buyer 2',
        fullAddress: 'Zone 5, Barangay 2, City 2, Province 2, 2000',
        contactNumber: '09123456789',
      },
    },
    quantity: 2,
    customization: 'I want this to be blue and red so that it will be more beautiful',
    status: 'Cancelled',
  },
]

function HistoryOrders() {
  const { windowSize } = useWindowSize();
  const isOrdersLoading = false;
  const [search, setSearch] = useState('');
  const [isDeliveryLogsModalOpen, setIsDeliveryLogsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const filteredOrders = orders.filter((order) => {
    const { product, buyer, status } = order;

    return (
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      buyer.name.toLowerCase().includes(search.toLowerCase()) ||
      status.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <div className={styles.HistoryOrders}>
        
        <Text type={textTypes.HEADING.XS}>
          Order History
        </Text>

        <ControlledInput
          className={styles.HistoryOrders_search}
          icon="search"
          name="search"
          placeholder="You can search by Product Name, Buyer Name, or Order Status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isOrdersLoading ? (
          <PreloaderOrders />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredOrders.length ? (
              <div className={styles.HistoryOrders_grid}>
                {/* Header of OrderGrid starts here */}
                <Card
                  className={cn(
                    styles.HistoryOrders_grid_orderGrid,
                    styles.HistoryOrders_grid_headers
                  )}
                >
                  <div
                    className={cn(
                      styles.HistoryOrders_grid_header,
                      styles.HistoryOrders_grid_column
                    )}
                  >
                    Date Ordered
                  </div>

                  <div
                    className={cn(
                      styles.HistoryOrders_grid_header,
                      styles.HistoryOrders_grid_column
                    )}
                  >
                    Product
                  </div>

                  <div
                    className={cn(
                      styles.HistoryOrders_grid_header,
                      styles.HistoryOrders_grid_column
                    )}
                  >
                    Buyer
                  </div>

                  <div
                    className={cn(
                      styles.HistoryOrders_grid_header,
                      styles.HistoryOrders_grid_column
                    )}
                  >
                    Quantity
                  </div>

                  <div
                    className={cn(
                      styles.HistoryOrders_grid_header,
                      styles.HistoryOrders_grid_column
                    )}
                  >
                    Customization
                  </div>

                  <div
                    className={cn(
                      styles.HistoryOrders_grid_header,
                      styles.HistoryOrders_grid_column,
                      styles.HistoryOrders_grid_header_action
                    )}
                  >
                    Status
                  </div>

                  
                  {/* Header of OrderGrid ends here */}
                </Card>

                {/* Body of OrderGrid starts here */}
                {filteredOrders.map(
                  ({ id, dateOrdered, product, buyer, quantity, customization, status }) =>
                    windowSize.width > 767 ? (
                      // Desktop View
                      <Card key={id} className={styles.HistoryOrders_grid_orderGrid}>
                        <div className={styles.HistoryOrders_grid_column}>
                          {dateOrdered}
                        </div>

                        <ButtonLink 
                          className={cn(styles.HistoryOrders_grid_column,
                            styles.HistoryOrders_grid_column_product)}
                          to={`/seller/products/${product.id}`}
                          type={buttonTypes.TEXT.NEUTRAL}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt={product.name}
                            className={styles.HistoryOrders_grid_column_product_image}
                            height={60}
                            src={product.image}
                            width={60}
                          />
                          <Text>
                            {product.name}  
                          </Text>
                        </ButtonLink>

                        <div className={styles.HistoryOrders_grid_column}>
                          {buyer.name}
                        </div>

                        <div className={styles.HistoryOrders_grid_column}>
                          {quantity}
                        </div>

                        <div className={cn(styles.HistoryOrders_grid_column,
                          styles.HistoryOrders_grid_column_customization
                        )}>
                          {customization}
                        </div>

                        <Button
                          className={styles.HistoryOrders_grid_column}
                          icon={
                            (() => {
                              if (status === 'Delivered') {
                                return 'check';
                              } 

                              return 'close';
                            })()
                          }
                          type={
                            (() => {
              
                               if (status === 'Delivered') {
                                return buttonTypes.TEXT.GREEN;
                              } 
                                return buttonTypes.TEXT.RED;
                            })()
                          }
                          onClick={() => {
                            if (status === 'Cancelled') {
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
                        className={styles.HistoryOrders_grid_orderGrid}
                      >
                        <summary className={styles.HistoryOrders_grid_title}>
                          <div className={styles.HistoryOrders_grid_title_info}>
                            <Icon
                              className={styles.HistoryOrders_grid_title_icon}
                              icon="expand_more"
                            />

                            <Text type={textTypes.HEADING.XS}>
                              {dateOrdered} {product.name}
                            </Text>
                          </div>
                        </summary>

                        <div className={styles.HistoryOrders_grid_column}>
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
                className={styles.HistoryOrders_noResults}
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
export default HistoryOrders;

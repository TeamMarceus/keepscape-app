import React, { useState } from 'react';

import cn from 'classnames';

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
  Text 
} from '@/components';

import { useWindowSize } from '@/hooks';

import DeliveryDetailsModal from './DeliveryDetailsModal';

import PreloaderPendingOrders from './Preloader';
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
    status: 'On Going',
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
    status: 'Pending',
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

function PendingOrders() {
  const { windowSize } = useWindowSize();
  const isOrdersLoading = false;
  const [search, setSearch] = useState('');
  const [isDeliveryDetailsModalOpen, setIsDeliveryDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const [filteredOrders, setFilteredOrders] = useState(
    orders.filter(({ buyer, product }) => {
      const buyerName = buyer.name.toLowerCase();
      const productName = product.name.toLowerCase();
      const searchValue = search.toLowerCase();

      return (
        buyerName.includes(searchValue) ||
        productName.includes(searchValue)
      );
    })
  );

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
          placeholder="You can search by Product Name or Buyer Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* <Card className={styles.PendingOrders_card} /> */}

        {isOrdersLoading ? (
          <PreloaderPendingOrders />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredOrders.length ? (
              <div className={styles.PendingOrders_grid}>
                {/* Header of OrderGrid starts here */}
                <Card
                  className={cn(
                    styles.PendingOrders_grid_orderGrid,
                    styles.PendingOrders_grid_headers
                  )}
                >
                  <div
                    className={cn(
                      styles.PendingOrders_grid_header,
                      styles.PendingOrders_grid_column
                    )}
                  >
                    Date Ordered
                  </div>

                  <div
                    className={cn(
                      styles.PendingOrders_grid_header,
                      styles.PendingOrders_grid_column
                    )}
                  >
                    Product
                  </div>

                  <div
                    className={cn(
                      styles.PendingOrders_grid_header,
                      styles.PendingOrders_grid_column
                    )}
                  >
                    Buyer
                  </div>

                  <div
                    className={cn(
                      styles.PendingOrders_grid_header,
                      styles.PendingOrders_grid_column
                    )}
                  >
                    Quantity
                  </div>

                  <div
                    className={cn(
                      styles.PendingOrders_grid_header,
                      styles.PendingOrders_grid_column
                    )}
                  >
                    Customization
                  </div>

                  <div
                    className={cn(
                      styles.PendingOrders_grid_header,
                      styles.PendingOrders_grid_column,
                      styles.PendingOrders_grid_header_action
                    )}
                  >
                    Actions
                  </div>

                  
                  {/* Header of OrderGrid ends here */}
                </Card>

                {/* Body of OrderGrid starts here */}
                {filteredOrders.map(
                  ({ id, dateOrdered, product, buyer, quantity, customization }) =>
                    windowSize.width > 767 ? (
                      // Desktop View
                      <Card key={id} className={styles.PendingOrders_grid_orderGrid}>
                        <div className={styles.PendingOrders_grid_column}>
                          {dateOrdered}
                        </div>

                        <ButtonLink 
                          className={cn(styles.PendingOrders_grid_column,
                            styles.PendingOrders_grid_column_product)}
                          to={`/seller/products/${product.id}`}
                          type={buttonTypes.TEXT.NEUTRAL}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt={product.name}
                            className={styles.PendingOrders_grid_column_product_image}
                            height={60}
                            src={product.image}
                            width={60}
                          />
                          <Text>
                            {product.name}  
                          </Text>
                        </ButtonLink>

                        <div className={styles.PendingOrders_grid_column}>
                          {buyer.name}
                        </div>

                        <div className={styles.PendingOrders_grid_column}>
                          {quantity}
                        </div>

                        <div className={cn(styles.PendingOrders_grid_column,
                          styles.PendingOrders_grid_column_customization
                        )}>
                          {customization}
                        </div>

                        <div className={styles.PendingOrders_grid_column}>
                          <div className={styles.PendingOrders_grid_buttons}>
                            {/* <Button
                              className={styles.PendingOrders_grid_viewDetails}
                              type={buttonTypes.TEXT.BLUE}
                              onClick={() => {
                                setSelectedOrder({ id, product, buyer });
                                setIsDeliveryDetailsModalOpen(true);
                              }}
                            >
                              View Details
                            </Button>

                            <Button
                              className={styles.PendingOrders_grid_setOnGoing}
                              type={buttonTypes.TEXT.GREEN}
                              onClick={() => {}}
                            >
                              Set Ongoing
                            </Button>

                            <Button
                              className={styles.PendingOrders_grid_rejectOrder}
                              type={buttonTypes.TEXT.RED}
                              onClick={() => {
                                setFilteredOrders(
                                  filteredOrders.filter(
                                    (order) => order.id !== id
                                  )
                                );
                              }}
                            >
                              Reject Order
                            </Button> */}

                            <IconButton
                              className={styles.PendingOrders_grid_viewButton}
                              icon="visibility"
                              type={iconButtonTypes.ICON.MD}
                              onClick={() => {
                                setSelectedOrder({ id, product, buyer });
                                setIsDeliveryDetailsModalOpen(true);
                              }}
                            />

                            <IconButton
                              className={styles.PendingOrders_grid_setOnGoing}
                              icon="check_circle"
                              type={iconButtonTypes.ICON.MD}
                              onClick={() => {}}
                            />

                            <IconButton
                              className={styles.PendingOrders_grid_deleteButton}
                              icon="highlight_off"
                              type={iconButtonTypes.ICON.MD}
                              onClick={() => {
                                setFilteredOrders(
                                  filteredOrders.filter(
                                    (order) => order.id !== id
                                  )
                                );
                              }}
                            />
                          </div>
                      </div>
                      </Card>
                    ) : (
                      // Mobile View
                      <details
                        key={id}
                        className={styles.PendingOrders_grid_orderGrid}
                      >
                        <summary className={styles.PendingOrders_grid_title}>
                          <div className={styles.PendingOrders_grid_title_info}>
                            <Icon
                              className={styles.PendingOrders_grid_title_icon}
                              icon="expand_more"
                            />

                            <Text type={textTypes.HEADING.XS}>
                              {dateOrdered} {product.name}
                            </Text>
                          </div>
                        </summary>

                        <div className={styles.PendingOrders_grid_column}>
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
                className={styles.PendingOrders_noResults}
                message="No orders found"
              />
            )}
          </>
        )}

      </div>
      {isDeliveryDetailsModalOpen &&
        <DeliveryDetailsModal
          deliveryDetails={selectedOrder.buyer.deliveryDetails}
          handleClose={() => setIsDeliveryDetailsModalOpen(false)}
          isOpen={isDeliveryDetailsModalOpen}
          title={`${selectedOrder.product.name} Delivery Details`}
        />
      }
    </>
)
}
export default PendingOrders;

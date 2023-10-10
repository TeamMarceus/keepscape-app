import React, { useState } from 'react';

import cn from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  buttonTypes,
  colorClasses,
  iconButtonTypes,
  textTypes,
} from '@/app-globals';

import { 
  IconButton, 
  ButtonLink, 
  Card, 
  ControlledInput, 
  Icon, 
  NoResults, 
  Text, 
  IconLink
} from '@/components';

import { useWindowSize } from '@/hooks';

import PreloaderProducts from '../Preloader';

import styles from './styles.module.scss';

const products = [
  {
    id: '1',
    dateCreated: '2021-08-01',
    name: 'Butanding Keychain',
    quantity: 1,
    images: [
      'https://picsum.photos/200',
      'https://picsum.photos/300',
      'https://picsum.photos/400',
      'https://picsum.photos/300',
      'https://picsum.photos/300',
    ],
    totalSold: 10,
  },
  {
    id: '2',
    dateCreated: '2021-08-01',
    name: 'Butanding Keychain',
    quantity: 1,
    images: [
      'https://picsum.photos/200',
      'https://picsum.photos/300',
      'https://picsum.photos/400',
      'https://picsum.photos/400',
      'https://picsum.photos/400',
    ],
    totalSold: 10,
  },
  {
    id: '3',
    dateCreated: '2021-08-01',
    name: 'Dolphin Keychain',
    quantity: 1,
    images: [
      'https://picsum.photos/200',
      'https://picsum.photos/300',
      'https://picsum.photos/400',
      'https://picsum.photos/400',
      'https://picsum.photos/400',
    ],
    totalSold: 10,
  },
];

const sliderSettings = {
  lazyLoad: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

function HiddenProducts() {
  const { windowSize } = useWindowSize();
  const isProductsLoading = false;
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState({});

  const filteredProducts = products.filter((product) => {
    const { name } = product;

    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className={styles.HiddenProducts}>
      <Text type={textTypes.HEADING.XS}>
        Hidden Products
      </Text>

      <ControlledInput
        className={styles.HiddenProducts_search}
        icon="search"
        name="search"
        placeholder="You can search by Product Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isProductsLoading ? (
        <PreloaderProducts />
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {filteredProducts.length ? (
            <div className={styles.HiddenProducts_grid}>
              {/* Header of OrderGrid starts here */}
              <Card
                className={cn(
                  styles.HiddenProducts_grid_productGrid,
                  styles.HiddenProducts_grid_headers
                )}
              >
                <div
                  className={cn(
                    styles.HiddenProducts_grid_header,
                    styles.HiddenProducts_grid_column
                  )}
                >
                  Date Created
                </div>

                <div
                  className={cn(
                    styles.HiddenProducts_grid_header,
                    styles.HiddenProducts_grid_column
                  )}
                >
                  Product Name
                </div>

                <div
                  className={cn(
                    styles.HiddenProducts_grid_header,
                    styles.HiddenProducts_grid_column
                  )}
                >
                  Quantity
                </div>

                <div
                  className={cn(
                    styles.HiddenProducts_grid_header,
                    styles.HiddenProducts_grid_column
                  )}
                >
                  Images
                </div>

                <div
                  className={cn(
                    styles.HiddenProducts_grid_header,
                    styles.HiddenProducts_grid_column
                  )}
                >
                  Total Sold
                </div>

                <div
                  className={cn(
                    styles.HiddenProducts_grid_header,
                    styles.HiddenProducts_grid_column,
                    styles.HiddenProducts_grid_header_action
                  )}
                >
                  Actions
                </div>

                
                {/* Header of OrderGrid ends here */}
              </Card>

              {/* Body of OrderGrid starts here */}
              {filteredProducts.map(
                ({ id, dateCreated, name, quantity, images, totalSold  }) =>
                  windowSize.width > 767 ? (
                    // Desktop View
                    <Card key={id} className={styles.HiddenProducts_grid_productGrid}>
                      <div className={styles.HiddenProducts_grid_column}>
                        {dateCreated}
                      </div>

                      <ButtonLink
                        to={`/seller/products/${id}`}
                        type={buttonTypes.TEXT.NEUTRAL}
                      >
                        <div className={styles.MyProducts_grid_column}>
                          {name}
                        </div>
                      </ButtonLink>

                      <div className={styles.HiddenProducts_grid_column}>
                        {quantity}
                      </div>

                      <div className={cn(styles.HiddenProducts_grid_column,
                        styles.HiddenProducts_grid_column_images
                      )}>
                         <Slider {...sliderSettings}>
                          {images.map((image, index) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={index}
                              alt="Product"
                              className={styles.HiddenProducts_grid_image}
                              height={50}
                              src={image}
                              width={50}
                            />
                          ))}  
                         </Slider>
                      </div>

                      <div className={styles.HiddenProducts_grid_column}>
                        {totalSold}
                      </div>

                      <div className={styles.HiddenProducts_grid_column}>
                        <div className={styles.HiddenProducts_grid_buttons}>
                          <IconButton
                            className={styles.HiddenProducts_grid_unhideButton}
                            icon="visibility"
                            type={iconButtonTypes.ICON.MD}
                            onClick={() => {
                              setSelectedProduct({ id, name });
                            }}
                          />
                        
                          <IconButton
                            className={styles.HiddenProducts_grid_deleteButton}
                            icon="delete"
                            type={iconButtonTypes.ICON.MD}
                            onClick={() => {
                              setSelectedProduct({ id, name });
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  ) : (
                    // Mobile View
                    <details
                      key={id}
                      className={styles.HiddenProducts_grid_productGrid}
                    >
                      <summary className={styles.HiddenProducts_grid_title}>
                        <div className={styles.HiddenProducts_grid_title_info}>
                          <Icon
                            className={styles.HiddenProducts_grid_title_icon}
                            icon="expand_more"
                          />

                          <Text type={textTypes.HEADING.XS}>
                            {dateCreated} {name}
                          </Text>
                        </div>
                      </summary>

                      <div className={styles.HiddenProducts_grid_column}>
                        <Text
                          colorClass={colorClasses.NEUTRAL['400']}
                          type={textTypes.HEADING.XXS}
                        >
                          Buyer Name:
                        </Text>

                        <Text type={textTypes.HEADING.XXS}>{name}</Text>
                      </div>
                    </details>
                  )
              )}
              {/* Body of OrderGrid ends here */}
            </div>
          ) : (
            <NoResults
              className={styles.HiddenProducts_noResults}
              message="No products found"
            />
          )}
        </>
      )}

    </div>
  )
}
export default HiddenProducts;

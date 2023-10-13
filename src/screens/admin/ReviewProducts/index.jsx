import React, { useState } from 'react';

import cn from 'classnames';
import { useSearchParams } from 'next/navigation';
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

import PreloaderProducts from './Preloader';

import styles from './styles.module.scss';

const products = [
  {
    id: '1111-e89b-12d3-a456-426614174000',
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
    sellerId: 'a23e4567-e89b-12d3-a456-426614174000',
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
    sellerId: '123e4567-e89b-12d3-a456-426614174000'
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
    sellerId: '123e4567-e89b-12d3-a456-426614174000'
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

function ReviewProducts() {
  const { windowSize } = useWindowSize();
  const isProductsLoading = false;
  const searchParams = useSearchParams();
  const productIdParam = searchParams.get('id');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState({});

  const filteredProducts = products.filter((product) => {
    const { name } = product;

    if (productIdParam && search === '') {
      return product.id === productIdParam;
    }

    return name.toLowerCase().includes(search.toLowerCase()) ||
      product.sellerId.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className={styles.ReviewProducts}>
      <Text type={textTypes.HEADING.XS}>
        Review Products
      </Text>

      <ControlledInput
        className={styles.ReviewProducts_search}
        icon="search"
        name="search"
        placeholder="You can search by Product Name or Seller ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isProductsLoading ? (
        <PreloaderProducts />
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {filteredProducts.length ? (
            <div className={styles.ReviewProducts_grid}>
              {/* Header of OrderGrid starts here */}
              <Card
                className={cn(
                  styles.ReviewProducts_grid_productGrid,
                  styles.ReviewProducts_grid_headers
                )}
              >
                <div
                  className={cn(
                    styles.ReviewProducts_grid_header,
                    styles.ReviewProducts_grid_column
                  )}
                >
                  Date Created
                </div>

                <div
                  className={cn(
                    styles.ReviewProducts_grid_header,
                    styles.ReviewProducts_grid_column
                  )}
                >
                  Product Name
                </div>

                <div
                  className={cn(
                    styles.ReviewProducts_grid_header,
                    styles.ReviewProducts_grid_column
                  )}
                >
                  Quantity
                </div>

                <div
                  className={cn(
                    styles.ReviewProducts_grid_header,
                    styles.ReviewProducts_grid_column
                  )}
                >
                  Images
                </div>

                <div
                  className={cn(
                    styles.ReviewProducts_grid_header,
                    styles.ReviewProducts_grid_column
                  )}
                >
                  Total Sold
                </div>

                <div
                  className={cn(
                    styles.ReviewProducts_grid_header,
                    styles.ReviewProducts_grid_column
                  )}
                >
                  Seller ID
                </div>

                <div
                  className={cn(
                    styles.ReviewProducts_grid_header,
                    styles.ReviewProducts_grid_column,
                    styles.ReviewProducts_grid_header_action
                  )}
                >
                  Actions
                </div>

                {/* Header of OrderGrid ends here */}
              </Card>

              {/* Body of OrderGrid starts here */}
              {filteredProducts.map(
                ({ id, dateCreated, name, quantity, images, totalSold, sellerId  }) =>
                  windowSize.width > 767 ? (
                    // Desktop View
                    <Card key={id} className={styles.ReviewProducts_grid_productGrid}>
                      <div className={styles.ReviewProducts_grid_column}>
                        {dateCreated}
                      </div>

                      <div className={styles.ReviewProducts_grid_column}>
                        {name}
                      </div>
        
                      <div className={styles.ReviewProducts_grid_column}>
                        {quantity}
                      </div>

                      <div className={cn(styles.ReviewProducts_grid_column,
                        styles.ReviewProducts_grid_column_images
                      )}>
                         <Slider {...sliderSettings}>
                          {images.map((image, index) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={index}
                              alt="Product"
                              className={styles.ReviewProducts_grid_image}
                              height={50}
                              src={image}
                              width={50}
                            />
                          ))}  
                         </Slider>
                      </div>

                      <div className={styles.ReviewProducts_grid_column}>
                        {totalSold}
                      </div>

                      <ButtonLink
                        className={styles.ReviewProducts_grid_column}
                        to={`/admin/sellers?id=${sellerId}`}
                        type={buttonTypes.TEXT.NEUTRAL}
                      >
                        {sellerId}
                      </ButtonLink>

                      <div className={styles.ReviewProducts_grid_column}>
                        <IconButton
                          className={styles.ReviewProducts_grid_deleteButton}
                          icon="delete"
                          type={iconButtonTypes.ICON.MD}
                          onClick={() => {
                            setSelectedProduct({ id, name });
                          }}
                        />
                      </div>
                    </Card>
                  ) : (
                    // Mobile View
                    <details
                      key={id}
                      className={styles.ReviewProducts_grid_productGrid}
                    >
                      <summary className={styles.ReviewProducts_grid_title}>
                        <div className={styles.ReviewProducts_grid_title_info}>
                          <Icon
                            className={styles.ReviewProducts_grid_title_icon}
                            icon="expand_more"
                          />

                          <Text type={textTypes.HEADING.XS}>
                            {dateCreated} {name}
                          </Text>
                        </div>
                      </summary>

                      <div className={styles.ReviewProducts_grid_column}>
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
              className={styles.ReviewProducts_noResults}
              message="No products found"
            />
          )}
        </>
      )}

    </div>
  )
}
export default ReviewProducts;

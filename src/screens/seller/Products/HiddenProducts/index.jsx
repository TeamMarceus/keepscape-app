import React, { useState } from 'react';

import cn from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Pagination,
  IconLink,
  ConfirmModal
} from '@/components';

import { useSellerProducts, useWindowSize } from '@/hooks';

import PreloaderProducts from '../Preloader';


import styles from './styles.module.scss';


const sliderSettings = {
  lazyLoad: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

function HiddenProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteConfirmationToggled, toggleDeleteConfirmation] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const {
    isLoading: isProductsLoading, 
    products,
    totalPages,
    isDeleting,
    deleteProduct 
  } = useSellerProducts({ 
    search, 
    isHidden: true, 
    page,
    pageSize: 10 
  });

  const filteredProducts = products.filter((product) => {
    const { name } = product;

    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
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
              <>
                <div className={styles.HiddenProducts_grid}>
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
                      Image
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
                      Price
                    </div>

                    <div
                      className={cn(
                        styles.HiddenProducts_grid_header,
                        styles.HiddenProducts_grid_column
                      )}
                    >
                      Rating
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

                  </Card>
                  {filteredProducts.map(
                    ({ id, dateTimeCreated, images, name, quantity, price, totalSold, stars  }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.HiddenProducts_grid_productGrid}>
                          <div className={styles.HiddenProducts_grid_column}>
                            {dateTimeCreated.split('T')[0]}
                          </div>

                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img
                            alt={name}
                            className={styles.HiddenProducts_grid_column}
                            height={60}
                            src={images[0]}
                            width={60}
                          />


                          <div className={styles.HiddenProducts_grid_column}>
                            {name}
                          </div>
      
                          <div className={styles.HiddenProducts_grid_column}>
                            {quantity}
                          </div>

                          <div className={styles.HiddenProducts_grid_column}>
                            ₱{price.toLocaleString()}
                          </div>
                      
                          <div className={styles.HiddenProducts_grid_column}>
                            {stars}
                          </div>

                          <div className={styles.HiddenProducts_grid_column}>
                            {totalSold}
                          </div>

                          <div className={styles.HiddenProducts_grid_column}>
                            <div className={styles.HiddenProducts_grid_buttons}>
                              <IconLink
                                className={styles.HiddenProducts_grid_viewButton}
                                icon="visibility"
                                to={`/seller/products/${id}`}
                                type={iconButtonTypes.ICON.MD}
                              />

                              <IconLink
                                className={styles.HiddenProducts_grid_editButton}
                                icon="edit"
                                to={`/seller/products/${id}/update`}
                                type={iconButtonTypes.ICON.MD}
                              />

                              <IconButton
                                className={styles.HiddenProducts_grid_deleteButton}
                                icon="delete"
                                type={iconButtonTypes.ICON.MD}
                                onClick={() => {
                                  setSelectedProduct({ id, name });
                                  toggleDeleteConfirmation(true);
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
                                {dateTimeCreated} {name}
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
                </div>

                <Pagination 
                  className={styles.HiddenProducts_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);

                    router.push(`/seller/hidden?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.HiddenProducts_noResults}
                message="No products found"
              />
            )}
          </>
        )}

      </div>

      <ConfirmModal
        actions={[
          {
            id: 'deleteProductConfirmButton',
            text: 'Delete',
            type: buttonTypes.PRIMARY.BLUE,
            onClick: async () => {
              await deleteProduct(selectedProduct.id);
              toggleDeleteConfirmation(false);
            },
            disabled: isDeleting,
          },
          {
            id: 'deleteProductConfirmButton',
            text: 'Back',
            type: buttonTypes.SECONDARY.BLUE,
            onClick: () => toggleDeleteConfirmation(false),
          },
        ]}
        body="Are you sure you want to delete this product?"
        handleClose={() => {
          toggleDeleteConfirmation(false);
        }}
        isOpen={isDeleteConfirmationToggled}
        title="Delete?"
      />
    </>
  )
}
export default HiddenProducts;

import React, { useState } from 'react';

import cn from 'classnames';
import { useSearchParams , useRouter } from 'next/navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  buttonTypes,
  colorClasses,
  colorNames,
  iconButtonTypes,
  spinnerSizes,
  textTypes,
} from '@/app-globals';

import { 
  IconButton,  
  Card, 
  ControlledInput, 
  Icon, 
  NoResults, 
  Text, 
  Button,
  Pagination,
  ConfirmModal,
  Spinner
} from '@/components';

import { useReportedProducts, useWindowSize } from '@/hooks';


import SellerModal from '../CommonModals/SellerModal';

import PreloaderProducts from './Preloader';
import ProductReportsModal from './ProductReportsModal';


import styles from './styles.module.scss';

const sliderSettings = {
  lazyLoad: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function ReviewProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const productIdParam = searchParams.get('id');
  const page = searchParams.get('page') || 1;

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isProductReportsModalOpen, setIsProductReportsModalOpen] = useState(false);
  const [isDeleteConfirmationToggled, toggleDeleteConfirmation] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState({});

  const {
    isLoading: isReportedProductsLoading, 
    isDeletingLoading,
    isResolvingLoading,
    reportedProducts,
    deleteProduct,
    resolveProductReports,
    totalPages
  } = useReportedProducts({page, pageSize: 10});

  if (isReportedProductsLoading) return;

  const filteredProducts = reportedProducts.filter((product) => {

    if (productIdParam && search === '') {
      return product.id === productIdParam;
    }

    return product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sellerUserId.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
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

        {isReportedProductsLoading ? (
          <PreloaderProducts />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredProducts.length ? (
              <>
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
                      Date Reported
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
                      Total Reports
                    </div>

                    <div
                      className={cn(
                        styles.ReviewProducts_grid_header,
                        styles.ReviewProducts_grid_column
                      )}
                    >
                      Seller
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
                    ({ id, dateTimeCreated, name, quantity, imageUrls, totalSold, totalReports, sellerUserId  }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.ReviewProducts_grid_productGrid}>
                          <div className={styles.ReviewProducts_grid_column}>
                            {dateTimeCreated.split('T')[0]}
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
                              {imageUrls.map((image, index) => (
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

                          <Button
                            className={styles.ReviewProducts_grid_column}
                            type={buttonTypes.TEXT.BLUE}
                            onClick={() => {
                              setSelectedProduct({ id, name });
                              setIsProductReportsModalOpen(true);
                            }}
                          >
                            {totalReports}
                          </Button>
                          
                          <IconButton
                            className={cn(styles.ReviewProducts_grid_column, styles.ReviewProducts_grid_column_link)}
                            icon="storefront"
                            type={iconButtonTypes.OUTLINE.MD}
                            onClick={() => {
                              setSelectedProduct({ sellerUserId, name});
                              setIsSellerModalOpen(true);
                            }}
                          />

                          <div className={styles.ReviewProducts_grid_column}>
                            {!isResolvingLoading &&
                              <div className={styles.ReviewProducts_grid_buttons}>
                                <IconButton
                                  className={styles.ReviewProducts_grid_resolveButton}
                                  icon="check_circle_outline"
                                  type={iconButtonTypes.ICON.MD}
                                  onClick={ async () => {
                                    setSelectedProduct({ id });
                                    await resolveProductReports(id);
                                  }}
                                />

                                <IconButton
                                  className={styles.ReviewProducts_grid_deleteButton}
                                  icon="delete"
                                  type={iconButtonTypes.ICON.MD}
                                  onClick={() => {
                                    setSelectedProduct({ id });
                                    toggleDeleteConfirmation(true);
                                  }}
                                  />
                              </div>
                            }
                            {(isResolvingLoading && selectedProduct.id === id) &&
                              <Spinner
                                className={styles.ReviewProducts_grid_buttons_spinner}
                                colorName={colorNames.BLUE}
                                size={spinnerSizes.MD}
                              />
                            }
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
                                {dateTimeCreated.split('T')[0]} {name}
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

                <Pagination 
                  className={styles.ReviewProducts_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);
                    router.push(`/admin/review-products?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.ReviewProducts_noResults}
                message="No products found"
              />
            )}
          </>
        )}
      </div>

      {isProductReportsModalOpen && (
        <ProductReportsModal
          handleClose={() => setIsProductReportsModalOpen(false)}
          isOpen={isProductReportsModalOpen}
          productId={selectedProduct.id}
          title={`${selectedProduct.name} Reports`}
        />
      )}

      {isSellerModalOpen && (
        <SellerModal
          handleClose={() => setIsSellerModalOpen(false)}
          isOpen={isSellerModalOpen}
          sellerId={selectedProduct.sellerUserId}
          title={`${selectedProduct.name} Seller`}
        />
      )}

      <ConfirmModal
        actions={[
          {
            id: 'deleteProductConfirmButton',
            text: 'Delete',
            type: buttonTypes.PRIMARY.RED,
            onClick: async () => {
              await deleteProduct(selectedProduct.id);
              toggleDeleteConfirmation(false);
            },
            disabled: isDeletingLoading,
          },
          {
            id: 'deleteProductConfirmButton',
            text: 'Back',
            type: buttonTypes.SECONDARY.RED,
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
export default ReviewProducts;

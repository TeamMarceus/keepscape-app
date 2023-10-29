import React, { useEffect, useState } from 'react'

import cn from 'classnames';
import { useSearchParams, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { colorClasses, textTypes } from '@/app-globals';
import { Filters, NoResults, Pagination, Preloader, Text } from '@/components'
import ProductCard from '@/components/ProductCard';
import { getUser } from '@/ducks';

import { useProductCategories, useProducts } from '@/hooks';

import styles from './styles.module.scss'

function Province({ province }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  const categoryParams = searchParams.getAll('category');
  const ratings = newSearchParams.get('ratings');
  const minimumPriceParam = newSearchParams.get('minimumPrice');
  const maximumPriceParam = newSearchParams.get('maximumPrice');

  const user = useSelector(getUser);

  const page = searchParams.get('page') || 1;

  const[currentPage, setCurrentPage] = useState(1);
  const [allCategories, setAllCategories] = useState([]);

  const {
    isLoading: isProductCategoriesLoading, 
    productCategories
  } = useProductCategories();

  useEffect(() => {
    if (!isProductCategoriesLoading) {
      const categories = productCategories.map((category) => ({
        ...category,
        isChecked: categoryParams.includes(category.name),
        label: category.name
      }));

      setAllCategories(categories);
    }
  }, [searchParams, isProductCategoriesLoading]);

  const {
    isLoading: isProductsLoading, 
    products, 
    totalPages 
  } = useProducts({ 
    page, 
    pageSize: 15,
    isHidden: false ,
    categories: categoryParams.length > 0 ? 
      categoryParams.map((category) => `${decodeURI(category)}`) : null,
    provinces: [decodeURI(province)],
    rating: ratings,
    minPrice: minimumPriceParam,
    maxPrice: maximumPriceParam
  });

  return (
    <div className={styles.Province}>
      <div className={styles.Province_banner}>
        <Text 
          className={styles.Province_banner_text}
          colorClass={colorClasses.NEUTRAL['0']}
          type={textTypes.HEADING.XXL}
        >
          {decodeURI(province.toUpperCase())}
        </Text>
      </div>

      <div className={styles.Province_content}>
        {!isProductCategoriesLoading &&
          <Filters 
            hasPriceRange
            hasRatings
            checkboxes={allCategories}
            className={styles.Province_filters}
            icon="menu"
            province={province}
            route={`/keepscape/province/${province}`}
            title="All Products"
            type="By Category"
          />
        }

        {isProductsLoading ? (
          <Preloader />
        ) : (
          <div className={cn(styles.Province_products, {
            [styles.Province_products_empty]: products.length === 0
          })}>
            {products.length > 0 ?
              <>
                <div className={styles.Province_products_list}>
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      isClickable
                      className={styles.Province_products_item}
                      id={product.id}
                      image={product.imageUrl}
                      name={product.name}
                      place={product.province.name}
                      price={product.price}
                      rating={product.stars}
                      userId={user?.id}
                    />
                  ))}
                </div>

                <Pagination 
                  className={styles.Province_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);

                    newSearchParams.delete('page');
                    newSearchParams.append('page', value);
                    router.push(`/keepscape/province/${province}?${newSearchParams.toString()}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
              :
              <NoResults 
              className={styles.Province_noResults}
              message="No products found"
              />
            } 
          </div>
        )}

      </div>
    </div>
  )
}

Province.propTypes = {
  province: PropTypes.string.isRequired,
}

export default Province
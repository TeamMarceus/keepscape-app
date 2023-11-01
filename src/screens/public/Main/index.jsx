import React, { useEffect, useState } from 'react'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Souvenir1 from '%/images/Beaches/souvenir1.png';
import Souvenir2 from '%/images/Beaches/souvenir2.png';
import { colorClasses, textTypes, userTypes } from '@/app-globals';
import { Button, CardImage, Preloader, Text } from '@/components'
import ProductCard from '@/components/ProductCard';
import { getUser } from '@/ducks';

import { useBuyerSuggestions, useProductCategories, useProducts, useWindowSize } from '@/hooks';

import { beaches } from '../constants/beaches';
import { categories } from '../constants/categories';
import { provinces } from '../constants/provinces';

import styles from './styles.module.scss'

const bannerSliderSettings = {
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Main() {
  const router = useRouter();
  const { windowSize } = useWindowSize();
  const user = useSelector((store) => getUser(store));
  const [page, setPage] = useState(1);

  let isSuggestionsLoading = false;
  let suggestions;

  if (user.id && user.userType === userTypes.BUYER) {
    const {
      isLoading,
      buyerSuggestions
    } = useBuyerSuggestions();
    
    isSuggestionsLoading = isLoading;
    suggestions = buyerSuggestions;
  }

  const {
    isLoading: isDiscoverProductsLoading, 
    products: disoverProducts, 
    totalPages 
  } = useProducts({ page, pageSize: 12, isHidden: false });

  const {
    isLoading: isProductCategoriesLoading, 
    productCategories
  } = useProductCategories();

  let slidesToShow = null;
  if (windowSize.width >= 991 && windowSize.width < 1199) {
    slidesToShow = 4;
  } else if (windowSize.width >= 767 && windowSize.width < 991) {
    slidesToShow = 3;
  } else if (windowSize.width >= 575 && windowSize.width < 767) {
    slidesToShow = 2;
  } else if (windowSize.width < 575) {
    slidesToShow = 1;
  } else {
    slidesToShow = 4;
  }
 
  const productSliderSettings = {
    lazyLoad: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.Main}>
      <div className={styles.Main_banner}>
        <div className={styles.Main_banner_slider}>
          <Slider {...bannerSliderSettings}>
            {beaches.map((beach) => (
              <div key={beach.name} className={styles.Main_banner_image}>
                <Image
                  priority
                  alt={beach.name}
                  height={254}
                  src={beach.image}
                  width={750}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className={styles.Main_banner_right}>
          <Image
            priority
            alt="Souvenir"
            className={styles.Main_banner_right_image}
            height={125}
            src={Souvenir1}
            width={460}
          />
          <Image
            priority
            alt="Souvenir"
            className={styles.Main_banner_right_image}
            height={125}
            src={Souvenir2}
            width={460}
          />
        </div>
      </div>

      {user.id && (
        isSuggestionsLoading ? (
          <Preloader />
        ) : (
          <>
            <Text
                className={styles.Main_suggestions_title}  
                colorClass={colorClasses.NEUTRAL['0']}
                type={textTypes.HEADING.XS}
              >
                Based on your profile, you might be interested in these suggestions...
            </Text>

            <div className={styles.Main_suggestions} id="preferences">
              {suggestions.map((item, index) => (
                <div key={index} className={styles.Main_suggestions_item}>
                  <div className={styles.Main_suggestions_item_text}>
                    <Text
                      className={styles.Main_suggestions_item_name}
                      type={textTypes.HEADING.SM}
                    >
                      {item.category}
                    </Text>

                    <Text
                      className={styles.Main_suggestions_item_description}
                      type={textTypes.BODY.LG}
                    >
                      {item.description}
                    </Text>
                  </div>

                  <div 
                  className={
                      item.products.length !== 0 ? 
                      styles.Main_suggestions_item_products :
                      styles.Main_suggestions_item_productsEmpty
                    }
                  >
                    {
                    item.products.length !== 0 ? 
                      (
                        <Slider {...productSliderSettings}>
                          {item.products.map((product) => (
                            <ProductCard
                              key={index}
                              isClickable
                              className={styles.Main_suggestions_item_product}
                              id={product.id}
                              image={product.imageUrl}
                              name={product.name}
                              place={product.province.name}
                              price={product.price}
                              rating={product.stars}
                              userId={user?.id}
                            />
                          ))}
                        </Slider>
                      ) : (
                        <Text
                          colorClass={colorClasses.NEUTRAL['600']}  
                          type={textTypes.HEADING.SM}
                        >
                            No specific products available
                        </Text>
                      )
                    }
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      )}

      <div className={styles.Main_provinces} id="province">
        <Text
          className={styles.Main_provinces_title}  
          colorClass={colorClasses.NEUTRAL['600']}
          type={textTypes.HEADING.XS}
        >
           PROVINCES
        </Text>
        
        <div className={styles.Main_provinces_list}>
          {provinces.map((province, index) => (
            <CardImage
              key={index}
              isClickable
              className={styles.Main_provinces_item}
              image={province.image}
              imageHeight={180}
              imageWidth={180}
              name={province.name}
              onClick={() => 
                router.push(`/keepscape/province/${province.name}`)
              }
            />
          ))}
        </div>
      </div>

      <div className={styles.Main_categories} id="category">
        <Text
            className={styles.Main_provinces_title}  
            colorClass={colorClasses.NEUTRAL['600']}
            type={textTypes.HEADING.XS}
          >
           CATEGORIES
        </Text>

        {isProductCategoriesLoading ? (
          <Preloader />
          ) : (
          <div className={styles.Main_categories_list}>
            <Slider {...productSliderSettings}>
              {productCategories.map((category) => (
                <CardImage
                  key={category.id}
                  isClickable
                  className={styles.Main_categories_item}
                  imageHeight={180}
                  imageString={category.imageUrl}
                  imageWidth={180}
                  name={category.name}
                  onClick={() => 
                    router.push(`/keepscape/category/${category.name}`)
                  }
                />
              ))}
            </Slider>
          </div>
        )}
      </div>

      <div className={styles.Main_discover} id="discover">
        <div className={styles.Main_discover_banner}>
          <Text
            colorClass={colorClasses.BLUE['400']}
            type={textTypes.HEADING.XXS}
          >
            DAILY DISCOVER
          </Text>
        </div>
        
        {isDiscoverProductsLoading ? (
          <Preloader />
        ) : (
          <div className={styles.Main_discover_products}>
            {disoverProducts.length > 0 && disoverProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  isClickable
                  className={styles.Main_discover_products_item}
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
        )}

        { totalPages > 1 &&
          <Button
            className={styles.Main_discover_button}
            disabled={isDiscoverProductsLoading || page === totalPages}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            See More
          </Button>
        }
      </div>
    </div>
  )
}

export default Main
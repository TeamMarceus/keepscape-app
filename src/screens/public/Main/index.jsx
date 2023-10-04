import React from 'react'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Souvenir1 from '%/images/Beaches/souvenir1.png';
import Souvenir2 from '%/images/Beaches/souvenir2.png';
import { colorClasses, textTypes } from '@/app-globals';
import { Button, CardImage, Text } from '@/components'
import ProductCard from '@/components/ProductCard';
import { getUser } from '@/ducks';

import { beaches } from '../constants/beaches';
import { provinces } from '../constants/provinces';

import styles from './styles.module.scss'

const suggestions = [
  {
    title: 'item 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet.',
    products: [
      {
        id: 1,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/310',
        price: 100,
        rating: 4,
        place: 'Cebu, Oslob'
      },
      {
        id: 2,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/320',
        price: 100,
        rating: 5,
        place: 'Cebu, Oslob'
      },
      {
        id: 3,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/330',
        price: 100,
        rating: 3,
        place: 'Cebu, Oslob'
      },
      {
        id: 4,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/340',
        price: 100,
        rating: 2,
        place: 'Cebu, Oslob'
      },
      {
        id: 5,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/350',
        price: 100,
        rating: 1,
        place: 'Cebu, Oslob'
      },
      {
        id: 6,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/360',
        price: 100,
        rating: 4,
        place: 'Cebu, Oslob'
      },
      {
        id: 7,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/370',
        price: 100,
        rating: 4,
        place: 'Cebu, Oslob'
      },
      {
        id: 8,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/380',
        price: 100,
        rating: 4,
        place: 'Cebu, Oslob'
      },
    ]
  },
  {
    title: 'item 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet.',
    products: [
      {
        id: 9,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/310',
        price: 100,
        rating: 4,
        place: 'Cebu, Oslob'
      },
      {
        id: 12,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/320',
        price: 100,
        rating: 5,
        place: 'Cebu, Oslob'
      },
      {
        id: 13,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/330',
        price: 100,
        rating: 3,
        place: 'Cebu, Oslob'
      },
      {
        id: 14,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/340',
        price: 100,
        rating: 2,
        place: 'Cebu, Oslob'
      },
      {
        id: 15,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/350',
        price: 100,
        rating: 1,
        place: 'Cebu, Oslob'
      },
      {
        id: 16,
        name1: 'Butanding Keychain',
        image: 'https://picsum.photos/200/360',
        price: 100,
        rating: 4,
        place: 'Cebu, Oslob'
      },
      {
        id: 17,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/370',
        price: 100,
        rating: 4,
        place: 'Cebu, Oslob'
      },
      {
        id: 18,
        name: 'Butanding Keychain',
        image: 'https://picsum.photos/200/380',
        price: 100,
        rating: 4,
        place: 'Cebu, Oslob'
      },
    ]
  }
];

const categories = [
  {
    name: 'necklace',
    image: 'https://picsum.photos/210/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/220/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/230/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/240/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/250/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/260/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/270/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/280/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/290/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/210/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/200/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/200/300'
  },
  {
    name: 'necklace',
    image: 'https://picsum.photos/200/300'
  }
]

const products = [
  {
    id: 1,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/310',
    price: 100,
    rating: 4,
    place: 'Cebu, Oslob'
  },
  {
    id: 2,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/320',
    price: 100,
    rating: 5,
    place: 'Cebu, Oslob'
  },
  {
    id: 3,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/330',
    price: 100,
    rating: 3,
    place: 'Cebu, Oslob'
  },
  {
    id: 4,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/340',
    price: 100,
    rating: 2,
    place: 'Cebu, Oslob'
  },
  {
    id: 5,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/350',
    price: 100,
    rating: 1,
    place: 'Cebu, Oslob'
  },
  {
    id: 6,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/360',
    price: 100,
    rating: 4,
    place: 'Cebu, Oslob'
  },
  {
    id: 7,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/370',
    price: 100,
    rating: 4,
    place: 'Cebu, Oslob'
  },
  {
    id: 8,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/380',
    price: 100,
    rating: 4,
    place: 'Cebu, Oslob'
  },
]

const productSliderSettings = {
  lazyLoad: true,
  dots: false,
  infinite: false,
  speed: 100,
  slidesToShow: 5.5,
  slidesToScroll: 1,
};

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
  const user = useSelector((store) => getUser(store));

  
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

      {user.guid &&
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
                    {item.title}
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
                  {item.products.length !== 0 ? 
                    (
                      <Slider {...productSliderSettings}>
                       {item.products.map((product) => (
                          <ProductCard
                            key={product.id}
                            isClickable
                            className={styles.Main_suggestions_item_product}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            place={product.place}
                            price={product.price}
                            rating={product.rating}
                            userId={user?.guid}
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
      }

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
        
        <div className={styles.Main_categories_list}>
           <Slider {...productSliderSettings}>
            {categories.map((category, index) => (
              <CardImage
                key={index}
                isClickable
                className={styles.Main_categories_item}
                imageHeight={120}
                imageString={category.image}
                imageWidth={130}
                name={category.name}
                onClick={() => 
                    router.push(`/keepscape/category/${category.name}`)
                }
              />
            ))}
          </Slider>
        </div>
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

        <div className={styles.Main_discover_products}>
           {products.map((product, index) => (
              <ProductCard
                key={index}
                isClickable
                className={styles.Main_discover_products_item}
                id={product.id}
                image={product.image}
                name={product.name}
                place={product.place}
                price={product.price}
                rating={product.rating}
                userId={user?.guid}
              />
            ))}
        </div>  

        <Button
          className={styles.Main_discover_button}
          disabled={false}
          onClick={() => {}}
        >
          See More
        </Button> 
      </div>
    </div>
  )
}

export default Main
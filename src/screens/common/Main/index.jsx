import React from 'react'

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { colorClasses, textTypes } from '@/app-globals';
import { CardImage, Text } from '@/components'
import { getUser } from '@/ducks';

import styles from './styles.module.scss'

const suggestions = [
  {
    name: 'item 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet.',
    products: [
      {
        title: 'Product 1',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      },
      {
        title: 'Product 2',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      },
      {
        title: 'Product 3',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      },
      {
        title: 'Product 1',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      },
      {
        title: 'Product 2',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      },
      {
        title: 'Product 3',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      }
    ]
  },
  {
    name: 'item 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet.',
    products: [
      {
        title: 'Product 1',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      },
      {
        title: 'Product 2',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      },
      {
        title: 'Product 3',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      },
      {
        title: 'Product 1',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      },
      {
        title: 'Product 2',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      },
      {
        title: 'Product 3',
        price: 100,
        url: 'https://www.google.com',
        image: 'https://picsum.photos/200/300'
      }
    ]
  }
];

const categories = [
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

const places = [
  {
    name: 'Cebu',
    image: 'https://picsum.photos/200/300',
  },
  {
    name: 'Cebu',
    image: 'https://picsum.photos/200/300',
  },
  {
    name: 'Cebu',
    image: 'https://picsum.photos/200/300',
  },
  {
    name: 'Cebu',
    image: 'https://picsum.photos/200/300',
  },
  {
    name: 'Cebu',
    image: 'https://picsum.photos/200/300',
  },
  {
    name: 'Cebu',
    image: 'https://picsum.photos/200/300',
  },
  {
    name: 'Cebu',
    image: 'https://picsum.photos/200/300',
  },
  {
    name: 'Cebu',
    image: 'https://picsum.photos/200/300',
  }
]


function MainPage() {
  const router = useRouter();
  const user = useSelector((store) => getUser(store));

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 2000,
    lazyLoad: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  
  return (
    <div className={styles.MainPage}>
      {user.guid &&
        <>
          <Text
              className={styles.MainPage_suggestions_title}  
              colorClass={colorClasses.NEUTRAL['0']}
              type={textTypes.HEADING.XS}
            >
              Based on your profile, you might be interested in these suggestions...
          </Text>

          <div className={styles.MainPage_suggestions} id="preferences">
            {suggestions.map((item, index) => (
              <div key={index} className={styles.MainPage_suggestions_item}>
                <div className={styles.MainPage_suggestions_item_text}>
                  <Text
                    className={styles.MainPage_suggestions_item_name}
                    type={textTypes.HEADING.SM}
                  >
                    {item.name}
                  </Text>

                  <Text
                    className={styles.MainPage_suggestions_item_description}
                    type={textTypes.BODY.LG}
                  >
                    {item.description}
                  </Text>
                </div>

                <div 
                className={
                    item.products.length !== 0 ? 
                    styles.MainPage_suggestions_item_products :
                    styles.MainPage_suggestions_item_productsEmpty
                  }
                >
                  {item.products.length !== 0 ? 
                    (
                      <Slider {...sliderSettings}>
                       {item.products.map((product, productIndex) => (
                          <CardImage 
                            key={productIndex}
                            isClickable
                            className={styles.MainPage_suggestions_item_product}
                            imageHeight={180}
                            imageString={product.image}
                            imageWidth={180}
                            name={product.title}
                            price={product.price}
                            onClick={() => {}}
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

      <div className={styles.MainPage_provinces} id="province">
        <Text
            className={styles.MainPage_grid_title}  
            colorClass={colorClasses.NEUTRAL['600']}
            type={textTypes.HEADING.XS}
          >
           PROVINCES
        </Text>
        
        <div className={styles.MainPage_provinces_list}>
           <Slider {...sliderSettings}>
            {places.map((province, index) => (
              <CardImage
                key={index}
                isClickable
                className={styles.MainPage_provinces_item}
                imageHeight={120}
                imageString={province.image}
                imageWidth={130}
                name={province.name}
                onClick={() => 
                    router.push(`/keepscape/province/${province.name}`)
                }
              />
            ))}
          </Slider>
        </div>
      </div>

      <div className={styles.MainPage_grid} id="category">
        <Text
          className={styles.MainPage_grid_title}  
          colorClass={colorClasses.NEUTRAL['600']}
          type={textTypes.HEADING.XS}
        >
           CATEGORIES
        </Text>
        
        <div className={styles.MainPage_grid_list}>
          {categories.map((category, index) => (
            <CardImage
             key={index}
              isClickable
              className={styles.MainPage_grid_item}
              imageHeight={120}
              imageString={category.image}
              imageWidth={140}
              name={category.name}
              onClick={() => 
                  router.push(`/keepscape/category/${category.name}`)
              }
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default MainPage
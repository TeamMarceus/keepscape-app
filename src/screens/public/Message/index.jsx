import React from 'react';

import cn from 'classnames';

import Image from 'next/image';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { buttonTypes, colorClasses, textTypes } from '@/app-globals';
import { ButtonLink, Card, Text } from '@/components';

import { useWindowSize } from '@/hooks';

import { 
  boholBeaches, 
  cebuBeaches, 
  negrosOrientalBeaches, 
  siquijorBeaches 
} from './constants/places';

import styles from './styles.module.scss';


function Message() {

  const { windowSize } = useWindowSize(); 
  
  const sliderSettings = {
    className: windowSize.width <= 991 ? null : 'center',
    centerMode: !(windowSize.width <= 991),
    infinite: true,
    centerPadding: windowSize.width <= 991 ? null : '60px',
    slidesToShow: windowSize.width <= 991 ? 1 : 2,
    vertical: !(windowSize.width <= 991),
    verticalSwiping: !(windowSize.width <= 991),
  };

  const place = 'Bohol';

  const beaches = (() => {
    if (place === 'Bohol') {
      return boholBeaches;
    } if (place === 'Cebu') {
      return cebuBeaches;
    } if (place === 'Siquijor') {
      return siquijorBeaches;
    }

    return negrosOrientalBeaches;
  })();

  return (
    <div className={cn(styles.Message, {
      [styles.Message___negrosOriental]: place === 'Negros Oriental',
      [styles.Message___cebu]: place === 'Cebu',
      [styles.Message___siquijor]: place === 'Siquijor',
      [styles.Message___bohol]: place === 'Bohol',
    })}>
      <div className={cn(styles.Message_left, {
        [styles.Message_left___negrosOriental]: place === 'Negros Oriental' && windowSize.width <= 991
      })}
      >
        <Text 
         className={styles.Message_left_title}
         colorClass={(place === 'Negros Oriental' && windowSize.width <= 991) ? 
          colorClasses.NEUTRAL['800'] :  colorClasses.NEUTRAL['0']}
         type={textTypes.HEADING.XXL}
        >
          <span className={cn(styles.Message_left_title_place, {
            [styles.Message_left_title_place___negrosOriental]: place === 'Negros Oriental' && windowSize.width <= 575
          })}
          >
            {place}
          </span> {' '}
          
          <span className={styles.Message_left_title_text}>resides within you</span>
        </Text>
 
        <Text 
          colorClass={(place === 'Negros Oriental' && windowSize.width <= 991) ? 
          colorClasses.NEUTRAL['800'] :  colorClasses.NEUTRAL['0']}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid amet quam nihil ab ad debitis commodi dolores sed, dolorem unde sapiente, quo molestias exercitationem a laudantium! Dolorum aspernatur at repudiandae?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid amet quam nihil ab ad debitis commodi dolores sed, dolorem unde sapiente, quo molestias exercitationem a laudantium! Dolorum aspernatur at repudiandae?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid amet quam nihil ab ad debitis commodi dolores sed, dolorem unde sapiente, quo molestias exercitationem a laudantium! Dolorum aspernatur at repudiandae?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid amet quam nihil ab ad debitis commodi dolores sed, dolorem unde sapiente, quo molestias exercitationem a laudantium! Dolorum aspernatur at repudiandae?
        </Text>

        <ButtonLink
          className={styles.Message_button}
          icon='login'
          iconPosition='right'
          to="/keepscape"
        >
          Visit Keepscape
        </ButtonLink>
      </div>

      <div className={styles.Message_right}>
        <div className={styles.Message_right_links}>
          <ButtonLink 
            className={styles.Message_right_button}
            to={(() => {
              if (place === 'Bohol') {
                return 'https://www.aroundbohol.com/top-10-beaches-of-bohol/';
              } if (place === 'Cebu') {
                return 'https://guidetothephilippines.ph/articles/islands-and-beaches/cebu-top-beaches';
              } if (place === 'Siquijor') {
                return 'https://dailytravelpill.com/siquijor-best-beaches/';
              }

              return 'https://www.tripadvisor.com.ph/Attractions-g6090469-Activities-c61-t52-Negros_Oriental_Negros_Island_Visayas.html';
             })()
            }
            type={buttonTypes.TEXT.NEUTRAL}
          >
            <Text 
              colorClass={colorClasses.NEUTRAL['0']}
              type={textTypes.HEADING.XXS}
            >
              Places to visit
            </Text>
          </ButtonLink>

          <ButtonLink 
            className={styles.Message_right_button}
            to={(() => {
              if (place === 'Bohol') {
                return 'https://www.tripadvisor.com.ph/Attractions-g294259-Activities-Bohol_Island_Bohol_Province_Visayas.html';
              } if (place === 'Cebu') {
                return 'https://www.tripadvisor.com.ph/Attractions-g294261-Activities-Cebu_Island_Visayas.html';
              } if (place === 'Siquijor') {
                return 'https://www.tripadvisor.com.ph/Attractions-g664445-Activities-Siquijor_Island_Visayas.html';
              }

              return 'https://www.tripadvisor.com.ph/Attractions-g6090469-Activities-Negros_Oriental_Negros_Island_Visayas.html';
             })()
            }
            type={buttonTypes.TEXT.NEUTRAL}
          >
            <Text 
              colorClass={colorClasses.NEUTRAL['0']}
              type={textTypes.HEADING.XXS}
            >
              Things to do
            </Text>
          </ButtonLink>
        </div>

        <div className={styles.Message_right_slider}>
          <Slider {...sliderSettings}>
            {beaches.map((beach) => (
              <div key={beach.name} className={styles.Message_right_image}>
                <Image
                  priority
                  alt={beach.name}
                  className={styles.Message_right_image}
                  src={beach.image}
                  width={500}
                />
              </div>
            ))}
          </Slider>
        </div>

        <Card className={styles.Message_right_card}>
          <Text
            className={styles.Message_right_card_title}
            colorClass={colorClasses.NEUTRAL['0']}
            type={textTypes.HEADING.XXS}
          >
            Plan your trip to {place}
          </Text>

          <Text colorClass={colorClasses.NEUTRAL['0']}>
            Create a Trip to save and organise all of your travel ideas, and see them on a map
          </Text>

          <ButtonLink
            className={styles.Message_right_card_button}
            icon='arrow_right'
            iconPosition='right'
            to={
              (() => {
                if (place === 'Bohol') {
                  return 'https://wanderlog.com/tp/279/bohol-island-trip-planner';
                } if (place === 'Cebu') {
                  return 'https://wanderlog.com/tp/188/cebu-city-trip-planner';
                } if (place === 'Siquijor') {
                  return 'https://wanderlog.com/tp/3100/siquijor-trip-planner';
                }
  
                return 'https://wanderlog.com/tp/86977/negros-oriental-trip-planner';
               })()
            }
            type={buttonTypes.SECONDARY.BLUE}
           >
            Start Planning
          </ButtonLink>
        </Card>
      </div>
     
      
    </div>
  )
}

export default Message;

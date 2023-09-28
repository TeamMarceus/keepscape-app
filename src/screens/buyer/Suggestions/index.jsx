import React from 'react'

import cn from 'classnames';
import PropTypes from 'prop-types';

import { buttonTypes, colorClasses, textTypes } from '@/app-globals';
import { Button, ButtonLink, CardImage, Preloader, Text } from '@/components';
import { useQuestionnaire } from '@/hooks';

import styles from './styles.module.scss';

function Suggestions({ questionnaireId }) {
  const { questionnaire, isLoading: isSuggestionsLoading } = useQuestionnaire(questionnaireId);

  return (
    <> {isSuggestionsLoading ?
      ( 
        <Preloader/> 
      ) : (
        <section className={styles.Suggestions}>

          <div className={styles.Suggestions_header}>
            <ButtonLink 
              className={styles.Suggestions_button}
              to="/buyer/history"
            >
              BACK TO HOME
            </ButtonLink>

            <ButtonLink 
              className={cn(styles.Suggestions_button, styles.Suggestions_button_logout)}
              to="/logout"
              type={buttonTypes.TEXT.BLUE}
            >
              LOGOUT
            </ButtonLink>
          </div>

          <Text
            colorClass={colorClasses.NEUTRAL['700']}
            type={textTypes.HEADING.MD}
          >
            Here are the <span className={styles.Suggestions_top3}>top 3</span>{' '} 
            gifts for <span className={styles.Suggestions_top3}>{questionnaire.name}</span> 
          </Text>

          <div className={styles.Suggestions_gifts}>
            {questionnaire.suggestionsAndProducts.map((gift, index) => (
                !gift.isLocked 
                // true
                ? (
                <div key={index} className={styles.Suggestions_gifts_suggestion}>
                  <div className={styles.Suggestions_gifts_suggestion_text}>
                    <Text
                      className={styles.Suggestions_gifts_suggestion_name}
                      type={textTypes.HEADING.SM}
                    >
                      {gift.name}
                    </Text>

                    <Text
                      className={styles.Suggestions_gifts_suggestion_description}
                      type={textTypes.BODY.LG}
                    >
                      {gift.description}
                    </Text>
                  </div>

                  <div 
                  className={
                      gift.products.length !== 0 ? 
                      styles.Suggestions_gifts_suggestion_products :
                      styles.Suggestions_gifts_suggestion_productsEmpty
                    }
                  >
                    { gift.products.length !== 0 ? 
                      (gift.products.map((product, productIndex) => (
                        <CardImage 
                          key={productIndex}
                          buttonLink={product.url}
                          className={styles.Suggestions_gifts_suggestion_product}
                          imageHeight={180}
                          imageString={product.image}
                          imageWidth={180}
                          name={product.title}
                          price={product.price}
                        />
                        ))
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
              ) : (
                <div key={index} className={styles.Suggestions_gifts_lock}>
                  <Text
                    className={styles.Suggestions_gifts_lock_text}
                    colorClass={colorClasses.NEUTRAL['0']}  
                    type={textTypes.HEADING.SM}
                  >
                    Unlock this suggested gift for only <span className={styles.Suggestions_gifts_lock_price}>₱20</span>
                  </Text>

                  <Button
                    className={styles.Suggestions_gifts_lock_button}
                  >
                    UNLOCK NOW
                  </Button>
                </div>
              )
            ))}
          </div>
        </section>
      )
    }
    </>
  );
}

Suggestions.propTypes = {
  questionnaireId: PropTypes.string.isRequired,
};

export default Suggestions;

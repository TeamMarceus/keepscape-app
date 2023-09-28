import cn from 'classnames';

import { buttonTypes, textTypes } from '@/app-globals';
import { ButtonLink, Preloader, Text } from '@/components';
import { useQuestionnaires } from '@/hooks';
import { formatDate } from '@/utils/string';

import styles from './styles.module.scss';

function History() {
  const { questionnaires, isLoading: isQuestionnairesLoading } = useQuestionnaires();

  return (
    <> {isQuestionnairesLoading ? 
      (
      <Preloader /> 
      ) : (
        <div className={styles.History}>
          <div className={styles.History_header}>
            <ButtonLink 
              className={styles.History_button}
              to="/"
            >
              ASK FOR NEW GIFT SUGGESTIONS
            </ButtonLink>

            <ButtonLink 
              className={cn(styles.History_button, styles.History_button_logout)}
              to="/logout"
              type={buttonTypes.TEXT.BLUE}
            >
              LOGOUT
            </ButtonLink>
          </div>

          <div className={styles.History_table}>
            <div className={styles.History_table_row}>
              <Text
              className={styles.History_table_column}
              type={textTypes.HEADING.XXS}
              >
                Date
              </Text>

              <Text 
                className={styles.History_table_column}
                type={textTypes.HEADING.XXS}
              >
                Gift Suggestions For
              </Text>

              <Text
                className={styles.History_table_lastColumn}
              type={textTypes.HEADING.XXS}
              >
                Actions
              </Text>
            </div>

            <div className={styles.History_table_body}>       
                {questionnaires.map((questionnaire, index) => (
                    <div 
                      key={index}
                      className={styles.History_table_row}
                    >
                      <Text className={styles.History_table_column}>{formatDate(questionnaire.datetimeCreated)}</Text>

                      <Text className={styles.History_table_column}>{questionnaire.name}</Text>
                    
                      <ButtonLink
                        className={styles.History_table_lastColumn} 
                        to={`/buyer/suggestions/${questionnaire.guid}`}
                        type={buttonTypes.TEXT.BLUE}
                      >
                        View Suggestions
                      </ButtonLink>
                    </div>
                  ))
                }
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default History;

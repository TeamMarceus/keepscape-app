import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import cn from 'classnames';


import { Bar } from 'react-chartjs-2';

import {
  buttonTypes,
  colorClasses,
  gridTypes,
  textTypes,
} from '@/app-globals';
import { ButtonLink, Card, Grid, Icon, Text } from '@/components';

import styles from './styles.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Daily Comparison',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function Dashboard() {

  const data = {
    labels,
    datasets: [
      {
        label: 'Answers', 
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: '#48CFAD',
      },
      {
        label: 'Revenue',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: '#ED5565',
      },
      {
        label: 'Signups', 
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: '#4FC1E9',
      },
    ],
  };

  return <div className={styles.Dashboard}>
    <div className={styles.Dashboard_header}>
      <Text type={textTypes.HEADING.MD}>Keepscape Admin Dashboard</Text>
      <ButtonLink 
        className={styles.Dashboard_logout}
        to="/logout"
        type={buttonTypes.TEXT.RED}
      >
        LOGOUT
      </ButtonLink>
    </div>


    <Grid className={styles.Dashboard_cards} type={gridTypes.THREE}>
      
      <div>
        <Text
          colorClass={colorClasses.NEUTRAL['600']}
          type={textTypes.BODY.LG}
        >
          Total Number of Answers
        </Text>

        <Card className={styles.Dashboard_cards_card}>
          <Grid className={styles.Dashboard_cards_card_grid}>
            <div className={styles.Dashboard_cards_card_leftColumn}>
              <Icon
                className={cn(
                  styles.Dashboard_cards_card_icon,
                  styles.Dashboard_cards_card_icon___green
                )}
                icon="question_answer"
              />
            </div>
            <div className={styles.Dashboard_cards_card_rightColumn}>
              <Text
                colorClass={colorClasses.GREEN['200']}
                type={textTypes.HEADING.SM}
              >
                100
              </Text>
            </div>
          </Grid>
        </Card>
      </div>

      <div>
        <Text
          colorClass={colorClasses.NEUTRAL['600']}
          type={textTypes.BODY.LG}
        >
          Total Revenue
        </Text>

        <Card className={styles.Dashboard_cards_card}>
          <Grid className={styles.Dashboard_cards_card_grid}>
            <div className={styles.Dashboard_cards_card_leftColumn}>
              <Icon
                className={cn(
                  styles.Dashboard_cards_card_icon,
                  styles.Dashboard_cards_card_icon___red
                )}
                icon="attach_money"
              />
            </div>

            <div className={styles.Dashboard_cards_card_rightColumn}>
              <Text
                  colorClass={colorClasses.RED['200']}
                  type={textTypes.HEADING.SM}
                >
                10
              </Text>
            </div>
          </Grid>
        </Card>
      </div>

      <div>
        <Text
          colorClass={colorClasses.NEUTRAL['600']}
          type={textTypes.BODY.LG}
        >
          Total Number of Signups
        </Text>

        <Card className={styles.Dashboard_cards_card}>
          <Grid className={styles.Dashboard_cards_card_grid}>
            <div className={styles.Dashboard_cards_card_leftColumn}>
              <Icon
                  className={cn(
                  styles.Dashboard_cards_card_icon,
                  styles.Dashboard_cards_card_icon___blue
                )}
                icon="person_add"
              />
            </div>

            <div className={styles.Dashboard_cards_card_rightColumn}>
              <Text
                colorClass={colorClasses.BLUE['200']}
                type={textTypes.HEADING.SM}
              >
                55
              </Text>
            </div>
          </Grid>
        </Card>
      </div>
    </Grid>

    <Text className={styles.Dashboard_withMargin} type={textTypes.HEADING.XS}>
     Daily Comparison
    </Text>

    <Card className={styles.Dashboard_graph}>
      <Bar data={data} options={options} />
    </Card>
  </div>
}
export default Dashboard;

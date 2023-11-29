import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

import { colorClasses, textTypes } from '@/app-globals';

import { Card, Icon, ScreenLoader, Text } from '@/components';

import { useAnalytics } from '@/hooks';

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
      text: 'Monthly Comparison',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function Dashboard() {
  const { isLoading: isAnnalyticsLoading, analytics } = useAnalytics('admin');

  if (isAnnalyticsLoading) {
    return <ScreenLoader />;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Products',
        data: labels.map(
          (month) => analytics.monthlyStatistics[month].products
        ),
        backgroundColor: '#48CFAD',
      },
      {
        label: 'Buyers',
        data: labels.map((month) => analytics.monthlyStatistics[month].buyers),
        backgroundColor: '#ED5565',
      },
      {
        label: 'Sellers',
        data: labels.map((month) => analytics.monthlyStatistics[month].sellers),
        backgroundColor: '#4FC1E9',
      },
    ],
  };

  return (
    <div className={styles.Dashboard}>
      <Text type={textTypes.HEADING.XS}>Dashboard</Text>

      <Card className={styles.Dashboard_statistics}>
        <div className={styles.Dashboard_statistics_details}>
          <Text
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.HEADING.MD}
          >
            {analytics.sellerApplications}
          </Text>

          <div className={styles.Dashboard_statistics_text}>
            <Icon
              className={styles.Dashboard_statistics_assignmentIcon}
              icon="assignment"
            />

            <Text
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XXXS}
            >
              Seller Applications
            </Text>
          </div>
        </div>

        <div className={styles.Dashboard_statistics_details}>
          <Text
            colorClass={colorClasses.BLUE['400']}
            type={textTypes.HEADING.MD}
          >
            {analytics.ongoingOrders}
          </Text>

          <div className={styles.Dashboard_statistics_text}>
            <Icon
              className={styles.Dashboard_statistics_ongoingIcon}
              icon="local_shipping"
            />

            <Text
              colorClass={colorClasses.BLUE['400']}
              type={textTypes.HEADING.XXXS}
            >
              On-going Orders
            </Text>
          </div>
        </div>

        <div className={styles.Dashboard_statistics_details}>
          <Text
            colorClass={colorClasses.GREEN['400']}
            type={textTypes.HEADING.MD}
          >
            {analytics.products}
          </Text>

          <div className={styles.Dashboard_statistics_text}>
            <Icon
              className={styles.Dashboard_statistics_shoppingIcon}
              icon="shopping_bag"
            />

            <Text
              colorClass={colorClasses.GREEN['400']}
              type={textTypes.HEADING.XXXS}
            >
              New Products
            </Text>
          </div>
        </div>
      </Card>

      <Text className={styles.Dashboard_withMargin} type={textTypes.HEADING.XS}>
        Statistics
      </Text>

      <Card className={styles.Dashboard_graph}>
        <Bar data={data} options={options} />
      </Card>
    </div>
  );
}
export default Dashboard;

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



function Dashboard() {

  return (
    <div className={styles.Dashboard}>
      
      <Text type={textTypes.HEADING.XS}>
        Order Statistics
      </Text>

      <Card className={styles.Dashboard_statistics}>
        <div className={styles.Dashboard_statistics_detail}>
          <Text
            colorClass={colorClasses.NEUTRAL['400']} 
            type={textTypes.HEADING.MD}
          >
            100
          </Text>

          <Text type={textTypes.HEADING.XXS}>
            Pending Orders
          </Text>
        </div>

        <div className={styles.Dashboard_statistics_detail}>
          <Text
            colorClass={colorClasses.BLUE['400']} 
            type={textTypes.HEADING.MD}
          >
            50
          </Text>

          <Text type={textTypes.HEADING.XXS}>
            On-going Orders
          </Text>
        </div>

        <div className={styles.Dashboard_statistics_detail}>
          <Text
            colorClass={colorClasses.GREEN['400']} 
            type={textTypes.HEADING.MD}
          >
            200
          </Text>

          <Text type={textTypes.HEADING.XXS}>
            Completed Orders
          </Text>
        </div>

      </Card>

      <Text className={styles.Dashboard_withMargin} type={textTypes.HEADING.XS}>
        Announcements
      </Text>
    </div>
  )
}
export default Dashboard;

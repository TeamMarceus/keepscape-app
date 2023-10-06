import {
  colorClasses,
  textTypes,
} from '@/app-globals';
import { Card, Icon, Text } from '@/components';

import styles from './styles.module.scss';



function Dashboard() {

  return (
    <div className={styles.Dashboard}>
      
      <Text type={textTypes.HEADING.XS}>
        Order Statistics
      </Text>

      <Card className={styles.Dashboard_statistics}>
        <div className={styles.Dashboard_statistics_details}>
          <Text
            colorClass={colorClasses.NEUTRAL['400']} 
            type={textTypes.HEADING.MD}
          >
            100
          </Text>

          <div className={styles.Dashboard_statistics_text}>
            <Icon
              className={styles.Dashboard_statistics_pendingIcon}
              icon="pending"
            />

            <Text 
              colorClass={colorClasses.NEUTRAL['400']}  
              type={textTypes.HEADING.XXXS}
            >
              Pending Orders
            </Text>
          </div>
        </div>
   
        <div className={styles.Dashboard_statistics_details}>
          <Text
            colorClass={colorClasses.BLUE['400']} 
            type={textTypes.HEADING.MD}
          >
            50
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
            200
          </Text>

          <div className={styles.Dashboard_statistics_text}>
            <Icon
              className={styles.Dashboard_statistics_completedIcon}
              icon="done"
            />

            <Text 
              colorClass={colorClasses.GREEN['400']}
              type={textTypes.HEADING.XXXS}
            >
            Completed Orders
          </Text>
          </div>
        </div>

      </Card>

      <Text className={styles.Dashboard_withMargin} type={textTypes.HEADING.XS}>
        Announcements
      </Text>

      <Card className={styles.Dashboard_announcements}>
        <div className={styles.Dashboard_announcements_text}>
          <Text
            className={styles.Dashboard_announcements_title}
            colorClass={colorClasses.BLUE['400']}
            type={textTypes.HEADING.XXS}
          >
            Change of Terms and Conditions
          </Text>

          <Text>
            Hey Keeypscape sellers! We have updated our terms and conditions. Please read them carefully before proceeding.
            The following changes have been made:
            <br />
            1. Sellers are now required to ship their orders within 3 days of receiving the order.
            <br />
            2. Sellers are now required to provide a tracking number for their orders.
            <br />
            3. Sellers are now required to provide a tracking number for their orders.
          </Text>
        </div>

        <div className={styles.Dashboard_announcements_text}>
          <Text
            className={styles.Dashboard_announcements_title}
            colorClass={colorClasses.BLUE['400']}
            type={textTypes.HEADING.XXS}
          >
            Change of Terms and Conditions
          </Text>

          <Text>
            Hey Keeypscape sellers! We have updated our terms and conditions. Please read them carefully before proceeding.
            The following changes have been made:
            <br />
            1. Sellers are now required to ship their orders within 3 days of receiving the order.
            <br />
            2. Sellers are now required to provide a tracking number for their orders.
            <br />
            3. Sellers are now required to provide a tracking number for their orders.
          </Text>
        </div>
      </Card>
    </div>
  )
}
export default Dashboard;

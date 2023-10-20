import {
  colorClasses,
  textTypes,
} from '@/app-globals';
import { Card, Icon, NoResults, Text } from '@/components';

import useAnnouncements from '@/hooks/useAnnouncements';

import PreloaderAnnouncement from '@/screens/admin/Announcements/Preloader';

import styles from './styles.module.scss';

function Dashboard() {
  const {isLoading: isAnnouncementsLoading, announcements } = useAnnouncements({page: 1, pageSize: 10});

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

      {/* eslint-disable-next-line no-nested-ternary */}
      {isAnnouncementsLoading ? (
        <PreloaderAnnouncement/>
        ) : (
          announcements.length > 0 ? (
            announcements.map((announcement) => (
              <Card key={announcement.id} className={styles.Dashboard_announcements}>
                <div className={styles.Dashboard_announcements_text}>
                  <Text
                    className={styles.Dashboard_announcements_title}
                    colorClass={colorClasses.BLUE['400']}
                    type={textTypes.HEADING.XXS}
                  >
                    {announcement.title}
                  </Text>
  
                  <Text>
                    {announcement.description}
                  </Text>
                </div>
              </Card>
            ))
          ) : (
            <NoResults
              className={styles.Buyers_noResults}
              message="No Annoucements"
            />
          )
        )
      }
    </div>
  )
}
export default Dashboard;

import React from 'react';

import { useSearchParams } from 'next/navigation';

import { colorClasses, tabKinds, tabTypes, textTypes } from '@/app-globals';
import { Card, Tabs, Text } from '@/components';

import AccountInformation from './AccountInformation';
import ChangePassword from './ChangePassword';
import accountTabs from './constants/accountTabs';

import styles from './styles.module.scss';

function Account() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('activeTab');

  return (
    <div className={styles.Account}>
      <div className={styles.Account_tabs}>
        <Text
          className={styles.Account_title}
          colorClass={colorClasses.NEUTRAL['300']}
          type={textTypes.HEADING.XS}
        >
          Account Information
        </Text>
        <Tabs
          activeTab={activeTab}
          tabs={[
            {
              name: accountTabs.ACCOUNT_INFORMATION.name,
              value: accountTabs.ACCOUNT_INFORMATION.value,
              kind: tabKinds.LINK,
              action: `/buyer/account?activeTab=${accountTabs.ACCOUNT_INFORMATION.value}`,
            },
            {
              name: accountTabs.ACCOUNT_PURCHASES.name,
              value: accountTabs.ACCOUNT_PURCHASES.value,
              kind: tabKinds.LINK,
              action: `/buyer/account?activeTab=/${accountTabs.ACCOUNT_PURCHASES.value}`,
            },
            {
              name: accountTabs.CHANGE_PASSWORD.name,
              value: accountTabs.CHANGE_PASSWORD.value,
              kind: tabKinds.LINK,
              action: `/buyer/account?activeTab=${accountTabs.CHANGE_PASSWORD.value}`,
            },
          ]}
          type={tabTypes.VERTICAL.LG}
        />
      </div>

      <Card className={styles.Account_card}>
       
        {activeTab === accountTabs.ACCOUNT_INFORMATION.value && (
          <AccountInformation />
        )}

        {activeTab === accountTabs.CHANGE_PASSWORD.value && (
          <ChangePassword />
        )}

      </Card>
    </div>
  );
}

export default Account;

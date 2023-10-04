import React from 'react';

import { useSearchParams } from 'next/navigation';

import { colorClasses, tabKinds, tabTypes, textTypes } from '@/app-globals';
import { Card, Tabs, Text } from '@/components';

import Purchase from '../../buyer/Purchase';

import AccountInformation from './AccountInformation';
import ChangePassword from './ChangePassword';
import accountTabs from './constants/accountTabs';

import styles from './styles.module.scss';

function Account() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('activeTab');
  const userType = 'buyer'

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
              value: (!activeTab ? null : accountTabs.ACCOUNT_INFORMATION.value),
              kind: tabKinds.LINK,
              action: `/${userType}/account?activeTab=${accountTabs.ACCOUNT_INFORMATION.value}`,
            },
            {
              name: accountTabs.ACCOUNT_PURCHASE.name,
              value: accountTabs.ACCOUNT_PURCHASE.value,
              kind: tabKinds.LINK,
              action: `/${userType}/account?activeTab=${accountTabs.ACCOUNT_PURCHASE.value}`,
            },
            {
              name: accountTabs.CHANGE_PASSWORD.name,
              value: accountTabs.CHANGE_PASSWORD.value,
              kind: tabKinds.LINK,
              action: `/${userType}/account?activeTab=${accountTabs.CHANGE_PASSWORD.value}`,
            },
          ]}
          type={tabTypes.VERTICAL.LG}
        />
      </div>
        

      <Card className={styles.Account_card}>
        {(!activeTab ||  activeTab === accountTabs.ACCOUNT_INFORMATION.value)  && (
          <AccountInformation />
        )}

        {activeTab === accountTabs.CHANGE_PASSWORD.value && (
          <ChangePassword />
        )}

        {activeTab === accountTabs.ACCOUNT_PURCHASE.value && (
          <Purchase />
        )}
      </Card>
      
    </div>
  );
}

export default Account;

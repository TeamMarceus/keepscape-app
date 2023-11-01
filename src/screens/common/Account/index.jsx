import React from 'react';

import cn from 'classnames';
import { useSearchParams } from 'next/navigation';

import { useSelector } from 'react-redux';

import { colorClasses, tabKinds, tabTypes, textTypes, userTypes } from '@/app-globals';
import { Card, Tabs, Text } from '@/components';
import { getUser } from '@/ducks';

import Orders from '@/screens/buyer/Orders';

import Purchase from '../../buyer/Purchase';

import AccountInformation from './AccountInformation';
import ChangePassword from './ChangePassword';
import accountTabs from './constants/accountTabs';

import styles from './styles.module.scss';

function Account() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('activeTab');

  const user = useSelector((store) => getUser(store));

  const buyerTabs = [
    {
      name: accountTabs.ACCOUNT_INFORMATION.name,
      value: (!activeTab ? null : accountTabs.ACCOUNT_INFORMATION.value),
      kind: tabKinds.LINK,
      action: `/buyer/account?activeTab=${accountTabs.ACCOUNT_INFORMATION.value}`,
    },
    {
      name: accountTabs.ACCOUNT_ORDERS.name,
      value: accountTabs.ACCOUNT_ORDERS.value,
      kind: tabKinds.LINK,
      action: `/buyer/account?activeTab=${accountTabs.ACCOUNT_ORDERS.value}`,
    },
    {
      name: accountTabs.ACCOUNT_PURCHASE.name,
      value: accountTabs.ACCOUNT_PURCHASE.value,
      kind: tabKinds.LINK,
      action: `/buyer/account?activeTab=${accountTabs.ACCOUNT_PURCHASE.value}`,
    },
    {
      name: accountTabs.CHANGE_PASSWORD.name,
      value: accountTabs.CHANGE_PASSWORD.value,
      kind: tabKinds.LINK,
      action: `/buyer/account?activeTab=${accountTabs.CHANGE_PASSWORD.value}`,
    },
  ];

  const sellerTabs = [
    {
      name: accountTabs.ACCOUNT_INFORMATION.name,
      value: (!activeTab ? null : accountTabs.ACCOUNT_INFORMATION.value),
      kind: tabKinds.LINK,
      action: `/seller/account?activeTab=${accountTabs.ACCOUNT_INFORMATION.value}`,
    },
    {
      name: accountTabs.CHANGE_PASSWORD.name,
      value: accountTabs.CHANGE_PASSWORD.value,
      kind: tabKinds.LINK,
      action: `/seller/account?activeTab=${accountTabs.CHANGE_PASSWORD.value}`,
    },
  ];

  return (
    <div className={cn(styles.Account,{
      [styles.Account_seller]: user.userType === userTypes.SELLER,
    })}>
      <div className={cn(styles.Account_tabs, {
        [styles.Account_tabs_seller]: user.userType === userTypes.SELLER,
      })}>
        <Text
          className={styles.Account_title}
          colorClass={ user.userType === userTypes.SELLER ? 
            colorClasses.NEUTRAL['800'] :
            colorClasses.NEUTRAL['300']
          }
          type={textTypes.HEADING.XS}
        >
          Account Information
        </Text>
        <Tabs
          activeTab={activeTab}
          tabs={user.userType === userTypes.BUYER ? buyerTabs : sellerTabs}
          type={user.userType === userTypes.BUYER ? tabTypes.VERTICAL.LG : tabTypes.HORIZONTAL.LG}
        />
      </div>
        

      <Card className={styles.Account_card}>
        {(!activeTab ||  activeTab === accountTabs.ACCOUNT_INFORMATION.value)  && (
          <AccountInformation />
        )}

        {activeTab === accountTabs.ACCOUNT_ORDERS.value && (
          <Orders />
        )}

        {activeTab === accountTabs.ACCOUNT_PURCHASE.value && (
          <Purchase />
        )}

        {activeTab === accountTabs.CHANGE_PASSWORD.value && (
          <ChangePassword />
        )}
      </Card>
      
    </div>
  );
}

export default Account;

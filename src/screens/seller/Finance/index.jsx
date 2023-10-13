import React, { useState } from 'react';

import cn from 'classnames';

import {
  buttonTypes,
  colorClasses,
  iconButtonTypes,
  textTypes,
} from '@/app-globals';

import { 
  IconButton, 
  Button,
  ButtonLink, 
  Card, 
  ControlledInput, 
  Icon, 
  NoResults, 
  Text, 
  IconLink
} from '@/components';

import { useWindowSize } from '@/hooks';

import PreloaderFinance from './Preloader';

import styles from './styles.module.scss';

const records = [
  {
    id: '1',
    dateCreated: '2021-08-01',
    logs: '+100',
    product: {
      id: '1',
      name: 'Butanding Keychain',
      image: 'https://picsum.photos/200',
    },
    orderId: '1',
  },
  {
    id: '2',
    dateCreated: '2021-08-01',
    logs: '-200 Transfer',
    product: {
      id: '2',
      name: 'Dolphin Keychain',
      image: 'https://picsum.photos/300',
    },
    orderId: '2',
  },

];

function Finance() {
  const { windowSize } = useWindowSize();
  const isRecordsLoading = false;
  const [search, setSearch] = useState('');

  const filteredRecords = records.filter((record) => {
    const searchLowerCase = search.toLowerCase();

    return (
      record.dateCreated.toLowerCase().includes(searchLowerCase) ||
      record.logs.toLowerCase().includes(searchLowerCase) ||
      record.product.name.toLowerCase().includes(searchLowerCase) ||
      record.orderId.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <div className={styles.Finance}>
      <Text type={textTypes.HEADING.XS}>
        Finance
      </Text>

      <div className={styles.Finance_header}>
        <Text 
          colorClass={colorClasses.GREEN['400']}
          type={textTypes.HEADING.MD}
        >
          ₱ 1,000.00
        </Text>

        <Text 
          className={styles.Finance_header_balance}
          type={textTypes.HEADING.XXXS}
        >
          Your Balance
        </Text>

        <Text 
          className={styles.Finance_header_withdraw}
          colorClass={colorClasses.NEUTRAL['400']}
        >
          Proceed to withdraw your balance to your preferred payment method.
        </Text>

        <div className={styles.Finance_header_buttons}>
          <Button
            className={styles.Finance_header_button}
            // type={buttonTypes.SECONDARY.BLUE}
            onClick={() => {}}
          >
            G Cash
          </Button>

          <Button
            className={styles.Finance_header_button}
            // type={buttonTypes.SECONDARY.BLUE}
            onClick={() => {}}
          >
            Paymaya
          </Button>

          <Button
            className={styles.Finance_header_button}
            // type={buttonTypes.SECONDARY.BLUE}
            onClick={() => {}}
          >
            PayPal
          </Button>

          <Button
            className={styles.Finance_header_button}
            // type={buttonTypes.SECONDARY.BLUE}
            onClick={() => {}}
          >
            Bank Transfer
          </Button>
        </div>
      </div>

      <ControlledInput
        className={styles.Finance_search}
        icon="search"
        name="search"
        placeholder="You can search by Date Created, Logs, or Order ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isRecordsLoading ? (
        <PreloaderFinance />
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {filteredRecords.length ? (
            <div className={styles.Finance_grid}>
              {/* Header of OrderGrid starts here */}
              <Card
                className={cn(
                  styles.Finance_grid_recordGrid,
                  styles.Finance_grid_headers
                )}
              >
                <div
                  className={cn(
                    styles.Finance_grid_header,
                    styles.Finance_grid_column
                  )}
                >
                  Date Created
                </div>

                <div
                  className={cn(
                    styles.Finance_grid_header,
                    styles.Finance_grid_column
                  )}
                >
                  Logs
                </div>

                <div
                  className={cn(
                    styles.Finance_grid_header,
                    styles.Finance_grid_column,
                    styles.Finance_grid_header_action,
                  )}
                >
                  Order ID
                </div>
                
                {/* Header of OrderGrid ends here */}
              </Card>

              {/* Body of OrderGrid starts here */}
              {filteredRecords.map(
                ({ id, dateCreated, logs, orderId  }) =>
                  windowSize.width > 767 ? (
                    // Desktop View
                    <Card key={id} className={styles.Finance_grid_recordGrid}>
                      <div className={styles.Finance_grid_column}>
                        {dateCreated}
                      </div>

                      <div className={styles.Finance_grid_column}>
                        {logs}
                      </div>

                      <ButtonLink
                        className={styles.Finance_grid_column}
                        to={`/seller/orders?orderId=${orderId}`}
                        type={buttonTypes.TEXT.BLUE}
                      >
                        {orderId}
                      </ButtonLink>
                        
                      
                    </Card>
                  ) : (
                    // Mobile View
                    <details
                      key={id}
                      className={styles.Finance_grid_recordGrid}
                    >
                      <summary className={styles.Finance_grid_title}>
                        <div className={styles.Finance_grid_title_info}>
                          <Icon
                            className={styles.Finance_grid_title_icon}
                            icon="expand_more"
                          />

                          <Text type={textTypes.HEADING.XS}>
                            {dateCreated} {logs}
                          </Text>
                        </div>
                      </summary>

                      <div className={styles.Finance_grid_column}>
                        <Text
                          colorClass={colorClasses.NEUTRAL['400']}
                          type={textTypes.HEADING.XXS}
                        >
                          Product:
                        </Text>

                        <Text type={textTypes.HEADING.XXS}>{logs}</Text>
                      </div>
                    </details>
                  )
              )}
              {/* Body of OrderGrid ends here */}
            </div>
          ) : (
            <NoResults
              className={styles.Finance_noResults}
              message="No records found"
            />
          )}
        </>
      )}

    </div>
  )
}
export default Finance;

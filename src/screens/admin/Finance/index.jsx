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

import { useWindowSize, useWithdrawals } from '@/hooks';

import PreloaderFinance from './Preloader';

import TransferBalanceModal from './TransferBalanceModal';
import styles from './styles.module.scss';

const records = [
  {
    id: '1',
    dateCreated: '2021-08-01',
    logs: '+100',
    product: {
      id: '1111-e89b-12d3-a456-426614174000',
      name: 'Butanding Keychain',
      image: 'https://picsum.photos/200',
    },
    sellerId: '123e4567-e89b-12d3-a456-426614174000',
    orderId: '123e4567-e89b-12d3-a456-426614174000',
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
    sellerId: '123e4567-e89b-12d3-a456-426614174000',
    orderId: '123e4567-e89b-12d3-a456-426614174000',
  },

];

function Finance() {
  const { windowSize } = useWindowSize();
  const [search, setSearch] = useState('');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  
  const {isLoading: isRecordsLoading, withdrawals } = useWithdrawals({page: 1, pageSize: 10})

  const filteredRecords = withdrawals.filter((record) => {
    const searchLowerCase = search.toLowerCase();

    return (
     record
    );
  });

  return (
    <>
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
            Transfer a fund to a user account
          </Text>

          <Button
            className={styles.Finance_header_button}
            onClick={() => setIsTransferModalOpen(true)}
          >
            Proceed to Transfer
          </Button>
        </div>

        <ControlledInput
          className={styles.Finance_search}
          icon="search"
          name="search"
          placeholder="You can search by Logs, Seller ID or Order ID"
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
                    Seller Name
                  </div>

                  <div
                    className={cn(
                      styles.Finance_grid_header,
                      styles.Finance_grid_column
                    )}
                  >
                    Full Name
                  </div>
                  
                  <div
                    className={cn(
                      styles.Finance_grid_header,
                      styles.Finance_grid_column
                    )}
                  >
                    Amount
                  </div>

                  <div
                    className={cn(
                      styles.Finance_grid_header,
                      styles.Finance_grid_column
                    )}
                  >
                    Payment Method
                  </div>

                  <div
                    className={cn(
                      styles.Finance_grid_header,
                      styles.Finance_grid_column
                    )}
                  >
                    Remarks
                  </div>

                  <div
                    className={cn(
                      styles.Finance_grid_header,
                      styles.Finance_grid_column
                    )}
                  >
                    Status
                  </div>


                  <div
                    className={cn(
                      styles.Finance_grid_header,
                      styles.Finance_grid_column,
                      styles.Finance_grid_header_action,
                    )}
                  >
                    Actions
                  </div>
                  
                  {/* Header of OrderGrid ends here */}
                </Card>

                {/* Body of OrderGrid starts here */}
                {filteredRecords.map(
                  ({ id, balanceId, sellerId, sellerName, fullName, amount, paymentMethod, paymentDetails,
                    paymentProfileImageUrl, paymentProofImageUrl, remarks, status  }) =>
                    windowSize.width > 767 ? (
                      // Desktop View
                      <Card key={id} className={styles.Finance_grid_recordGrid}>
                        <div className={styles.Finance_grid_column}>
                          {sellerName}
                        </div>

                        <div className={styles.Finance_grid_column}>
                          {fullName}
                        </div>

                        <div className={styles.Finance_grid_column}>
                          {amount}
                        </div>

                        <div className={styles.Finance_grid_column}>
                          {paymentMethod}
                        </div>

                        <div className={styles.Finance_grid_column}>
                          {remarks}
                        </div>

                        <div className={styles.Finance_grid_column}>
                          {status}
                        </div>
                          
                        
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
                              {sellerName}
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

                          <Text type={textTypes.HEADING.XXS}>{fullName}</Text>
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

      {isTransferModalOpen && (
        <TransferBalanceModal
          handleClose={() => setIsTransferModalOpen(false)}
          isOpen={isTransferModalOpen}
        />
      )}
    </>
  )
}
export default Finance;

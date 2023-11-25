import React, { useEffect, useState } from 'react';

import cn from 'classnames';

import { useRouter, useSearchParams } from 'next/navigation';

import { colorClasses, textTypes } from '@/app-globals';

import {
  Button,
  Card,
  ControlledInput,
  Icon,
  NoResults,
  Text,
  ScreenLoader,
  Pagination,
} from '@/components';

import { useBalance, useSellerLogs, useWindowSize } from '@/hooks';

import RequestModal from '../RequestModal';

import PreloaderHistories from './Preloader';

import styles from './styles.module.scss';

function Histories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [balanceAmount, setBalanceAmount] = useState(0);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [clickedPaymentMethod, setClickedPaymentMethod] = useState(null);

  const { isLoading: isBalanceLoading, balance } = useBalance();
  const {
    isLoading: isRecordsLoading,
    logs,
    totalPages,
  } = useSellerLogs({ page, pageSize: 10 });

  const filteredRecords = logs.filter((record) => {
    const searchLowerCase = search.toLowerCase();

    return (
      record.dateTimeCreated.toLowerCase().includes(searchLowerCase) ||
      record.amount === Number(searchLowerCase) ||
      record.remarks.toLowerCase().includes(searchLowerCase)
    );
  });

  useEffect(() => {
    setBalanceAmount(!isBalanceLoading ? balance.amount : 0);
  }, [isBalanceLoading]);

  if (isBalanceLoading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <div className={styles.Histories}>
        <Text type={textTypes.HEADING.XS}>Transaction Histories</Text>

        <div className={styles.Histories_header}>
          <Text
            colorClass={colorClasses.GREEN['400']}
            type={textTypes.HEADING.MD}
          >
            ₱{balanceAmount}
          </Text>

          <Text
            className={styles.Histories_header_balance}
            type={textTypes.HEADING.XXXS}
          >
            Your Balance
          </Text>

          <Text
            className={styles.Histories_header_withdraw}
            colorClass={colorClasses.NEUTRAL['400']}
          >
            Proceed to withdraw your balance to your preferred payment method.
          </Text>

          <div className={styles.Histories_header_buttons}>
            <Button
              className={styles.Histories_header_button}
              onClick={() => {
                setIsRequestModalOpen(true);
                setClickedPaymentMethod('Gcash');
              }}
            >
              GCash
            </Button>

            <Button
              className={styles.Histories_header_button}
              onClick={() => {
                setIsRequestModalOpen(true);
                setClickedPaymentMethod('Maya');
              }}
            >
              Paymaya
            </Button>

            <Button
              className={styles.Histories_header_button}
              onClick={() => {
                setIsRequestModalOpen(true);
                setClickedPaymentMethod('Paypal');
              }}
            >
              PayPal
            </Button>

            <Button
              className={styles.Histories_header_button}
              onClick={() => {
                setIsRequestModalOpen(true);
                setClickedPaymentMethod('BankTransfer');
              }}
            >
              Bank Transfer
            </Button>
          </div>
        </div>

        <ControlledInput
          className={styles.Histories_search}
          icon="search"
          name="search"
          placeholder="You can search by Date Transacted, Amount, or Remarks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isRecordsLoading ? (
          <PreloaderHistories />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredRecords.length ? (
              <>
                <div className={styles.Histories_grid}>
                  <Card
                    className={cn(
                      styles.Histories_grid_recordGrid,
                      styles.Histories_grid_headers
                    )}
                  >
                    <div
                      className={cn(
                        styles.Histories_grid_header,
                        styles.Histories_grid_column
                      )}
                    >
                      Date Transacted
                    </div>

                    <div
                      className={cn(
                        styles.Histories_grid_header,
                        styles.Histories_grid_column
                      )}
                    >
                      Amount
                    </div>

                    <div
                      className={cn(
                        styles.Histories_grid_header,
                        styles.Histories_grid_column
                      )}
                    >
                      Remarks
                    </div>
                  </Card>

                  {filteredRecords.map(
                    ({ id, dateTimeCreated, amount, remarks }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card
                          key={id}
                          className={styles.Histories_grid_recordGrid}
                        >
                          <div className={styles.Histories_grid_column}>
                            {dateTimeCreated.split('T')[0]}
                          </div>

                          <Text
                            className={styles.Histories_grid_column}
                            colorClass={
                              amount < 0
                                ? colorClasses.RED['300']
                                : colorClasses.GREEN['300']
                            }
                          >
                            {amount}
                          </Text>

                          <div className={styles.Histories_grid_column}>
                            {remarks}
                          </div>
                        </Card>
                      ) : (
                        // Mobile View
                        <details
                          key={id}
                          className={styles.Histories_grid_recordGrid}
                        >
                          <summary className={styles.Histories_grid_title}>
                            <div className={styles.Histories_grid_title_info}>
                              <Icon
                                className={styles.Histories_grid_title_icon}
                                icon="expand_more"
                              />

                              <Text type={textTypes.HEADING.XS}>
                                {dateTimeCreated} {amount}
                              </Text>
                            </div>
                          </summary>

                          <div className={styles.Histories_grid_column}>
                            <Text
                              colorClass={colorClasses.NEUTRAL['400']}
                              type={textTypes.HEADING.XXS}
                            >
                              Product:
                            </Text>

                            <Text type={textTypes.HEADING.XXS}>{amount}</Text>
                          </div>
                        </details>
                      )
                  )}
                </div>

                <Pagination
                  className={styles.Histories_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);

                    router.push(`/seller/finance/histories?page=${value}`, {
                      scroll: false,
                    });
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.Histories_noResults}
                message="No records found"
              />
            )}
          </>
        )}
      </div>

      {isRequestModalOpen && (
        <RequestModal
          currentBalance={balanceAmount}
          handleClose={() => setIsRequestModalOpen(false)}
          isOpen={isRequestModalOpen}
          paymentMethod={clickedPaymentMethod}
          setBalanceAmount={setBalanceAmount}
          title="Request Withdrawal"
        />
      )}
    </>
  );
}
export default Histories;

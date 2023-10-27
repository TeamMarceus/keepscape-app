import React, { useState } from 'react';

import cn from 'classnames';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  buttonTypes,
  colorClasses,
  textTypes,
} from '@/app-globals';

import { 
  Button,
  Card, 
  ControlledInput, 
  Icon, 
  NoResults, 
  Text, 
  Pagination
} from '@/components';

import { useSellerWithdrawals, useWindowSize } from '@/hooks';

import IdModal from '@/screens/admin/CommonModals/IdModal';
import PaymentModal from '@/screens/common/Modals/PaymentModal';

import PreloaderWithdrawals from './Preloader';

import styles from './styles.module.scss';

function Withdrawals() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);

  const {
    isLoading: isWithdrawalsLoading, 
    withdrawals,
    totalPages,
  } = useSellerWithdrawals({page, pageSize: 10});

  const filteredRecords = withdrawals.filter((record) => {
      const searchLowerCase = search.toLowerCase();

      return (
        record.dateTimeCreated.toLowerCase().includes(searchLowerCase) ||
        record.status.toLowerCase().includes(searchLowerCase) ||
        record.paymentMethod.toLowerCase().includes(searchLowerCase)
      );
    }) 

  return (
    <>
      <div className={styles.Withdrawals}>
        <Text type={textTypes.HEADING.XS}>
          Withdrawals Made
        </Text>

        <ControlledInput
          className={styles.Withdrawals_search}
          icon="search"
          name="search"
          placeholder="You can search by Date Withdrawn, Status, or Payment Method"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isWithdrawalsLoading ? (
          <PreloaderWithdrawals />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredRecords.length ? (
              <>
                <div className={styles.Withdrawals_grid}>
                  {/* Header of OrderGrid starts here */}
                  <Card
                    className={cn(
                      styles.Withdrawals_grid_recordGrid,
                      styles.Withdrawals_grid_headers
                    )}
                  >
                    <div
                      className={cn(
                        styles.Withdrawals_grid_header,
                        styles.Withdrawals_grid_column
                      )}
                    >
                      Date Withdrawn
                    </div>

                    <div
                      className={cn(
                        styles.Withdrawals_grid_header,
                        styles.Withdrawals_grid_column
                      )}
                    >
                      Amount
                    </div>

                    <div
                      className={cn(
                        styles.Withdrawals_grid_header,
                        styles.Withdrawals_grid_column
                      )}
                    >
                      Status
                    </div>

                    <div
                      className={cn(
                        styles.Withdrawals_grid_header,
                        styles.Withdrawals_grid_column
                      )}
                    >
                      Remarks
                    </div>

                    <div
                      className={cn(
                        styles.Withdrawals_grid_header,
                        styles.Withdrawals_grid_column
                      )}
                    >
                      Payment
                    </div>

                    <div
                      className={cn(
                        styles.Withdrawals_grid_header,
                        styles.Withdrawals_grid_column,
                        styles.Withdrawals_grid_header_action,
                      )}
                    >
                      Paid Proof
                    </div>
                    
                    {/* Header of OrderGrid ends here */}
                  </Card>

                  {/* Body of OrderGrid starts here */}
                  {filteredRecords.map(
                    ({ id, dateTimeCreated, sellerName, amount, paymentDetails, paymentProfileImageUrl, 
                      paymentProofImageUrl, paymentMethod, remarks, status  }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.Withdrawals_grid_recordGrid}>
                          <div className={styles.Withdrawals_grid_column}>
                            {dateTimeCreated.split('T')[0]}
                          </div>

                          <Text 
                            className={styles.Withdrawals_grid_column}
                            colorClass={(() => {
                              if (status === 'Pending') {
                                return colorClasses.BLUE['300'];
                              } if (status === 'Paid') {
                                return colorClasses.GREEN['300'];
                              }

                              return colorClasses.RED['300'];
                            })()
                            }
                          >
                            {amount.toFixed(2)}
                          </Text>

                          <div className={styles.Withdrawals_grid_column}>
                            {status}
                          </div> 

                          <div className={styles.Withdrawals_grid_column}>
                            {remarks || '-'}
                          </div>              
                          <Button
                            className={styles.Withdrawals_info_text}
                            type={buttonTypes.TEXT.NEUTRAL}
                            onClick={() => {
                              setSelectedRecord({ id, paymentMethod, paymentDetails, 
                                paymentProfileImageUrl});
                              setIsPaymentModalOpen(true);
                            }}
                          >
                            {paymentMethod}
                          </Button>     

                         { status === 'Paid' ? (
                              //  eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions 
                              <img
                              alt="Payment Proof"
                              className={cn(styles.Withdrawals_grid_column, styles.Withdrawals_grid_column_proof)}
                              height={60}
                              src={paymentProofImageUrl}
                              width={60}
                              onClick={() => {
                                setIsProofModalOpen(true);
                                setSelectedRecord({ sellerName, paymentProofImageUrl })
                              }}
                            />

                           ) : (
                              <div className={styles.Withdrawals_grid_column}>
                                -
                              </div>
                           )}
                        </Card>
                      ) : (
                        // Mobile View
                        <details
                          key={id}
                          className={styles.Withdrawals_grid_recordGrid}
                        >
                          <summary className={styles.Finance_grid_title}>
                            <div className={styles.Finance_grid_title_info}>
                              <Icon
                                className={styles.Finance_grid_title_icon}
                                icon="expand_more"
                              />

                              <Text type={textTypes.HEADING.XS}>
                                {dateTimeCreated.split('T')[0]} {amount}
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

                            <Text type={textTypes.HEADING.XXS}>{amount}</Text>
                          </div>
                        </details>
                      )
                  )}
                  {/* Body of OrderGrid ends here */}
                </div>

                <Pagination 
                  className={styles.Withdrawals_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);

                    router.push(`/seller/finance/withdrawals?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.Withdrawals_noResults}
                message="No records found"
              />
            )}
          </>
        )}
      </div>

      {isPaymentModalOpen && (
        <PaymentModal
          handleClose={() => setIsPaymentModalOpen(false)}
          isOpen={isPaymentModalOpen}
          paymentDetails={selectedRecord.paymentDetails}
          paymentMethod={selectedRecord.paymentMethod}
          paymentProfileImageUrl={selectedRecord.paymentProfileImageUrl}
          title="Payment Details"
        />
      )}

      {isProofModalOpen &&
        <IdModal
          handleClose={() => setIsProofModalOpen(false)}
          image={selectedRecord.paymentProofImageUrl}
          isOpen={isProofModalOpen}
          title="Proof of Payment"
        />
      }
    </>
  )
}
export default Withdrawals;

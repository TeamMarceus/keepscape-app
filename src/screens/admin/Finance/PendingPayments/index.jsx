import React, { useState } from 'react';

import cn from 'classnames';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  buttonTypes,
  colorClasses,
  colorNames,
  iconButtonTypes,
  spinnerSizes,
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
  IconLink,
  Spinner,
  Pagination
} from '@/components';

import { useWindowSize, useWithdrawals } from '@/hooks';

import SellerModal from '../../CommonModals/SellerModal';

import PaymentModal from '../PaymentModal';

import PreloaderPendingPayments from '../Preloader';


import RejectModal from '../RejectModal';
import TrasnferModal from '../TransferModal';

import styles from './styles.module.scss';

function PendingPayments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState({});
  
  const {
    isLoading: isRecordsLoading,
    isUpdating: isUpdatingRecord, 
    withdrawals,
    totalPages, 
    updateWithdrawal,
  } = useWithdrawals({
    page,
    pageSize: 10,
    paymentStatus: 'Pending',
    search,
  })

  const filteredRecords = withdrawals.filter((record) => {
    const searchLowerCase = search.toLowerCase();

    return (
      record.sellerName.toLowerCase().includes(searchLowerCase) ||
      record.paymentMethod.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <>
      <div className={styles.PendingPayments}>
        <Text type={textTypes.HEADING.XS}>
          Pending Payments
        </Text>

        <ControlledInput
          className={styles.PendingPayments_search}
          icon="search"
          name="search"
          placeholder="You can search by Payment Method, Seller Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isRecordsLoading ? (
          <PreloaderPendingPayments />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredRecords.length ? (
              <>
                <div className={styles.PendingPayments_grid}>
                  <Card
                    className={cn(
                      styles.PendingPayments_grid_recordGrid,
                      styles.PendingPayments_grid_headers
                    )}
                  >
                    <div
                      className={cn(
                        styles.PendingPayments_grid_header,
                        styles.PendingPayments_grid_column
                      )}
                    >
                      Seller Name
                    </div>

                    <div
                      className={cn(
                        styles.PendingPayments_grid_header,
                        styles.PendingPayments_grid_column
                      )}
                    >
                      Full Name
                    </div>
                    
                    <div
                      className={cn(
                        styles.PendingPayments_grid_header,
                        styles.PendingPayments_grid_column
                      )}
                    >
                      Amount
                    </div>

                    <div
                      className={cn(
                        styles.PendingPayments_grid_header,
                        styles.PendingPayments_grid_column
                      )}
                    >
                      Payment Method
                    </div>

                    <div
                      className={cn(
                        styles.PendingPayments_grid_header,
                        styles.PendingPayments_grid_column
                      )}
                    >
                      Remarks
                    </div>

                    <div
                      className={cn(
                        styles.PendingPayments_grid_header,
                        styles.PendingPayments_grid_column
                      )}
                    >
                      Status
                    </div>


                    <div
                      className={cn(
                        styles.PendingPayments_grid_header,
                        styles.PendingPayments_grid_column,
                        styles.PendingPayments_grid_header_action,
                      )}
                    >
                      Actions
                    </div>
                    
                    {/* Header of OrderGrid ends here */}
                  </Card>

                  {filteredRecords.map(
                    ({ id, sellerId, sellerName, fullName, amount, paymentMethod, paymentDetails,
                      paymentProfileImageUrl, paymentProofImageUrl, remarks, status  }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.PendingPayments_grid_recordGrid}>
                          <Button
                            className={styles.ReviewOrders_info_text}
                            type={buttonTypes.TEXT.NEUTRAL}
                            onClick={() => {
                              setSelectedRecord({ id, sellerId, sellerName});
                              setIsSellerModalOpen(true);
                            }}
                          >
                            {sellerName}
                          </Button>

                          <div className={styles.PendingPayments_grid_column}>
                            {fullName}
                          </div>

                          <div className={styles.PendingPayments_grid_column}>
                            {amount}
                          </div>

                          <Button
                            className={styles.ReviewOrders_info_text}
                            type={buttonTypes.TEXT.NEUTRAL}
                            onClick={() => {
                              setSelectedRecord({ id, paymentMethod, paymentDetails, 
                                paymentProfileImageUrl, paymentProofImageUrl});
                              setIsPaymentModalOpen(true);
                            }}
                          >
                            {paymentMethod}
                          </Button>

                          <div className={styles.PendingPayments_grid_column}>
                            {remarks}
                          </div>

                          <div className={styles.PendingPayments_grid_column}>
                            {status}
                          </div>
                          
                          <div className={styles.PendingPayments_grid_column}>
                              {(!isUpdatingRecord && !selectedRecord.id) &&
                                <div className={styles.PendingPayments_grid_buttons}>
                                  <IconButton
                                    className={styles.PendingPayments_grid_payButton}
                                    icon="paid"
                                    type={iconButtonTypes.ICON.MD}
                                    onClick={() => {
                                      setSelectedRecord({ id });
                                      setIsTransferModalOpen(true);
                                    }}
                                  />

                                  <IconButton
                                    className={styles.PendingPayments_grid_cancelButton}
                                    icon="cancel"
                                    type={iconButtonTypes.ICON.MD}
                                    onClick={() => {
                                      setSelectedRecord({ id });
                                      setIsRejectModalOpen(true);
                                    }}
                                    />
                                </div>
                              }
                              {(isUpdatingRecord && selectedRecord.id === id) &&
                                <Spinner
                                  className={styles.PendingPayments_grid_buttons_spinner}
                                  colorName={colorNames.BLUE}
                                  size={spinnerSizes.MD}
                                />
                              }
                            </div>
                        </Card>
                      ) : (
                        // Mobile View
                        <details
                          key={id}
                          className={styles.PendingPayments_grid_recordGrid}
                        >
                          <summary className={styles.PendingPayments_grid_title}>
                            <div className={styles.PendingPayments_grid_title_info}>
                              <Icon
                                className={styles.PendingPayments_grid_title_icon}
                                icon="expand_more"
                              />

                              <Text type={textTypes.HEADING.XS}>
                                {sellerName}
                              </Text>
                            </div>
                          </summary>

                          <div className={styles.PendingPayments_grid_column}>
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
                </div>

                <Pagination 
                  className={styles.PendingPayments_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);
                    router.push(`/admin/finance/pending?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.PendingPayments_noResults}
                message="No records found"
              />
            )}
          </>
        )}

      </div>

      {isTransferModalOpen && (
        <TrasnferModal
          balanceWithdrawalId={selectedRecord.id}
          handleClose={() => setIsTransferModalOpen(false)}
          isOpen={isTransferModalOpen}
          isUpdating={isUpdatingRecord}
          title="Transfer Balance"
          updateWithdrawal={updateWithdrawal}
        />
      )}

      {isRejectModalOpen && (
        <RejectModal
          balanceWithdrawalId={selectedRecord.id}
          handleClose={() => setIsRejectModalOpen(false)}
          isOpen={isRejectModalOpen}
          isUpdating={isUpdatingRecord}
          title="Reject Withdrawal"
          updateWithdrawal={updateWithdrawal}
        />
      )}

      {isSellerModalOpen && (
        <SellerModal
          handleClose={() => setIsSellerModalOpen(false)}
          isOpen={isSellerModalOpen}
          sellerId={selectedRecord.sellerId}
          title={`${selectedRecord.sellerName} Details`}
        />
      )}

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
    </>
  )
}
export default PendingPayments;

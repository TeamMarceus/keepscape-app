import React, { useState } from 'react';

import cn from 'classnames';

import { useRouter, useSearchParams } from 'next/navigation';

import { buttonTypes, colorClasses, textTypes } from '@/app-globals';

import {
  Button,
  Card,
  ControlledInput,
  Icon,
  NoResults,
  Text,
  Pagination,
} from '@/components';

import { useWindowSize, useAdminWithdrawals } from '@/hooks';

import PaymentModal from '../../../common/Modals/PaymentModal';
import IdModal from '../../CommonModals/IdModal';
import SellerModal from '../../CommonModals/SellerModal';

import PreloaderPaidPayments from '../Preloader';

import styles from './styles.module.scss';

function PaidPayments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState({});

  const {
    isLoading: isRecordsLoading,
    withdrawals,
    totalPages,
  } = useAdminWithdrawals({
    page,
    pageSize: 10,
    paymentStatus: 'Paid',
    search,
  });

  const filteredRecords = withdrawals.filter((record) => {
    const searchLowerCase = search.toLowerCase();

    return (
      record.sellerName.toLowerCase().includes(searchLowerCase) ||
      record.paymentMethod.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <>
      <div className={styles.PaidPayments}>
        <Text type={textTypes.HEADING.XS}>Paid Payments</Text>

        <ControlledInput
          className={styles.PaidPayments_search}
          icon="search"
          name="search"
          placeholder="You can search by Seller Name or Payment Method"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isRecordsLoading ? (
          <PreloaderPaidPayments />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredRecords.length ? (
              <>
                <div className={styles.PaidPayments_grid}>
                  <Card
                    className={cn(
                      styles.PaidPayments_grid_recordGrid,
                      styles.PaidPayments_grid_headers
                    )}
                  >
                    <div
                      className={cn(
                        styles.PaidPayments_grid_header,
                        styles.PaidPayments_grid_column
                      )}
                    >
                      Date Paid
                    </div>

                    <div
                      className={cn(
                        styles.PaidPayments_grid_header,
                        styles.PaidPayments_grid_column
                      )}
                    >
                      Seller Name
                    </div>

                    <div
                      className={cn(
                        styles.PaidPayments_grid_header,
                        styles.PaidPayments_grid_column
                      )}
                    >
                      Full Name
                    </div>

                    <div
                      className={cn(
                        styles.PaidPayments_grid_header,
                        styles.PaidPayments_grid_column
                      )}
                    >
                      Amount
                    </div>

                    <div
                      className={cn(
                        styles.PaidPayments_grid_header,
                        styles.PaidPayments_grid_column
                      )}
                    >
                      Payment Method
                    </div>

                    <div
                      className={cn(
                        styles.PaidPayments_grid_header,
                        styles.PaidPayments_grid_column
                      )}
                    >
                      Remarks
                    </div>

                    <div
                      className={cn(
                        styles.PaidPayments_grid_header,
                        styles.PaidPayments_grid_column
                      )}
                    >
                      Status
                    </div>

                    <div
                      className={cn(
                        styles.PaidPayments_grid_header,
                        styles.PaidPayments_grid_column,
                        styles.PaidPayments_grid_header_action
                      )}
                    >
                      Paid Proof
                    </div>

                    {/* Header of OrderGrid ends here */}
                  </Card>

                  {filteredRecords.map(
                    ({
                      id,
                      dateTimeCreated,
                      sellerId,
                      sellerName,
                      fullName,
                      amount,
                      paymentMethod,
                      paymentDetails,
                      paymentProfileImageUrl,
                      paymentProofImageUrl,
                      remarks,
                      status,
                    }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card
                          key={id}
                          className={styles.PaidPayments_grid_recordGrid}
                        >
                          <div className={styles.PaidPayments_grid_column}>
                            {dateTimeCreated.split('T')[0]}
                          </div>

                          <Button
                            className={styles.ReviewOrders_info_text}
                            type={buttonTypes.TEXT.NEUTRAL}
                            onClick={() => {
                              setSelectedRecord({ id, sellerId, sellerName });
                              setIsSellerModalOpen(true);
                            }}
                          >
                            {sellerName}
                          </Button>

                          <div className={styles.PaidPayments_grid_column}>
                            {fullName}
                          </div>

                          <div className={styles.PaidPayments_grid_column}>
                            {amount}
                          </div>

                          <Button
                            className={styles.ReviewOrders_info_text}
                            type={buttonTypes.TEXT.NEUTRAL}
                            onClick={() => {
                              setSelectedRecord({
                                id,
                                paymentMethod,
                                paymentDetails,
                                paymentProfileImageUrl,
                                paymentProofImageUrl,
                              });
                              setIsPaymentModalOpen(true);
                            }}
                          >
                            {paymentMethod}
                          </Button>

                          <div className={styles.PaidPayments_grid_column}>
                            {remarks}
                          </div>

                          <div className={styles.PaidPayments_grid_column}>
                            {status}
                          </div>

                          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                          <img
                            alt="Payment Proof"
                            className={cn(
                              styles.PaidPayments_grid_column,
                              styles.PaidPayments_grid_column_proof
                            )}
                            height={60}
                            src={paymentProofImageUrl}
                            width={60}
                            onClick={() => {
                              setIsProofModalOpen(true);
                              setSelectedRecord({
                                sellerName,
                                paymentProofImageUrl,
                              });
                            }}
                          />
                        </Card>
                      ) : (
                        // Mobile View
                        <details
                          key={id}
                          className={styles.PaidPayments_grid_recordGrid}
                        >
                          <summary className={styles.PaidPayments_grid_title}>
                            <div
                              className={styles.PaidPayments_grid_title_info}
                            >
                              <Icon
                                className={styles.PaidPayments_grid_title_icon}
                                icon="expand_more"
                              />

                              <Text type={textTypes.HEADING.XS}>
                                {sellerName}
                              </Text>
                            </div>
                          </summary>

                          <div className={styles.PaidPayments_grid_column}>
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
                  className={styles.PaidPayments_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);
                    router.push(`/admin/finance/paid?page=${value}`, {
                      scroll: false,
                    });
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.PaidPayments_noResults}
                message="No records found"
              />
            )}
          </>
        )}
      </div>

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

      {isProofModalOpen && (
        <IdModal
          handleClose={() => setIsProofModalOpen(false)}
          image={selectedRecord.paymentProofImageUrl}
          isOpen={isProofModalOpen}
          title="Proof of Payment"
        />
      )}
    </>
  );
}
export default PaidPayments;

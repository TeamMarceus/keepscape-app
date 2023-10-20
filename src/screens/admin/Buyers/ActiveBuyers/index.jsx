import React, { useState } from 'react';

import cn from 'classnames';

import { useSearchParams, useRouter } from 'next/navigation';

import {
  colorClasses,
  iconButtonTypes,
  textTypes,
  userStatus,
} from '@/app-globals';

import { 
  IconButton, 
  Card, 
  ControlledInput, 
  Icon, 
  NoResults, 
  Text,
  Pagination, 
} from '@/components';

import { useBuyers, useWindowSize } from '@/hooks';

import ReasonModal from '../../Modals/ReasonModal';

import PreloaderActiveBuyers from '../Preloader';

import styles from './styles.module.scss';

function ActiveBuyers() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const buyerIdParam = searchParams.get('id');

  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;
  const [currentPage, setCurrentPage] = useState(page);
  const [search, setSearch] = useState('');

   const {
    isLoading: isActiveBuyersLoading, 
    buyers, 
    totalPages,
    isUpdating,
    updateBuyerStatus
   } = useBuyers({ page, pageSize: 10, isBanned: false, search, userId: buyerIdParam });

  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState({})

  const filteredActiveBuyers = buyers.filter((buyer) => {
    const searchLowerCase = search.toLowerCase();

    if (buyerIdParam && search === '') {
      return buyer.id === buyerIdParam;
    }

    return (
      buyer.firstName.toLowerCase().includes(searchLowerCase) ||
      buyer.lastName.toLowerCase().includes(searchLowerCase) ||
      buyer.email.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <>
      <div className={styles.ActiveBuyers}>
        <Text type={textTypes.HEADING.XS}>
          Active Buyers
        </Text>

        <ControlledInput
          className={styles.ActiveBuyers_search}
          icon="search"
          name="search"
          placeholder="You can search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isActiveBuyersLoading ? (
          <PreloaderActiveBuyers />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredActiveBuyers.length ? (
              <> 
                <div className={styles.ActiveBuyers_grid}>
                  {/* Header of OrderGrid starts here */}
                  <Card
                    className={cn(
                      styles.ActiveBuyers_grid_buyerGrid,
                      styles.ActiveBuyers_grid_headers
                    )}
                  >
                    <div
                      className={cn(
                        styles.ActiveBuyers_grid_header,
                        styles.ActiveBuyers_grid_column
                      )}
                    >
                      Date Created
                    </div>

                    <div
                      className={cn(
                        styles.ActiveBuyers_grid_header,
                        styles.ActiveBuyers_grid_column
                      )}
                    >
                      Full Name
                    </div>

                    <div
                      className={cn(
                        styles.ActiveBuyers_grid_header,
                        styles.ActiveBuyers_grid_column
                      )}
                    >
                      Email Address
                    </div>

                    <div
                      className={cn(
                        styles.ActiveBuyers_grid_header,
                        styles.ActiveBuyers_grid_column
                      )}
                    >
                      Mobile Number
                    </div>

                    <div
                      className={cn(
                        styles.ActiveBuyers_grid_header,
                        styles.ActiveBuyers_grid_column
                      )}
                    >
                      Description
                    </div>

                    <div
                      className={cn(
                        styles.ActiveBuyers_grid_header,
                        styles.ActiveBuyers_grid_column,
                        styles.ActiveBuyers_grid_header_action,
                      )}
                    >
                      Actions
                    </div>
                    
                    {/* Header of OrderGrid ends here */}
                  </Card>

                  {/* Body of OrderGrid starts here */}
                  {filteredActiveBuyers.map(
                    ({ id, dateTimeCreated, firstName, lastName, email, phoneNumber, description }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.ActiveBuyers_grid_buyerGrid}>
                          <div className={styles.ActiveBuyers_grid_column}>
                            {dateTimeCreated.split('T')[0]}
                          </div>

                          <div className={styles.ActiveBuyers_grid_column}>
                            {firstName} {lastName}
                          </div>
                            
                          <div className={styles.ActiveBuyers_grid_column}>
                            {email}
                          </div>

                          <div className={styles.ActiveBuyers_grid_column}>
                            {phoneNumber} 
                          </div>

                          <div className={styles.ActiveBuyers_grid_column}>
                            {description}
                          </div>

                          <div className={styles.ActiveBuyers_grid_column}>
                            <div className={styles.ActiveBuyers_grid_buttons}>
                              <IconButton
                                className={styles.ActiveBuyers_grid_button_ban}
                                icon="person_off"
                                type={iconButtonTypes.ICON.MD}
                                onClick={() => {
                                  setSelectedBuyer({ id, firstName, lastName});
                                  setIsReasonModalOpen(true);
                                }}
                              />
                            </div>
                          </div>
                        </Card>
                      ) : (
                        // Mobile View
                        <details
                          key={id}
                          className={styles.ActiveBuyers_grid_buyerGrid}
                        >
                          <summary className={styles.ActiveBuyers_grid_title}>
                            <div className={styles.ActiveBuyers_grid_title_info}>
                              <Icon
                                className={styles.ActiveBuyers_grid_title_icon}
                                icon="expand_more"
                              />

                              <Text type={textTypes.HEADING.XS}>
                                {dateTimeCreated.split('T')[0]} {firstName}
                              </Text>
                            </div>
                          </summary>

                          <div className={styles.ActiveBuyers_grid_column}>
                            <Text
                              colorClass={colorClasses.NEUTRAL['400']}
                              type={textTypes.HEADING.XXS}
                            >
                              SellerName:
                            </Text>

                            <Text type={textTypes.HEADING.XXS}>{firstName}</Text>
                          </div>
                        </details>
                      )
                  )}
                  {/* Body of OrderGrid ends here */}
                </div>

                <Pagination 
                  className={styles.ActiveBuyers_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);

                    router.push(`/admin/buyers/active?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.ActiveBuyers_noResults}
                message="No buyers found"
              />
            )}
          </>
        )}
      </div>

      {isReasonModalOpen &&
        <ReasonModal
          handleClose={() => setIsReasonModalOpen(false)}
          isOpen={isReasonModalOpen}
          isUpdating={isUpdating}
          status={userStatus.BANNED}
          title={`Reason for Banning ${selectedBuyer.firstName} ${selectedBuyer.lastName}`}
          updateUser={updateBuyerStatus}
          userId={selectedBuyer.id}
        />
      }
    </>
  )
}
export default ActiveBuyers;

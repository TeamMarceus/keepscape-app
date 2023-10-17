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

import PreloaderBuyers from './Preloader';

import styles from './styles.module.scss';

function Buyers() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const buyerIdParam = searchParams.get('id');

  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;
  const [currentPage, setCurrentPage] = useState(page);
  const {
    isLoading: isBuyersLoading, 
    buyers, 
    totalPages,
    updateBuyerStatus
   } = useBuyers({ page, pageSize: 10 });

  const [search, setSearch] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState({})

  const filteredBuyers = buyers.filter((buyer) => {
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
    <div className={styles.Buyers}>
      <Text type={textTypes.HEADING.XS}>
        Buyers
      </Text>

      <ControlledInput
        className={styles.Buyers_search}
        icon="search"
        name="search"
        placeholder="You can search by Name or Email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isBuyersLoading ? (
        <PreloaderBuyers />
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {filteredBuyers.length ? (
            <> 
              <div className={styles.Buyers_grid}>
                {/* Header of OrderGrid starts here */}
                <Card
                  className={cn(
                    styles.Buyers_grid_buyerGrid,
                    styles.Buyers_grid_headers
                  )}
                >
                  <div
                    className={cn(
                      styles.Buyers_grid_header,
                      styles.Buyers_grid_column
                    )}
                  >
                    Date Created
                  </div>

                  <div
                    className={cn(
                      styles.Buyers_grid_header,
                      styles.Buyers_grid_column
                    )}
                  >
                    Full Name
                  </div>

                  <div
                    className={cn(
                      styles.Buyers_grid_header,
                      styles.Buyers_grid_column
                    )}
                  >
                    Email Address
                  </div>

                  <div
                    className={cn(
                      styles.Buyers_grid_header,
                      styles.Buyers_grid_column
                    )}
                  >
                    Mobile Number
                  </div>

                  <div
                    className={cn(
                      styles.Buyers_grid_header,
                      styles.Buyers_grid_column
                    )}
                  >
                    Description
                  </div>

                  <div
                    className={cn(
                      styles.Buyers_grid_header,
                      styles.Buyers_grid_column,
                      styles.Buyers_grid_header_action,
                    )}
                  >
                    Actions
                  </div>
                  
                  {/* Header of OrderGrid ends here */}
                </Card>

                {/* Body of OrderGrid starts here */}
                {filteredBuyers.map(
                  ({ id, dateTimeCreated, firstName, lastName, email, phoneNumber, description, isBanned  }) =>
                    windowSize.width > 767 ? (
                      // Desktop View
                      <Card key={id} className={styles.Buyers_grid_buyerGrid}>
                        <div className={styles.Buyers_grid_column}>
                          {dateTimeCreated.split('T')[0]}
                        </div>

                        <div className={styles.Buyers_grid_column}>
                          {firstName} {lastName}
                        </div>
                          
                        <div className={styles.Buyers_grid_column}>
                          {email}
                        </div>

                        <div className={styles.Buyers_grid_column}>
                          {phoneNumber} 
                        </div>

                        <div className={styles.Buyers_grid_column}>
                          {description}
                        </div>

                        <div className={styles.Buyers_grid_column}>
                          <div className={styles.Buyers_grid_buttons}>
                            <IconButton
                              className={cn({
                                [styles.Buyers_grid_button_unban]: isBanned,
                                [styles.Buyers_grid_button_ban]: !isBanned,
                              })}
                              icon={isBanned ? 'how_to_reg' : 'person_off'}
                              type={iconButtonTypes.ICON.MD}
                              onClick={() => {
                                if (isBanned) {
                                  updateBuyerStatus(id, userStatus.ACTIVE);
                                } else {
                                  updateBuyerStatus(id, userStatus.BANNED);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    ) : (
                      // Mobile View
                      <details
                        key={id}
                        className={styles.Buyers_grid_buyerGrid}
                      >
                        <summary className={styles.Buyers_grid_title}>
                          <div className={styles.Buyers_grid_title_info}>
                            <Icon
                              className={styles.Buyers_grid_title_icon}
                              icon="expand_more"
                            />

                            <Text type={textTypes.HEADING.XS}>
                              {dateTimeCreated.split('T')[0]} {firstName}
                            </Text>
                          </div>
                        </summary>

                        <div className={styles.Buyers_grid_column}>
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
                className={styles.Buyers_pagination}
                currentPage={currentPage}
                pageJump={(value) => {
                  setCurrentPage(value);

                  router.push(`/admin/buyers?page=${value}`, { scroll: false })
                }}
                totalPages={totalPages}
              />
            </>
          ) : (
            <NoResults
              className={styles.Buyers_noResults}
              message="No buyers found"
            />
          )}
        </>
      )}

    </div>
  )
}
export default Buyers;

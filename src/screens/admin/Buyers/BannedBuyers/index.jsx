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
  ControlledTextArea,
} from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';
import { useBuyers, useWindowSize } from '@/hooks';

import PreloaderBannedBuyers from '../Preloader';

import styles from './styles.module.scss';

function BannedBuyers() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { windowSize } = useWindowSize();

  const page = searchParams.get('page') || 1;
  const [currentPage, setCurrentPage] = useState(page);
  const [search, setSearch] = useState('');

  const {
    isLoading: isBannedBuyersLoading,
    buyers,
    totalPages,
    updateBuyerStatus,
  } = useBuyers({ page, pageSize: 10, isBanned: true, search });

  const filteredBannedBuyers = buyers.filter((buyer) => {
    const searchLowerCase = search.toLowerCase();

    return (
      buyer.firstName.toLowerCase().includes(searchLowerCase) ||
      buyer.lastName.toLowerCase().includes(searchLowerCase) ||
      buyer.email.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <div className={styles.BannedBuyers}>
      <Text type={textTypes.HEADING.XS}>Banne dBuyers</Text>

      <ControlledInput
        className={styles.BannedBuyers_search}
        icon="search"
        name="search"
        placeholder="You can search by Name or Email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isBannedBuyersLoading ? (
        <PreloaderBannedBuyers />
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {filteredBannedBuyers.length ? (
            <>
              <div className={styles.BannedBuyers_grid}>
                {/* Header of OrderGrid starts here */}
                <Card
                  className={cn(
                    styles.BannedBuyers_grid_buyerGrid,
                    styles.BannedBuyers_grid_headers
                  )}
                >
                  <div
                    className={cn(
                      styles.BannedBuyers_grid_header,
                      styles.BannedBuyers_grid_column
                    )}
                  >
                    Date Created
                  </div>

                  <div
                    className={cn(
                      styles.BannedBuyers_grid_header,
                      styles.BannedBuyers_grid_column
                    )}
                  >
                    Full Name
                  </div>

                  <div
                    className={cn(
                      styles.BannedBuyers_grid_header,
                      styles.BannedBuyers_grid_column
                    )}
                  >
                    Email Address
                  </div>

                  <div
                    className={cn(
                      styles.BannedBuyers_grid_header,
                      styles.BannedBuyers_grid_column
                    )}
                  >
                    Mobile Number
                  </div>

                  <div
                    className={cn(
                      styles.BannedBuyers_grid_header,
                      styles.BannedBuyers_grid_column
                    )}
                  >
                    Description
                  </div>

                  <div
                    className={cn(
                      styles.BannedBuyers_grid_header,
                      styles.BannedBuyers_grid_column,
                      styles.BannedBuyers_grid_header_action
                    )}
                  >
                    Actions
                  </div>

                  {/* Header of OrderGrid ends here */}
                </Card>

                {/* Body of OrderGrid starts here */}
                {filteredBannedBuyers.map(
                  ({
                    id,
                    dateTimeCreated,
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    description,
                  }) =>
                    windowSize.width > 767 ? (
                      // Desktop View
                      <Card
                        key={id}
                        className={styles.BannedBuyers_grid_buyerGrid}
                      >
                        <div className={styles.BannedBuyers_grid_column}>
                          {dateTimeCreated.split('T')[0]}
                        </div>

                        <div className={styles.BannedBuyers_grid_column}>
                          {firstName} {lastName}
                        </div>

                        <div className={styles.BannedBuyers_grid_column}>
                          {email}
                        </div>

                        <div className={styles.BannedBuyers_grid_column}>
                          {phoneNumber}
                        </div>

                        <ControlledTextArea
                          disabled
                          inputClassName={cn(
                            styles.BannedBuyers_grid_column,
                            styles.BannedBuyers_grid_column_description
                          )}
                          name="description"
                          type={textAreaTypes.SLIM}
                          value={description}
                        />

                        <div className={styles.BannedBuyers_grid_column}>
                          <div className={styles.BannedBuyers_grid_buttons}>
                            <IconButton
                              className={styles.BannedBuyers_grid_button_unban}
                              icon="how_to_reg"
                              type={iconButtonTypes.ICON.MD}
                              onClick={() => {
                                updateBuyerStatus(id, userStatus.ACTIVE);
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    ) : (
                      // Mobile View
                      <details
                        key={id}
                        className={styles.BannedBuyers_grid_buyerGrid}
                      >
                        <summary className={styles.BannedBuyers_grid_title}>
                          <div className={styles.BannedBuyers_grid_title_info}>
                            <Icon
                              className={styles.BannedBuyers_grid_title_icon}
                              icon="expand_more"
                            />

                            <Text type={textTypes.HEADING.XS}>
                              {dateTimeCreated.split('T')[0]} {firstName}
                            </Text>
                          </div>
                        </summary>

                        <div className={styles.BannedBuyers_grid_column}>
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
                className={styles.BannedBuyers_pagination}
                currentPage={currentPage}
                pageJump={(value) => {
                  setCurrentPage(value);

                  router.push(`/admin/buyers/banned/?page=${value}`, {
                    scroll: false,
                  });
                }}
                totalPages={totalPages}
              />
            </>
          ) : (
            <NoResults
              className={styles.BannedBuyers_noResults}
              message="No buyers found"
            />
          )}
        </>
      )}
    </div>
  );
}
export default BannedBuyers;

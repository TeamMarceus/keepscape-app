import React, { useState } from 'react';

import cn from 'classnames';

import { useSearchParams, useRouter } from 'next/navigation';

import {
  colorClasses,
  iconButtonTypes,
  textTypes,
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

import { useWindowSize } from '@/hooks';

import GovernmentIdModal from '../GovernmentIdModal';

import PreloaderSellers from './Preloader';

import styles from './styles.module.scss';

const sellers = [
  {
    id: 'a23e4567-e89b-12d3-a456-426614174000',
    dateAccepted: '2021-08-01',
    fullName: 'John Doe',
    sellerName: 'Burger King',
    emailAddress: 'john@gmail.com',
    mobileNumber: '09123456789',
    governmentId: 'https://picsum.photos/200',
    description: 'I am a burger seller',
    isBanned: true,
  },
  {
    id: '2',
    dateAccepted: '2021-08-01',
    fullName: 'Jane Doe',
    sellerName: 'Hotdog King',
    emailAddress: 'john@gmail.com',
    mobileNumber: '09123456789',
    governmentId: 'https://picsum.photos/200',
    description: 'I am a burger seller',
    isBanned: true,
  },
  {
    id: '3',
    dateAccepted: '2021-08-01',
    fullName: 'Johnny Deep',
    sellerName: 'Donut King',
    emailAddress: 'john@gmail.com',
    mobileNumber: '09123456789',
    governmentId: 'https://picsum.photos/200',
    description: 'I am a burger seller',
    isBanned: false,
  },
];

function Sellers() {
  const searchParams = useSearchParams();
  const sellerIdParam = searchParams.get('id');
  const sellerNameParam = searchParams.get('name');
  const router = useRouter();

  const { windowSize } = useWindowSize();
  const isSellersLoading = false;

  const page = searchParams.get('page') || 1;
  const [currentPage, setCurrentPage] = useState(page);
  const totalPages = 10;

  const [search, setSearch] = useState('');
  const [isGovernmentIdModalOpen, setIsGovernmentIdModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState({})

  const filteredSellers = sellers.filter((seller) => {
    const searchLowerCase = search.toLowerCase();

    if (sellerIdParam && search === '') {
      return seller.id === sellerIdParam;
    }

    if (sellerNameParam && search === '') {
      return seller.sellerName === sellerNameParam;
    }

    return (
      seller.fullName.toLowerCase().includes(searchLowerCase) ||
      seller.sellerName.toLowerCase().includes(searchLowerCase) ||
      seller.emailAddress.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <>
      <div className={styles.Sellers}>
        <Text type={textTypes.HEADING.XS}>
          Sellers
        </Text>

        <ControlledInput
          className={styles.Sellers_search}
          icon="search"
          name="search"
          placeholder="You can search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isSellersLoading ? (
          <PreloaderSellers />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredSellers.length ? (
              <>
                <div className={styles.Sellers_grid}>
                  {/* Header of OrderGrid starts here */}
                  <Card
                    className={cn(
                      styles.Sellers_grid_sellerGrid,
                      styles.Sellers_grid_headers
                    )}
                  >
                    <div
                      className={cn(
                        styles.Sellers_grid_header,
                        styles.Sellers_grid_column
                      )}
                    >
                      Date Accepted
                    </div>

                    <div
                      className={cn(
                        styles.Sellers_grid_header,
                        styles.Sellers_grid_column
                      )}
                    >
                      Full Name
                    </div>

                    <div
                      className={cn(
                        styles.Sellers_grid_header,
                        styles.Sellers_grid_column
                      )}
                    >
                      Seller Name
                    </div>

                    <div
                      className={cn(
                        styles.Sellers_grid_header,
                        styles.Sellers_grid_column
                      )}
                    >
                      Email Address
                    </div>

                    <div
                      className={cn(
                        styles.Sellers_grid_header,
                        styles.Sellers_grid_column
                      )}
                    >
                      Mobile Number
                    </div>

                    <div
                      className={cn(
                        styles.Sellers_grid_header,
                        styles.Sellers_grid_column
                      )}
                    >
                      Description
                    </div>

                    <div
                      className={cn(
                        styles.Sellers_grid_header,
                        styles.Sellers_grid_column
                      )}
                    >
                      ID
                    </div>

                    <div
                      className={cn(
                        styles.Sellers_grid_header,
                        styles.Sellers_grid_column,
                        styles.Sellers_grid_header_action,
                      )}
                    >
                      Actions
                    </div>
                    
                    {/* Header of OrderGrid ends here */}
                  </Card>

                  {/* Body of OrderGrid starts here */}
                  {filteredSellers.map(
                    ({ id, dateAccepted, fullName, sellerName, emailAddress, mobileNumber, governmentId, description, isBanned  }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.Sellers_grid_sellerGrid}>
                          <div className={styles.Sellers_grid_column}>
                            {dateAccepted}
                          </div>

                          <div className={styles.Sellers_grid_column}>
                            {fullName}
                          </div>

                          <div className={styles.Sellers_grid_column}>
                            {sellerName}
                          </div>
                            
                          <div className={styles.Sellers_grid_column}>
                            {emailAddress}
                          </div>

                          <div className={styles.Sellers_grid_column}>
                            {mobileNumber}
                          </div>

                          <div className={styles.Sellers_grid_column}>
                            {description}
                          </div>

                          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                          <img
                            alt="Government Id"
                            className={cn(styles.Sellers_grid_column, styles.Sellers_grid_column_id)}
                            height={60}
                            src={governmentId}
                            width={60}
                            onClick={() => {
                              setIsGovernmentIdModalOpen(true);
                              setSelectedSeller({ sellerName, governmentId })
                            }}
                          />

                          <div className={styles.Sellers_grid_column}>
                            <div className={styles.Sellers_grid_buttons}>
                              <IconButton
                                className={cn({
                                  [styles.Sellers_grid_button_unban]: isBanned,
                                  [styles.Sellers_grid_button_ban]: !isBanned,
                                })}
                                icon={isBanned ? 'how_to_reg' : 'person_off'}
                                type={iconButtonTypes.ICON.MD}
                                onClick={() => {
                                }}
                              />
                            </div>
                          </div>
                        </Card>
                      ) : (
                        // Mobile View
                        <details
                          key={id}
                          className={styles.Sellers_grid_sellerGrid}
                        >
                          <summary className={styles.Sellers_grid_title}>
                            <div className={styles.Sellers_grid_title_info}>
                              <Icon
                                className={styles.Sellers_grid_title_icon}
                                icon="expand_more"
                              />

                              <Text type={textTypes.HEADING.XS}>
                                {dateAccepted} {fullName}
                              </Text>
                            </div>
                          </summary>

                          <div className={styles.Sellers_grid_column}>
                            <Text
                              colorClass={colorClasses.NEUTRAL['400']}
                              type={textTypes.HEADING.XXS}
                            >
                              SellerName:
                            </Text>

                            <Text type={textTypes.HEADING.XXS}>{sellerName}</Text>
                          </div>
                        </details>
                      )
                  )}
                  {/* Body of OrderGrid ends here */}
                </div>

                <Pagination 
                  className={styles.Sellers_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);

                    router.push(`/admin/sellers?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.Sellers_noResults}
                message="No applications found"
              />
            )}
          </>
        )}

      </div>

      {isGovernmentIdModalOpen &&
        <GovernmentIdModal
          governmentId={selectedSeller.governmentId}
          handleClose={() => setIsGovernmentIdModalOpen(false)}
          isOpen={isGovernmentIdModalOpen}
          title={`${selectedSeller.sellerName} Government ID`}
        />
      }
    </>
  )
}
export default Sellers;

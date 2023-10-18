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

import { useSellers, useWindowSize } from '@/hooks';

import IdModal from '../Modals/IdModal';

import ReasonModal from '../Modals/ReasonModal';

import PreloaderSellers from './Preloader';

import styles from './styles.module.scss';

function Sellers() {
  const router = useRouter();
  const { windowSize } = useWindowSize();
  const searchParams = useSearchParams();

  const sellerIdParam = searchParams.get('id');
  const sellerNameParam = searchParams.get('name');
  
  const page = searchParams.get('page') || 1;
  const [currentPage, setCurrentPage] = useState(page);

  const {
    isLoading: isSellersLoading, 
    sellers, 
    totalPages,
    isUpdating,
    updateSellerStatus
   } = useSellers({ page, pageSize: 10 });

  const [search, setSearch] = useState('');
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [isBusinessPermitModalOpen, setIsBusinessPermitModalOpen] = useState(false);
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
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
      seller.firstName.toLowerCase().includes(searchLowerCase) ||
      seller.lastName.toLowerCase().includes(searchLowerCase) ||
      seller.sellerName.toLowerCase().includes(searchLowerCase) ||
      seller.email.toLowerCase().includes(searchLowerCase)
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
                        styles.Sellers_grid_column
                      )}
                    >
                      Permit
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
                    ({ id, dateTimeCreated, firstName, lastName, sellerName, email, phoneNumber, description, idImageUrl, businessPermitUrl, isBanned  }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.Sellers_grid_sellerGrid}>
                          <div className={styles.Sellers_grid_column}>
                            {dateTimeCreated.split('T')[0]}
                          </div>

                          <div className={styles.Sellers_grid_column}>
                            {firstName} {lastName}
                          </div>

                          <div className={styles.Sellers_grid_column}>
                            {sellerName}
                          </div>
                            
                          <div className={styles.Sellers_grid_column}>
                            {email}
                          </div>

                          <div className={styles.Sellers_grid_column}>
                            {phoneNumber} 
                          </div>

                          <div className={styles.Sellers_grid_column}>
                            {description}
                          </div>

                          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                          <img
                            alt="Government Id"
                            className={cn(styles.Sellers_grid_column, styles.Sellers_grid_column_id)}
                            height={60}
                            src={idImageUrl}
                            width={60}
                            onClick={() => {
                              setIsIdModalOpen(true);
                              setSelectedSeller({ sellerName, idImageUrl })
                            }}
                          />

                          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                          <img
                            alt="Business Permit"
                            className={cn(styles.Sellers_grid_column, styles.Sellers_grid_column_id)}
                            height={60}
                            src={businessPermitUrl}
                            width={60}
                            onClick={() => {
                              setIsBusinessPermitModalOpen(true);
                              setSelectedSeller({ sellerName, businessPermitUrl })
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
                                  if (isBanned) {
                                    updateSellerStatus(id, userStatus.ACTIVE);
                                  } else {
                                    setSelectedSeller({ id, sellerName });
                                    setIsReasonModalOpen(true);
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
                          className={styles.Sellers_grid_sellerGrid}
                        >
                          <summary className={styles.Sellers_grid_title}>
                            <div className={styles.Sellers_grid_title_info}>
                              <Icon
                                className={styles.Sellers_grid_title_icon}
                                icon="expand_more"
                              />

                              <Text type={textTypes.HEADING.XS}>
                                {dateTimeCreated.split('T')[0]} {firstName}
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

      {isIdModalOpen &&
        <IdModal
          handleClose={() => setIsIdModalOpen(false)}
          image={selectedSeller.idImageUrl}
          isOpen={isIdModalOpen}
          title={`${selectedSeller.sellerName} ID`}
        />
      }

      {isBusinessPermitModalOpen &&
        <IdModal
          handleClose={() => setIsBusinessPermitModalOpen(false)}
          image={selectedSeller.businessPermitUrl}
          isOpen={isBusinessPermitModalOpen}
          title={`${selectedSeller.sellerName} Business Permit`}
        />
      }

      {isReasonModalOpen &&
        <ReasonModal
          handleClose={() => setIsReasonModalOpen(false)}
          isOpen={isReasonModalOpen}
          isUpdating={isUpdating}
          status={userStatus.BANNED}
          title={`Reason for Banning ${selectedSeller.sellerName}`}
          updateUser={updateSellerStatus}
          userId={selectedSeller.id}
        />
      }
    </>
  )
}
export default Sellers;

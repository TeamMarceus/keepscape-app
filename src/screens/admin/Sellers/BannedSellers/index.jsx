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
import { useSellers, useWindowSize } from '@/hooks';

import IdModal from '../../CommonModals/IdModal';

import PreloaderBannedSellers from '../Preloader';

import styles from './styles.module.scss';

function BannedSellers() {
  const router = useRouter();
  const { windowSize } = useWindowSize();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') || 1;
  const [currentPage, setCurrentPage] = useState(page);
  const [search, setSearch] = useState('');

  const {
    isLoading: isBannedSellersLoading,
    sellers,
    totalPages,
    updateSellerStatus,
  } = useSellers({ page, pageSize: 10, isBanned: true, search });

  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [isBusinessPermitModalOpen, setIsBusinessPermitModalOpen] =
    useState(false);
  const [selectedSeller, setSelectedSeller] = useState({});

  const filteredBannedSellers = sellers.filter((seller) => {
    const searchLowerCase = search.toLowerCase();

    return (
      seller.firstName.toLowerCase().includes(searchLowerCase) ||
      seller.lastName.toLowerCase().includes(searchLowerCase) ||
      seller.sellerName.toLowerCase().includes(searchLowerCase) ||
      seller.email.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <>
      <div className={styles.BannedSellers}>
        <Text type={textTypes.HEADING.XS}>Banned Sellers</Text>

        <ControlledInput
          className={styles.BannedSellers_search}
          icon="search"
          name="search"
          placeholder="You can search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isBannedSellersLoading ? (
          <PreloaderBannedSellers />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredBannedSellers.length ? (
              <>
                <div className={styles.BannedSellers_grid}>
                  {/* Header of OrderGrid starts here */}
                  <Card
                    className={cn(
                      styles.BannedSellers_grid_sellerGrid,
                      styles.BannedSellers_grid_headers
                    )}
                  >
                    <div
                      className={cn(
                        styles.BannedSellers_grid_header,
                        styles.BannedSellers_grid_column
                      )}
                    >
                      Date Accepted
                    </div>

                    <div
                      className={cn(
                        styles.BannedSellers_grid_header,
                        styles.BannedSellers_grid_column
                      )}
                    >
                      Full Name
                    </div>

                    <div
                      className={cn(
                        styles.BannedSellers_grid_header,
                        styles.BannedSellers_grid_column
                      )}
                    >
                      Seller Name
                    </div>

                    <div
                      className={cn(
                        styles.BannedSellers_grid_header,
                        styles.BannedSellers_grid_column
                      )}
                    >
                      Email Address
                    </div>

                    <div
                      className={cn(
                        styles.BannedSellers_grid_header,
                        styles.BannedSellers_grid_column
                      )}
                    >
                      Mobile Number
                    </div>

                    <div
                      className={cn(
                        styles.BannedSellers_grid_header,
                        styles.BannedSellers_grid_column
                      )}
                    >
                      Description
                    </div>

                    <div
                      className={cn(
                        styles.BannedSellers_grid_header,
                        styles.BannedSellers_grid_column
                      )}
                    >
                      ID
                    </div>

                    <div
                      className={cn(
                        styles.BannedSellers_grid_header,
                        styles.BannedSellers_grid_column
                      )}
                    >
                      Permit
                    </div>

                    <div
                      className={cn(
                        styles.BannedSellers_grid_header,
                        styles.BannedSellers_grid_column,
                        styles.BannedSellers_grid_header_action
                      )}
                    >
                      Actions
                    </div>

                    {/* Header of OrderGrid ends here */}
                  </Card>

                  {/* Body of OrderGrid starts here */}
                  {filteredBannedSellers.map(
                    ({
                      id,
                      dateTimeCreated,
                      firstName,
                      lastName,
                      sellerName,
                      email,
                      phoneNumber,
                      description,
                      idImageUrl,
                      businessPermitUrl,
                    }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card
                          key={id}
                          className={styles.BannedSellers_grid_sellerGrid}
                        >
                          <div className={styles.BannedSellers_grid_column}>
                            {dateTimeCreated.split('T')[0]}
                          </div>

                          <div className={styles.BannedSellers_grid_column}>
                            {firstName} {lastName}
                          </div>

                          <div className={styles.BannedSellers_grid_column}>
                            {sellerName}
                          </div>

                          <div className={styles.BannedSellers_grid_column}>
                            {email}
                          </div>

                          <div className={styles.BannedSellers_grid_column}>
                            {phoneNumber}
                          </div>

                          <ControlledTextArea
                            disabled
                            inputClassName={cn(
                              styles.BannedSellers_grid_column,
                              styles.BannedSellers_grid_column_description
                            )}
                            name="description"
                            type={textAreaTypes.SLIM}
                            value={description}
                          />

                          {/* eslint-disable-next-line @next/next/no-img-element, 
                          jsx-a11y/click-events-have-key-events, 
                          jsx-a11y/no-noninteractive-element-interactions */}
                          <img
                            alt="Government Id"
                            className={cn(
                              styles.BannedSellers_grid_column,
                              styles.BannedSellers_grid_column_id
                            )}
                            height={60}
                            src={idImageUrl}
                            width={60}
                            onClick={() => {
                              setIsIdModalOpen(true);
                              setSelectedSeller({ sellerName, idImageUrl });
                            }}
                          />

                          {/* eslint-disable-next-line @next/next/no-img-element,
                          jsx-a11y/click-events-have-key-events, 
                          jsx-a11y/no-noninteractive-element-interactions */}
                          <img
                            alt="Business Permit"
                            className={cn(
                              styles.BannedSellers_grid_column,
                              styles.BannedSellers_grid_column_id
                            )}
                            height={60}
                            src={businessPermitUrl}
                            width={60}
                            onClick={() => {
                              setIsBusinessPermitModalOpen(true);
                              setSelectedSeller({
                                sellerName,
                                businessPermitUrl,
                              });
                            }}
                          />

                          <div className={styles.BannedSellers_grid_column}>
                            <div className={styles.BannedSellers_grid_buttons}>
                              <IconButton
                                className={
                                  styles.BannedSellers_grid_button_unban
                                }
                                icon="how_to_reg"
                                type={iconButtonTypes.ICON.MD}
                                onClick={() => {
                                  updateSellerStatus(id, userStatus.ACTIVE);
                                }}
                              />
                            </div>
                          </div>
                        </Card>
                      ) : (
                        // Mobile View
                        <details
                          key={id}
                          className={styles.BannedSellers_grid_sellerGrid}
                        >
                          <summary className={styles.BannedSellers_grid_title}>
                            <div
                              className={styles.BannedSellers_grid_title_info}
                            >
                              <Icon
                                className={styles.BannedSellers_grid_title_icon}
                                icon="expand_more"
                              />

                              <Text type={textTypes.HEADING.XS}>
                                {dateTimeCreated.split('T')[0]} {firstName}
                              </Text>
                            </div>
                          </summary>

                          <div className={styles.BannedSellers_grid_column}>
                            <Text
                              colorClass={colorClasses.NEUTRAL['400']}
                              type={textTypes.HEADING.XXS}
                            >
                              SellerName:
                            </Text>

                            <Text type={textTypes.HEADING.XXS}>
                              {sellerName}
                            </Text>
                          </div>
                        </details>
                      )
                  )}
                  {/* Body of OrderGrid ends here */}
                </div>

                <Pagination
                  className={styles.BannedSellers_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);

                    router.push(`/admin/sellers/banned?page=${value}`, {
                      scroll: false,
                    });
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.BannedSellers_noResults}
                message="No applications found"
              />
            )}
          </>
        )}
      </div>

      {isIdModalOpen && (
        <IdModal
          handleClose={() => setIsIdModalOpen(false)}
          image={selectedSeller.idImageUrl}
          isOpen={isIdModalOpen}
          title={`${selectedSeller.sellerName} ID`}
        />
      )}

      {isBusinessPermitModalOpen && (
        <IdModal
          handleClose={() => setIsBusinessPermitModalOpen(false)}
          image={selectedSeller.businessPermitUrl}
          isOpen={isBusinessPermitModalOpen}
          title={`${selectedSeller.sellerName} Business Permit`}
        />
      )}
    </>
  );
}
export default BannedSellers;

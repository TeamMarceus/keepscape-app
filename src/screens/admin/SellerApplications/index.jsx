import React, { useState } from 'react';

import cn from 'classnames';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  buttonTypes,
  colorClasses,
  iconButtonTypes,
  textTypes,
  userStatus,
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
  Pagination
} from '@/components';

import { useSellerApplications, useWindowSize } from '@/hooks';

import GovernmentIdModal from '../GovernmentIdModal';

import PreloaderSellerApplications from './Preloader';

import styles from './styles.module.scss';

function SellerApplications() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();
  const [search, setSearch] = useState('');
  const [isGovernmentIdModalOpen, setIsGovernmentIdModalOpen] = useState(false);

  const page = searchParams.get('page') || 1;
  const [currentPage, setCurrentPage] = useState(page);

  const {
    isLoading: isApplicationsLoading, 
    sellerApplications, 
    totalPages,
    updateSellerApplication 
  } = useSellerApplications({ page: currentPage, pageSize: 10});

  const [selectedApplication, setSelectedApplication] = useState({})

  const filteredApplications = sellerApplications.filter((application) => {
    const searchLowerCase = search.toLowerCase();

    return (
      application.firstName.toLowerCase().includes(searchLowerCase) ||
      application.lastName.toLowerCase().includes(searchLowerCase) ||
      application.sellerName.toLowerCase().includes(searchLowerCase) ||
      application.email.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <>
      <div className={styles.SellerApplications}>
        <Text type={textTypes.HEADING.XS}>
          Seller Applications
        </Text>

        <ControlledInput
          className={styles.SellerApplications_search}
          icon="search"
          name="search"
          placeholder="You can search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isApplicationsLoading ? (
          <PreloaderSellerApplications />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredApplications.length ? (
              <>
                <div className={styles.SellerApplications_grid}>
                  {/* Header of OrderGrid starts here */}
                  <Card
                    className={cn(
                      styles.SellerApplications_grid_applicationGrid,
                      styles.SellerApplications_grid_headers
                    )}
                  >
                    <div
                      className={cn(
                        styles.SellerApplications_grid_header,
                        styles.SellerApplications_grid_column
                      )}
                    >
                      Date Applied
                    </div>

                    <div
                      className={cn(
                        styles.SellerApplications_grid_header,
                        styles.SellerApplications_grid_column
                      )}
                    >
                      Full Name
                    </div>

                    <div
                      className={cn(
                        styles.SellerApplications_grid_header,
                        styles.SellerApplications_grid_column
                      )}
                    >
                      Seller Name
                    </div>

                    <div
                      className={cn(
                        styles.SellerApplications_grid_header,
                        styles.SellerApplications_grid_column
                      )}
                    >
                      Email Address
                    </div>

                    <div
                      className={cn(
                        styles.SellerApplications_grid_header,
                        styles.SellerApplications_grid_column
                      )}
                    >
                      Mobile Number
                    </div>

                    <div
                      className={cn(
                        styles.SellerApplications_grid_header,
                        styles.SellerApplications_grid_column
                      )}
                    >
                      Description
                    </div>

                    <div
                      className={cn(
                        styles.SellerApplications_grid_header,
                        styles.SellerApplications_grid_column
                      )}
                    >
                      ID
                    </div>

                    <div
                      className={cn(
                        styles.SellerApplications_grid_header,
                        styles.SellerApplications_grid_column,
                        styles.SellerApplications_grid_header_action,
                      )}
                    >
                      Actions
                    </div>
                    
                    {/* Header of OrderGrid ends here */}
                  </Card>

                  {/* Body of OrderGrid starts here */}
                  {filteredApplications.map(
                    ({ id, dateTimeCreated, firstName, lastName, sellerName, email, phoneNumber, idUrl, description  }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.SellerApplications_grid_applicationGrid}>
                          <div className={styles.SellerApplications_grid_column}>
                            {dateTimeCreated.split('T')[0]}
                          </div>

                          <div className={styles.SellerApplications_grid_column}>
                            {firstName} {lastName}
                          </div>

                          <div className={styles.SellerApplications_grid_column}>
                            {sellerName}
                          </div>
                            
                          <div className={styles.SellerApplications_grid_column}>
                            {email}
                          </div>

                          <div className={styles.SellerApplications_grid_column}>
                            {phoneNumber}
                          </div>

                          <div className={styles.SellerApplications_grid_column}>
                            {description}
                          </div>

                          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                          <img
                            alt="Government Id"
                            className={cn(styles.SellerApplications_grid_column, styles.SellerApplications_grid_column_id)}
                            height={60}
                            src={idUrl}
                            width={60}
                            onClick={() => {
                              setIsGovernmentIdModalOpen(true);
                              setSelectedApplication({ sellerName, idUrl })
                            }}
                          />

                          <div className={styles.SellerApplications_grid_column}>
                            <div className={styles.SellerApplications_grid_buttons}>
                              <IconButton
                                className={styles.SellerApplications_grid_checkButton}
                                icon="check_circle"
                                type={iconButtonTypes.ICON.MD}
                                onClick={() => {
                                  updateSellerApplication(id, userStatus.APPROVED);
                                }}
                              />

                              <IconButton
                                className={styles.SellerApplications_grid_closeButton}
                                icon="cancel"
                                type={iconButtonTypes.ICON.MD}
                                onClick={() => {
                                  updateSellerApplication(id, userStatus.REJECTED);
                                }}
                              />
                            </div>
                          </div>
                        </Card>
                      ) : (
                        // Mobile View
                        <details
                          key={id}
                          className={styles.SellerApplications_grid_applicationGrid}
                        >
                          <summary className={styles.SellerApplications_grid_title}>
                            <div className={styles.SellerApplications_grid_title_info}>
                              <Icon
                                className={styles.SellerApplications_grid_title_icon}
                                icon="expand_more"
                              />

                              <Text type={textTypes.HEADING.XS}>
                                {/* {dateApplied} {fullName} */}
                              </Text>
                            </div>
                          </summary>

                          <div className={styles.SellerApplications_grid_column}>
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
                  className={styles.SellerApplications_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);

                    router.push(`/admin/seller-applications?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.SellerApplications_noResults}
                message="No applications found"
              />
            )}
          </>
        )}
      </div>

      {isGovernmentIdModalOpen &&
        <GovernmentIdModal
          governmentId={selectedApplication.idUrl}
          handleClose={() => setIsGovernmentIdModalOpen(false)}
          isOpen={isGovernmentIdModalOpen}
          title={`${selectedApplication.sellerName} ID`}
        />
      }
    </>
  )
}
export default SellerApplications;

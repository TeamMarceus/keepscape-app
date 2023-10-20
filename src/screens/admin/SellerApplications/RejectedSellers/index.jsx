import React, { useState } from 'react';

import cn from 'classnames';

import { useRouter, useSearchParams } from 'next/navigation';

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
  Pagination
} from '@/components';

import { useSellerApplications, useWindowSize } from '@/hooks';

import IdModal from '../../Modals/IdModal';

import PreloaderRejectedSellers from '../Preloader';

import styles from './styles.module.scss';

function RejectedSellers() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { windowSize } = useWindowSize();
  const [search, setSearch] = useState('');
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [isBusinessPermitModalOpen, setIsBusinessPermitModalOpen] = useState(false);

  const page = searchParams.get('page') || 1;
  const [currentPage, setCurrentPage] = useState(page);

  const {
    isLoading: isApplicationsLoading, 
    sellerApplications, 
    totalPages,
    updateSellerApplication 
  } = useSellerApplications({ page: currentPage, pageSize: 10, applicationStatus: 'Rejected'});

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
      <div className={styles.RejectedSellers}>
        <Text type={textTypes.HEADING.XS}>
          Rejected Seller Applications
        </Text>

        <ControlledInput
          className={styles.RejectedSellers_search}
          icon="search"
          name="search"
          placeholder="You can search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isApplicationsLoading ? (
          <PreloaderRejectedSellers />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {filteredApplications.length ? (
              <>
                <div className={styles.RejectedSellers_grid}>
                  {/* Header of OrderGrid starts here */}
                  <Card
                    className={cn(
                      styles.RejectedSellers_grid_applicationGrid,
                      styles.RejectedSellers_grid_headers
                    )}
                  >
                    <div
                      className={cn(
                        styles.RejectedSellers_grid_header,
                        styles.RejectedSellers_grid_column
                      )}
                    >
                      Date Applied
                    </div>

                    <div
                      className={cn(
                        styles.RejectedSellers_grid_header,
                        styles.RejectedSellers_grid_column
                      )}
                    >
                      Full Name
                    </div>

                    <div
                      className={cn(
                        styles.RejectedSellers_grid_header,
                        styles.RejectedSellers_grid_column
                      )}
                    >
                      Seller Name
                    </div>

                    <div
                      className={cn(
                        styles.RejectedSellers_grid_header,
                        styles.RejectedSellers_grid_column
                      )}
                    >
                      Email Address
                    </div>

                    <div
                      className={cn(
                        styles.RejectedSellers_grid_header,
                        styles.RejectedSellers_grid_column
                      )}
                    >
                      Mobile Number
                    </div>

                    <div
                      className={cn(
                        styles.RejectedSellers_grid_header,
                        styles.RejectedSellers_grid_column
                      )}
                    >
                      Description
                    </div>

                    <div
                      className={cn(
                        styles.RejectedSellers_grid_header,
                        styles.RejectedSellers_grid_column
                      )}
                    >
                      ID
                    </div>

                    <div
                      className={cn(
                        styles.RejectedSellers_grid_header,
                        styles.RejectedSellers_grid_column
                      )}
                    >
                      Permit
                    </div>

                    <div
                      className={cn(
                        styles.RejectedSellers_grid_header,
                        styles.RejectedSellers_grid_column,
                        styles.RejectedSellers_grid_header_action,
                      )}
                    >
                      Actions
                    </div>
                    
                    {/* Header of OrderGrid ends here */}
                  </Card>

                  {/* Body of OrderGrid starts here */}
                  {filteredApplications.map(
                    ({ id, dateTimeCreated, firstName, lastName, sellerName, email, phoneNumber, idImageUrl, businessPermitUrl, description  }) =>
                      windowSize.width > 767 ? (
                        // Desktop View
                        <Card key={id} className={styles.RejectedSellers_grid_applicationGrid}>
                          <div className={styles.RejectedSellers_grid_column}>
                            {dateTimeCreated.split('T')[0]}
                          </div>

                          <div className={styles.RejectedSellers_grid_column}>
                            {firstName} {lastName}
                          </div>

                          <div className={styles.RejectedSellers_grid_column}>
                            {sellerName}
                          </div>
                            
                          <div className={styles.RejectedSellers_grid_column}>
                            {email}
                          </div>

                          <div className={styles.RejectedSellers_grid_column}>
                            {phoneNumber}
                          </div>

                          <div className={styles.RejectedSellers_grid_column}>
                            {description}
                          </div>

                           {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                           <img
                            alt="Valid Id"
                            className={cn(styles.RejectedSellers_grid_column, styles.RejectedSellers_grid_column_id)}
                            height={60}
                            src={idImageUrl}
                            width={60}
                            onClick={() => {
                              setIsIdModalOpen(true);
                              setSelectedApplication({ sellerName, idImageUrl })
                            }}
                          />

                          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                          <img
                            alt="Business Permit"
                            className={cn(styles.RejectedSellers_grid_column, styles.RejectedSellers_grid_column_id)}
                            height={60}
                            src={businessPermitUrl}
                            width={60}
                            onClick={() => {
                              setIsBusinessPermitModalOpen(true);
                              setSelectedApplication({ sellerName, businessPermitUrl })
                            }}
                          />

                          <div className={styles.RejectedSellers_grid_column}>
                            <IconButton
                              className={styles.RejectedSellers_grid_checkButton}
                              icon="check_circle"
                              type={iconButtonTypes.ICON.MD}
                              onClick={() => {
                                updateSellerApplication(id, userStatus.APPROVED);
                              }}
                            />
                          </div>
                        </Card>
                      ) : (
                        // Mobile View
                        <details
                          key={id}
                          className={styles.RejectedSellers_grid_applicationGrid}
                        >
                          <summary className={styles.RejectedSellers_grid_title}>
                            <div className={styles.RejectedSellers_grid_title_info}>
                              <Icon
                                className={styles.RejectedSellers_grid_title_icon}
                                icon="expand_more"
                              />

                              <Text type={textTypes.HEADING.XS}>
                                {/* {dateApplied} {fullName} */}
                              </Text>
                            </div>
                          </summary>

                          <div className={styles.RejectedSellers_grid_column}>
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
                  className={styles.RejectedSellers_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);

                    router.push(`/admin/seller-applications/rejected?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.RejectedSellers_noResults}
                message="No applications found"
              />
            )}
          </>
        )}
      </div>

      {isIdModalOpen &&
        <IdModal
          handleClose={() => setIsIdModalOpen(false)}
          image={selectedApplication.idImageUrl}
          isOpen={isIdModalOpen}
          title={`${selectedApplication.sellerName} ID`}
        />
      }

      {isBusinessPermitModalOpen &&
        <IdModal
          handleClose={() => setIsBusinessPermitModalOpen(false)}
          image={selectedApplication.businessPermitUrl}
          isOpen={isBusinessPermitModalOpen}
          title={`${selectedApplication.sellerName} Business Permit`}
        />
      }
    </>
  )
}
export default RejectedSellers;
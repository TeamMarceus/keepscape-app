import React, { useState } from 'react';

import cn from 'classnames';

import {
  buttonTypes,
  colorClasses,
  iconButtonTypes,
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
  IconLink
} from '@/components';

import { useWindowSize } from '@/hooks';

import GovernmentIdModal from '../GovernmentIdModal';

import PreloaderSellerApplications from './Preloader';

import styles from './styles.module.scss';

const applications = [
  {
    id: '1',
    dateApplied: '2021-08-01',
    fullName: 'John Doe',
    sellerName: 'Burger King',
    emailAddress: 'john@gmail.com',
    mobileNumber: '09123456789',
    governmentId: 'https://picsum.photos/200',
    description: 'I am a burger seller',
  },
  {
    id: '2',
    dateApplied: '2021-08-01',
    fullName: 'Jane Doe',
    sellerName: 'Hotdog King',
    emailAddress: 'john@gmail.com',
    mobileNumber: '09123456789',
    governmentId: 'https://picsum.photos/200',
    description: 'I am a burger seller',
  },
  {
    id: '3',
    dateApplied: '2021-08-01',
    fullName: 'Johnny Deep',
    sellerName: 'Donut King',
    emailAddress: 'john@gmail.com',
    mobileNumber: '09123456789',
    governmentId: 'https://picsum.photos/200',
    description: 'I am a burger seller',
  },
];

function SellerApplications() {
  const { windowSize } = useWindowSize();
  const isApplicationsLoading = false;

  const [search, setSearch] = useState('');
  const [isGovernmentIdModalOpen, setIsGovernmentIdModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState({})

  const filteredApplications = applications.filter((application) => {
    const searchLowerCase = search.toLowerCase();

    return (
      application.fullName.toLowerCase().includes(searchLowerCase) ||
      application.sellerName.toLowerCase().includes(searchLowerCase) ||
      application.emailAddress.toLowerCase().includes(searchLowerCase)
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
                  ({ id, dateApplied, fullName, sellerName, emailAddress, mobileNumber, governmentId, description  }) =>
                    windowSize.width > 767 ? (
                      // Desktop View
                      <Card key={id} className={styles.SellerApplications_grid_applicationGrid}>
                        <div className={styles.SellerApplications_grid_column}>
                          {dateApplied}
                        </div>

                        <div className={styles.SellerApplications_grid_column}>
                          {fullName}
                        </div>

                        <ButtonLink
                          className={styles.SellerApplications_grid_column}
                          to={`/admin/sellers?name=${sellerName}`}
                          type={buttonTypes.TEXT.NEUTRAL}
                        >
                          {sellerName}
                        </ButtonLink>
                          
                        <div className={styles.SellerApplications_grid_column}>
                          {emailAddress}
                        </div>

                        <div className={styles.SellerApplications_grid_column}>
                          {mobileNumber}
                        </div>

                        <div className={styles.SellerApplications_grid_column}>
                          {description}
                        </div>

                        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                        <img
                          alt="Government Id"
                          className={cn(styles.SellerApplications_grid_column, styles.SellerApplications_grid_column_id)}
                          height={60}
                          src={governmentId}
                          width={60}
                          onClick={() => {
                            setIsGovernmentIdModalOpen(true);
                            setSelectedApplication({ sellerName, governmentId })
                          }}
                        />

                        <div className={styles.SellerApplications_grid_column}>
                          <div className={styles.SellerApplications_grid_buttons}>
                            <IconButton
                              className={styles.SellerApplications_grid_checkButton}
                              icon="check_circle"
                              type={iconButtonTypes.ICON.MD}
                              onClick={() => {
                              }}
                            />

                            <IconButton
                              className={styles.SellerApplications_grid_closeButton}
                              icon="cancel"
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
                        className={styles.SellerApplications_grid_applicationGrid}
                      >
                        <summary className={styles.SellerApplications_grid_title}>
                          <div className={styles.SellerApplications_grid_title_info}>
                            <Icon
                              className={styles.SellerApplications_grid_title_icon}
                              icon="expand_more"
                            />

                            <Text type={textTypes.HEADING.XS}>
                              {dateApplied} {fullName}
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
          governmentId={selectedApplication.governmentId}
          handleClose={() => setIsGovernmentIdModalOpen(false)}
          isOpen={isGovernmentIdModalOpen}
          title={`${selectedApplication.sellerName} Government ID`}
        />
      }
    </>
  )
}
export default SellerApplications;

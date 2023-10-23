import React from 'react';

import PropTypes from 'prop-types';

import { colorClasses, modalPositions, modalSizes, textTypes } from '@/app-globals';
import { Card, Icon, Modal, Preloader, Text } from '@/components';
import { useProductReports } from '@/hooks';

import styles from './styles.module.scss';

function ProductReportsModal({
  isOpen,
  handleClose,
  productId,
  title,
}) {
  const {
    isLoading: isProductsReportLoading,
    productReports,
  } = useProductReports(productId);

  return (
    <Modal
      className={styles.ProductReportsModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      { isProductsReportLoading ? (
        <Preloader/>
        ) : (
        productReports.map((productReport, index) => (
        <Card key={index} className={styles.ProductReportsModal_report}>
          <div className={styles.ProductReportsModal_report_reporter}>
            <div className={styles.ProductReportsModal_report_info}>
              <Icon
                className={styles.ProductReportsModal_report_icon}
                icon='account_circle'
              />

              <Text 
                className={styles.ProductReportsModal_report_name}
                type={textTypes.HEADING.XXS}
              >
                {productReport.buyerName}
              </Text>
            </div>

            <Text colorClass={colorClasses.NEUTRAL['400']}>
              {productReport.dateTimeCreated.split('T')[0]}
            </Text>
          </div>

          <Text className={styles.ProductReportsModal_report_reason}>
            {productReport.reason}
          </Text>
        </Card>
        ))
      )}
    </Modal>
  )
}

ProductReportsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ProductReportsModal;

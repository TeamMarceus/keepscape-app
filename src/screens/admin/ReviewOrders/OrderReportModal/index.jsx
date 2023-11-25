import React from 'react';

import PropTypes from 'prop-types';

import {
  colorClasses,
  modalPositions,
  modalSizes,
  textTypes,
} from '@/app-globals';
import { Card, Icon, Modal, Text } from '@/components';

import styles from './styles.module.scss';

function OrderReportModal({ isOpen, handleClose, buyer, report, title }) {
  return (
    <Modal
      className={styles.OrderReportModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      <Card className={styles.OrderReportModal_report}>
        <div className={styles.OrderReportModal_report_reporter}>
          <div className={styles.OrderReportModal_report_info}>
            <Icon
              className={styles.OrderReportModal_report_icon}
              icon="account_circle"
            />

            <Text
              className={styles.OrderReportModal_report_name}
              type={textTypes.HEADING.XXS}
            >
              {buyer.fullName}
            </Text>
          </div>

          <Text colorClass={colorClasses.NEUTRAL['400']}>
            {report?.dateTimeCreated.split('T')[0]}
          </Text>
        </div>

        <Text className={styles.OrderReportModal_report_reason}>
          {report?.reason}
        </Text>
      </Card>
    </Modal>
  );
}

OrderReportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  buyer: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
  report: PropTypes.shape({
    dateTimeCreated: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default OrderReportModal;

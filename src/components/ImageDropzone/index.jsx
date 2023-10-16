import React, { useState } from 'react';

import cn from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { useDropzone } from 'react-dropzone';

import { colorClasses, textTypes } from '@/app-globals';
import Icon from '@/components/Icon';
import Spinner from '@/components/Spinner';
import Text from '@/components/Text';

import styles from './styles.module.scss';

function ImageDropzone({
  className,
  text = 'Upload Image Here',
  value,
  error,
  isUploaded = false,
  onChange = () => {},
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dropzoneError, setDropzoneError] = useState(null);

  const onDropAccepted = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    setDropzoneError(null);
    setUploadedFile({
      ...file,
      preview: URL.createObjectURL(file),
    });

    const formData = new FormData();
    formData.append('file', file);
    onChange(formData.get('file'));
  };

  const onDropRejected = (e) => {
    setDropzoneError(e[0].errors[0].message);
  };

  const onRemove = (e) => {
    setUploadedFile(null);
    onChange('');
    e.stopPropagation();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ['image/*'],
    disabled: !!uploadedFile,
    maxFiles: 1,
    maxSize: 5000000,
    multiple: false,
    onDropAccepted,
    onDropRejected,
  });

  const errorMessage = dropzoneError ?? error;

  return (
    <div className={cn(styles.dropzone, className)} {...getRootProps()}>
      {isUploading && (
        <>
          <Spinner className={styles.spinner} />
          <div className={styles.spinner_background} />
        </>
      )}
      <input {...getInputProps()} />
      {!uploadedFile && value === '' ? (
        <>
          <Icon className={styles.icon} name="image" />
          {isDragActive ? (
            <Text
              colorClass={colorClasses.BLUE['300']}
              type={textTypes.HEADING.XS}
            >
              Drop file here...
            </Text>
          ) : (
            <Text
              colorClass={colorClasses.BLUE['300']}
              type={textTypes.HEADING.XS}
            >
              + {text}
            </Text>
          )}
          <div className={styles.notes}>
            <Text
              className={styles.notes_text}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.BODY.SM}
            >
              or drop your file here
            </Text>
            {errorMessage && (
              <Text
                className={styles.notes_text}
                colorClass={colorClasses.RED['300']}
                type={textTypes.BODY.SM}
              >
                {errorMessage}
              </Text>
            )}
          </div>
        </>
      ) : (
        <div className={styles.file}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Uploaded File"
            className={styles.file_preview}
            src={uploadedFile?.preview ?? value}
            onLoad={() => {
              if (uploadedFile?.preview) {
                URL.revokeObjectURL(uploadedFile.preview);
              }
            }}
          />
          <button
            className={styles.file_remove}
            type="button"
            onClick={onRemove}
          >
            <Icon className={styles.file_remove_icon} icon="close" />
          </button>
        </div>
      )}
    </div>
  );
}

ImageDropzone.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
  isUploaded: PropTypes.bool,
};

export default ImageDropzone;

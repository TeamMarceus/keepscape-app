import React, { useState }  from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';

import {

  buttonKinds,
  colorClasses,
  colorNames,
  gridTypes,
  inputKinds,
  spinnerSizes,
  textTypes,
} from '@/app-globals';

import { 

  Button,
  ControlledInput,
  ControlledTextArea,
  ImageDropzone,
  Spinner,
  Text,
  Checkbox,
  Grid
} from '@/components';


import { textAreaTypes } from '@/components/TextArea/constants';

import styles from './styles.module.scss';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'This field is required.';
  }

  if (!values.description) {
    errors.description = 'This field is required.';
  }

  if (!values.image1) {
    errors.image1 = 'Atleast 1 image is required.';
  }

  if (!values.price) {
    errors.price = 'This field is required.';
    errors.overall = 'Please fill in all required fields.';
  }

  return errors;
};

function AddProduct() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className={styles.AddProduct}>
      <Text type={textTypes.HEADING.XS}>
        Add New Product
      </Text>

      <div className={styles.AddProduct_content}>
        <Formik
          initialValues={{
            name: '',
            description: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            image5: '',
            isCustomizable: false,
            price: '',
          }}
          onSubmit={async (values, { setErrors }) => {
            const currentFormValues = {
              name: values.name,
              description: values.description,
              image1: values.image1,
              image2: values.image2,
              image3: values.image3,
              image4: values.image4,
              image5: values.image5,
              price: values.price,
            };

            const errors = validate(values);
            if (!isEmpty(errors)) {
              setErrors(errors);
              return;
            }

            setIsAdding(true);

            
            // try {
            // } catch (error) {
            //   setIsAdding(false);
            // }

              setIsAdding(false);
            }
          }
        >
          {({ errors, values, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <ControlledInput
                error={errors.name}
                name="name"
                placeholder="Enter a catchy product name*"
                value={values.name}
                onChange={(e) => setFieldValue('name', e.target.value)}
              />

              <ControlledTextArea
                className={styles.AddProduct_content_withMargin}
                error={errors.description}
                name="description"
                placeholder="Enter the product description and an enticing message to the buyer*"
                type={textAreaTypes.FORM}
                value={values.description}
                onChange={(e) => setFieldValue('description', e.target.value)}
              />

              <Text 
                className={styles.AddProduct_content_imageText}
                type={textTypes.HEADING.XXXS}
              >
                Add Product Images (Atleast 1 and upto 5 images)
              </Text>

              <Grid type={gridTypes.FIVE}>
                <ImageDropzone
                  error={errors.image1}
                  text="Product Image 1" 
                  value={values.image1}
                  onChange={(image) => {
                    setFieldValue('image1', image);
                  }}
                />

                <ImageDropzone
                  error={errors.image1}
                  text="Product Image 2" 
                  value={values.image2}
                  onChange={(image) => {
                    setFieldValue('image2', image);
                  }}
                />

                <ImageDropzone
                  error={errors.image1}
                  text="Product Image 3" 
                  value={values.image3}
                  onChange={(image) => {
                    setFieldValue('image3', image);
                  }}
                />

                <ImageDropzone
                  error={errors.image1}
                  text="Product Image 4" 
                  value={values.image4}
                  onChange={(image) => {
                    setFieldValue('image4', image);
                  }}
                />

                <ImageDropzone
                  error={errors.image1}
                  text="Product Image 5" 
                  value={values.image5}
                  onChange={(image) => {
                    setFieldValue('image5', image);
                  }}
                />  
              </Grid>
              
              <Grid className={styles.AddProduct_content_bottomGrid}>
                <Checkbox
                  checked={values.isCustomizable}
                  className={styles.AddProduct_content_bottomGrid_checkbox}
                  label="Is this product customizable?"
                  name="isCustomizable"
                  onChange={() => {
                    setFieldValue('isCustomizable', !values.isCustomizable);
                  }}
                />

                <div className={styles.AddProduct_content_price}>
                  <ControlledInput
                    error={errors.price}
                    kind={inputKinds.NUMBER}
                    name="price"
                    placeholder="Price ₱*"
                    value={values.price}
                    onChange={(e) => setFieldValue('price', e.target.value)}
                  />
                
                  <div className={styles.AddProduct_content_price_commission}>
                    <Text 
                      colorClass={colorClasses.NEUTRAL['400']}
                      type={textTypes.HEADING.XS}
                    >
                      +
                    </Text>
                    <Text type={textTypes.HEADING.XXXS}>
                    <span className={styles.AddProduct_content_price_commission_span}>{`₱${(values.price * 0.05).toFixed(2)}`}</span> (5% service fee)
                    </Text>
                  </div>

                  <div className={styles.AddProduct_content_price_total}>
                    Customer's Price:

                    <Text
                      colorClass={colorClasses.GREEN['400']}
                      type={textTypes.HEADING.SM}
                    >
                      {`₱${(values.price * 1.05).toFixed(2)}`}
                    </Text>
                  </div>

                  {errors.overall && (
                    <Text
                      className={styles.AddProduct_content_withMargin}
                      colorClass={colorClasses.RED['400']}
                      type={textTypes.BODY.XS}
                    >
                      {errors.overall}
                    </Text>
                  )}

                  <div className={styles.AddProduct_content_buttonGroup}>
                    <Button
                      className={styles.AddProduct_content_addButton}
                      disabled={isAdding}
                      kind={buttonKinds.SUBMIT}
                      onClick={() => {}}
                    >
                      <span
                        className={styles.AddProduct_content_buttonGroup_buttonText}
                      >
                        Add Product
                        {isAdding && (
                          <Spinner
                            className={styles.AddProduct_content_buttonGroup_spinner}
                            colorName={colorNames.WHITE}
                            size={spinnerSizes.XS}
                          />
                        )}
                      </span>
                    </Button>
                   </div>
                </div>
              </Grid>
            </form>
          )}
        </Formik>
      </div>

    </div>
  )
}
export default AddProduct;

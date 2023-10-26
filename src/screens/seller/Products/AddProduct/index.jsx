import React, { useState }  from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import { toast } from 'sonner';

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
  Grid,
  ControlledSelect,
  ScreenLoader
} from '@/components';


import { textAreaTypes } from '@/components/TextArea/constants';

import { useAddProduct, useProductCategories, useProductPlaces } from '@/hooks';

import styles from './styles.module.scss';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'This field is required.';
  }

  if (!values.description) {
    errors.description = 'This field is required.';
  }

  if (!values.image1 && !values.image2 && !values.image3 && !values.image4 && !values.image5) {
    errors.image1 = 'Atleast 1 image is required.';
  }

  if (!values.place) {
    errors.place = 'This field is required.';
  }

  if (isEmpty(values.categories)) {
    errors.categories = 'This field is required.';
  }

  if (!values.quantity) {
    errors.quantity = 'This field is required.';
  }

  if (!values.price) {
    errors.price = 'This field is required.';
  } else if (values.price < 0) {
    errors.price = 'Price must be greater than 0.';
  } else if (values.price > 1000000) {
    errors.price = 'Price must be less than 1,000,000.';
  }

  return errors;
};

function AddProduct() {

  const {isLoading: isProductCategoriesLoading, productCategories} = useProductCategories();
  const {isLoading: isProductPlacesLoading, productPlaces} = useProductPlaces();

  const {isAdding: isAddingProduct, addProduct } = useAddProduct();

  if (isProductCategoriesLoading || isProductPlacesLoading) {
    return <ScreenLoader/>;
  }

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
            place: '',
            categories: '',
            quantity: '',
            isCustomizable: false,
            price: '',
          }}
          onSubmit={async (values, { setErrors, setFieldValue }) => {
            const currentFormValues = {
              name: values.name,
              description: values.description,
              placeId: values.place.value,
              categoryIds: !isEmpty(values.categories) && values.categories.map((category) => category.value),
              quantity: values.quantity,
              isCustomizable: values.isCustomizable,
              sellerPrice: values.price,
              buyerPrice: values.price * 1.05,
            };

            const errors = validate(values);
            if (!isEmpty(errors)) {
              setErrors(errors);
              return;
            }

            const images = [
              values.image1,
              values.image2,
              values.image3,
              values.image4,
              values.image5,
            ];
            
            const filteredImages = {};
            
            let index = 1; // Initialize the index for property names

            for (const image of images) {
              const propertyName = `image${index}`;
              
              if (!isEmpty(image)) {
                filteredImages[propertyName] = image;
                index++; // Increment the index only when a non-empty image is found
              }
            }
            
            const productTobeAdded = {
              ...currentFormValues,
              ...filteredImages,
            };

            const { responseCode: addProductResponseCode } = await addProduct(productTobeAdded);

            const addProductCallbacks = {
              created: () => {
                toast.success('Product successfully added.', {
                  style: {
                    backgroundColor: '#48CFAD',
                    color: '#fff',
                  },
                });

                // Reset form values
                setFieldValue('name', '');
                setFieldValue('description', '');
                setFieldValue('place', '');
                setFieldValue('categories', []);
                setFieldValue('quantity', '');
                setFieldValue('isCustomizable', false);
                setFieldValue('price', '');
                setFieldValue('image1', null);
                setFieldValue('image2', null);
                setFieldValue('image3', null);
                setFieldValue('image4', null);
                setFieldValue('image5', null);
                
              },
              invalidFields: () => {
                toast.error('Invalid fields.', {
                  style: {
                    backgroundColor: '#ed5565',
                    color: '#fff',
                  },
                });
              },
              internalError: () => {
                toast.error('Oops, something went wrong.', {
                  style: {
                    backgroundColor: '#ed5565',
                    color: '#fff',
                  },
                });
              },
            };

            switch (addProductResponseCode) {
              case 200:
                addProductCallbacks.created();
                break;
              case 400:
                addProductCallbacks.invalidFields();
                break;
              case 401:
                addProductCallbacks.internalError();
                break;
              case 500:
                addProductCallbacks.internalError();
                break;
              default:
                break;
            }
          }}
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

              <ControlledSelect
                className={styles.AddProduct_content_withMargin}
                error={errors.place}
                name="type"
                options={ productPlaces.map((place) => ({
                    label: place.name,
                    value: place.id,
                  }))}
                placeholder="Choose a place*"
                value={values.place}
                onChange={(val) => setFieldValue('place', val)}
              />

              <ControlledSelect
                isMulti
                className={styles.AddProduct_content_withMargin}
                error={errors.categories}
                name="type"
                options={productCategories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                placeholder="Choose categories*"
                value={values.categories}
                onChange={(val) => setFieldValue('categories', val)}
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
                <div className={styles.AddProduct_content_bottomGrid_left}>
                  <ControlledInput
                    error={errors.quantity}
                    kind={inputKinds.NUMBER}
                    name="quantity"
                    placeholder="How many is available?*"
                    value={values.quantity}
                    onChange={(e) => setFieldValue('quantity', e.target.value)}
                  />

                  <Checkbox
                    checked={values.isCustomizable}
                    className={styles.AddProduct_content_bottomGrid_checkbox}
                    label="Is this product customizable?"
                    name="isCustomizable"
                    onChange={() => {
                      setFieldValue('isCustomizable', !values.isCustomizable);
                    }}
                  />
                </div>

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
                      disabled={isAddingProduct}
                      kind={buttonKinds.SUBMIT}
                      onClick={() => {}}
                    >
                      <span
                        className={styles.AddProduct_content_buttonGroup_buttonText}
                      >
                        Add Product
                        {isAddingProduct && (
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

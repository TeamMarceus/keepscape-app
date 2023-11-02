import React from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

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

import {  useProduct, useProductCategories, useProductPlaces, useUpdateProduct } from '@/hooks';


import { toastError, toastSuccess } from '@/utils/toasts';

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

function UpdateProduct({id}) {
  const router = useRouter();
  const {isLoading: isProductCategoriesLoading, productCategories} = useProductCategories();
  const {isLoading: isProductPlacesLoading, productPlaces} = useProductPlaces();

  const { isUpdating: isUpdatingProduct, updateProduct} = useUpdateProduct();

  const { 
    isLoading: isProductLoading, 
    product,
  } = useProduct(id);

  if (isProductLoading ||isProductCategoriesLoading || isProductPlacesLoading) {
    return <ScreenLoader/>;
  }

  return (
    <div className={styles.UpdateProduct}>
      <Text type={textTypes.HEADING.XS}>
        Update Product
      </Text>

      <div className={styles.UpdateProduct_content}>
        <Formik
          initialValues={{
            name: product.name,
            description: product.description,
            image1: product.images[0] || '',
            image2: product.images[1] || '',
            image3: product.images[2] || '',
            image4: product.images[3] || '',
            image5: product.images[4] || '',
            place: {label: product.province.name, value: product.province.id},
            categories: product.categories.map((category) => ({label: category.name, value: category.id})), 
            quantity: product.quantity,
            isCustomizable: product.isCustomizable,
            price: product.price,
          }}
          onSubmit={async (values, { setErrors }) => {
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
            const deleteUrls = [];
            
            let index = 1; 

            for (const image of images) {
              const propertyName = `image${index}`;
             
              // Check if the image is empty or not and if it is a file
              if (!isEmpty(image) && image instanceof File) {
                filteredImages[propertyName] = image;
              }

              // Check the index of the product image that has been changed and put it in the deleted urls array
              if (!isEmpty(image) && image instanceof File && product.images[index - 1]) {
                deleteUrls.push(product.images[index - 1]);
              }

              index++;
            }

            const productTobeUpdated = {
              ...currentFormValues,
              ...filteredImages,
              deleteUrls,
            };

            const { responseCode: updateProductResponseCode } = await updateProduct(id, productTobeUpdated);

            const updateProductCallbacks = {
              updated: () => {
                toastSuccess('Product successfully updated.');
                router.push(`/seller/products/${id}`);
              },
              invalidFields: () => {
                toastError('Invalid fields.');
              },
              internalError: () => {
                toastError('Oops, something went wrong.');
              },
            };

            switch (updateProductResponseCode) {
              case 200:
                updateProductCallbacks.updated();
                break;
              case 400:
                updateProductCallbacks.invalidFields();
                break;
              case 401:
                updateProductCallbacks.internalError();
                break;
              case 500:
                updateProductCallbacks.internalError();
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
                className={styles.UpdateProduct_content_withMargin}
                error={errors.description}
                name="description"
                placeholder="Enter the product description and an enticing message to the buyer*"
                type={textAreaTypes.FORM}
                value={values.description}
                onChange={(e) => setFieldValue('description', e.target.value)}
              />

              <ControlledSelect
                className={styles.UpdateProduct_content_withMargin}
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
                className={styles.UpdateProduct_content_withMargin}
                error={errors.categories}
                name="type"
                options={productCategories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                placeholder="Choose categories*"
                value={values.categories}
                onChange={(val) => {setFieldValue('categories', val)}}
              />

              <Text 
                className={styles.UpdateProduct_content_imageText}
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
              
              <Grid className={styles.UpdateProduct_content_bottomGrid}>
                <div className={styles.UpdateProduct_content_bottomGrid_left}>
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
                    className={styles.UpdateProduct_content_bottomGrid_checkbox}
                    label="Is this product customizable?"
                    name="isCustomizable"
                    onChange={() => {
                      setFieldValue('isCustomizable', !values.isCustomizable);
                    }}
                  />
                </div>

                <div className={styles.UpdateProduct_content_price}>
                  <ControlledInput
                    error={errors.price}
                    kind={inputKinds.NUMBER}
                    name="price"
                    placeholder="Price ₱*"
                    value={values.price}
                    onChange={(e) => setFieldValue('price', e.target.value)}
                  />
                
                  <div className={styles.UpdateProduct_content_price_commission}>
                    <Text 
                      colorClass={colorClasses.NEUTRAL['400']}
                      type={textTypes.HEADING.XS}
                    >
                      +
                    </Text>
                    <Text type={textTypes.HEADING.XXXS}>
                    <span className={styles.UpdateProduct_content_price_commission_span}>{`₱${(values.price * 0.05).toFixed(2)}`}</span> (5% service fee)
                    </Text>
                  </div>

                  <div className={styles.UpdateProduct_content_price_total}>
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
                      className={styles.UpdateProduct_content_withMargin}
                      colorClass={colorClasses.RED['400']}
                      type={textTypes.BODY.XS}
                    >
                      {errors.overall}
                    </Text>
                  )}

                  <div className={styles.UpdateProduct_content_buttonGroup}>
                    <Button
                      className={styles.UpdateProduct_content_updateButton}
                      disabled={isUpdatingProduct}
                      kind={buttonKinds.SUBMIT}
                      onClick={() => {}}
                    >
                      <span
                        className={styles.UpdateProduct_content_buttonGroup_buttonText}
                      >
                        Update Product
                        {isUpdatingProduct && (
                          <Spinner
                            className={styles.UpdateProduct_content_buttonGroup_spinner}
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

UpdateProduct.propTypes = {
  id: PropTypes.string,
};

export default UpdateProduct;

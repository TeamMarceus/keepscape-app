import React, { useEffect, useState } from 'react';

import cn from 'classnames';

import PropTypes from 'prop-types';

import { 
  buttonTypes, 
  colorClasses, 
  iconButtonTypes, 
  textTypes 
} from '@/app-globals';

import { 
  Button, 
  Card, 
  Checkbox, 
  ControlledTextArea, 
  IconButton, 
  Text
} from '@/components';

import { textAreaTypes } from '../TextArea/constants';

import styles from './styles.module.scss';

function CartCardList({
  actions,
  className,
  isAllSelected,
  product,
  products,
  setIsAllSelected,
  setNewProducts,
  setTotalPrice,
  totalPrice,
}) {
  const [newCustomization, setNewCustomization] = useState(product.customization);

  useEffect (() => {
    // Iterate through all products set the total price of all selected products
    let total = 0;
    products.forEach((prod) => {
      if (prod.isSelected) {
        total += (prod.price * prod.quantity);
      }
    });

    setTotalPrice(total);
  }
  ,[isAllSelected]);

  return (
    <Card 
      className={cn(
        styles.CartCardList, 
        className
      )}
    >
      <div className={styles.CartCardList_product}>
        <Checkbox
          checked={isAllSelected || product.isSelected}
          className={styles.CartCardList_product_checkbox}
          name={product.name}
          onChange={() => { 

            if (isAllSelected) {
              setTotalPrice(0);
              setIsAllSelected(false);
            
              // Set all products to not selected
              setNewProducts((prevProducts) => prevProducts.map((prevProduct) => ({
                ...prevProduct,
                isSelected: false,
              })));

            } else {
              setTotalPrice(totalPrice + (product.isSelected ? -1 : 1) * (product.price * product.quantity));

              // Set product to selected or not selected
              setNewProducts((prevProducts) => prevProducts.map((prevProduct) => {
                if (prevProduct.id === product.id) {
                  return {
                    ...prevProduct,
                    isSelected: !product.isSelected,
                  };
                }

                return prevProduct;
              }));

            } 
          }}
        />

        <div className={styles.CartCardList_product_details}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={product.image}
            className={styles.CartCardList_product_details_image}
            height={100}
            src={product.image}
            width={100}
          />
          <div>
            <Text 
              className={styles.CartCardList_product_details_text}
              type={textTypes.HEADING.XXS}
            >
              {product.name}
            </Text>

            <ControlledTextArea
              inputClassName={styles.CartCardList_product_details_customize}
              name="customize"
              placeholder="Enter customization details here..."
              type={textAreaTypes.SLIM}
              value={newCustomization}
              onChange={(e) => setNewCustomization(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.CartCardList_price}>
        <Text
          className={styles.CartCardList_price_text}
          colorClass={colorClasses.NEUTRAL['400']}
          type={textTypes.HEADING.XXS}
        >
         ₱ {product.price}
        </Text>
      </div>

      <div className={styles.CartCardList_quantity}>
        <IconButton 
          disabled={product.quantity <= 0}
          icon="remove"
          type={iconButtonTypes.OUTLINE.LG}
          onClick={()=> {

             // Set product quantity
             setNewProducts((prevProducts) => prevProducts.map((prevProduct) => {
              if (prevProduct.id === product.id) {
                return {
                  ...prevProduct,
                  quantity: product.quantity - 1,
                };
              }

              return prevProduct;
            }));

            if (product.isSelected) {
              setTotalPrice(totalPrice - product.price);
            }
          }}
        />
       
        <Text
          className={styles.CartCardList_price_text}
          colorClass={colorClasses.NEUTRAL['400']}
          type={textTypes.HEADING.XXS}
        >
          {product.quantity}
        </Text>

        <IconButton 
          disabled={product.quantity >= 10}
          icon="add"
          type={iconButtonTypes.OUTLINE.LG}
          onClick={()=> {
            
            // Set product quantity
            setNewProducts((prevProducts) => prevProducts.map((prevProduct) => {
              if (prevProduct.id === product.id) {
                return {
                  ...prevProduct,
                  quantity: product.quantity + 1,
                };
              }

              return prevProduct;
            }));
            
            if (product.isSelected) {
              setTotalPrice(totalPrice + product.price);
            }
          }}
        />
      </div>

      <div className={styles.CartCardList_totalPrice}>
        <Text
          className={styles.CartCardList_totalPrice_text}
          colorClass={colorClasses.NEUTRAL['400']}
          type={textTypes.HEADING.XXS}
        >
          ₱ {product.price * product.quantity}
        </Text>
      </div>

      <div className={styles.CartCardList_actions}>
        {actions.map(({ label, onClick }) => (
          <Button
            key={label}
            className={styles.CartCardList_actions_button}
            type={buttonTypes.SECONDARY.RED}
            onClick={onClick}
          >
            {label}
          </Button>
        ))}
      </div>
    </Card>
  );
}

CartCardList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  })),
  className: PropTypes.string,
  isAllSelected: PropTypes.bool,
  product: PropTypes.shape({
    customization: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    isSelected: PropTypes.bool,
  }),
  products: PropTypes.arrayOf(PropTypes.shape({
    customization: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    isSelected: PropTypes.bool,
  })),
  setIsAllSelected: PropTypes.func,
  setNewProducts: PropTypes.func,
  setTotalPrice: PropTypes.func,
  totalPrice: PropTypes.number,
};

export default CartCardList;
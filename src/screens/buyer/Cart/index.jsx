import React, { useState } from 'react';

import Image from 'next/image';

import ShoppingCart from '%/images/Misc/shopping-cart.png'
import { buttonTypes, colorClasses, textTypes } from '@/app-globals';
import { Button, CartCardList, Checkbox, Text } from '@/components';

import styles from './styles.module.scss';

const products = [
  {
    id: '1',
    name: 'Butanding Souvenir',
    image: 'https://picsum.photos/200',
    customization: 'I want this in blue color with a ribbon on top of it and a card.',
    price: 100,
    quantity: 1,

  },
  {
    id: '2',
    name: 'Butanding Souvenir2',
    image: 'https://picsum.photos/300',
    customization: 'I want this in blue color with a ribbon on top of it and a card.',
    price: 200,
    quantity: 2,
  }
];

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const [newProducts, setNewProducts] = useState(products.map((product) => ({
      ...product,
      isSelected: false,
    })));

  return (
    <div className={styles.Cart}>
     <div className={styles.Cart_banner}>
      <div className={styles.Cart_banner_text}>
         <Text
          colorClass={colorClasses.BLUE['400']}
          type={textTypes.HEADING.MD}
        > 
          Souvenir Cart 
        </Text>

        <Image
          alt="Shopping Cart"
          height={60}
          src={ShoppingCart}
          width={60}
        />
      </div>
     </div>

     <div className={styles.Cart_details}>
        <Checkbox
          checked={isAllSelected}
          className={styles.Cart_details_checkbox}
          label="Product"
          name="product"
          onChange={() => { 
            setIsAllSelected(!isAllSelected);
            
            if (isAllSelected) {
              setTotalPrice(0);
            }

            setNewProducts(newProducts.map((product) => ({
              ...product,
              isSelected: !isAllSelected,
            })));
          }}
        />

        <div className={styles.Cart_details_additionals}>
          <Text colorClass={colorClasses.NEUTRAL['400']}>
            Unit Price
          </Text>

          <Text colorClass={colorClasses.NEUTRAL['400']}>
            Quantity
          </Text>

          <Text colorClass={colorClasses.NEUTRAL['400']}>
            Total Price
          </Text>

          <Text colorClass={colorClasses.NEUTRAL['400']}>
            Actions
          </Text>
        </div>
     </div>

     <div className={styles.Cart_products}>
        {
          newProducts.map((product) => (
              <CartCardList
                key={product.id}
                actions={
                  [
                    {
                      label: 'Delete',
                      onClick: () => {},
                    },
                  ]
                }
                className={styles.Cart_products_card}
                isAllSelected={isAllSelected}
                product={product}
                products={newProducts}
                setIsAllSelected={setIsAllSelected}
                setNewProducts={setNewProducts}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
              />
          ))
        }
      
     </div>

     <div className={styles.Cart_footer}>
      <div className={styles.Cart_footer_left}>
        <Checkbox
          checked={isAllSelected}
          label="Select All"
          name="product"
          onChange={() => { 
            setIsAllSelected(!isAllSelected);

            if (isAllSelected) {
              setTotalPrice(0);
            }

            setNewProducts(newProducts.map((product) => ({
              ...product,
              isSelected: !isAllSelected,
            })));
          }}
        />

        <Button
          className={styles.Cart_footer_delete}
          type={buttonTypes.PRIMARY.RED}
          onClick={()=>{}}
        >
          Delete Selected
        </Button>
      </div>

      <div className={styles.Cart_footer_right}>
        <Text 
          colorClass={colorClasses.NEUTRAL['400']}
          type={textTypes.HEADING.XXS}
        >
          Total:
        </Text>

        <Text 
          colorClass={colorClasses.BLUE['300']}
          type={textTypes.HEADING.XS}
        >
          ₱ {totalPrice}
        </Text>

        <Button
          className={styles.Cart_footer_checkout}
          onClick={()=>{}}
        >
          Checkout
        </Button>
        </div>
     </div>
    </div>
  );
}

export default Cart;

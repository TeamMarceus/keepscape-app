import React, { useState } from 'react';

import Image from 'next/image';

import { useSelector } from 'react-redux';

import ShoppingCart from '%/images/Misc/shopping-cart.png'
import { buttonTypes, colorClasses, textTypes } from '@/app-globals';
import { Button, ButtonLink, Card, Checkbox, NoResults, Text } from '@/components';


import { getDeliveryDetails } from '@/ducks';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch } from '@/hooks';

import CartCardList from './CartCardList';

import styles from './styles.module.scss';


const userCart = [
  {
    id: '1',
    seller: 'Butanding Souvenir Shop',
    products: [
      {
        id: '1',
        name: 'Butanding Souvenir',
        image: 'https://picsum.photos/200',
        customization: 'I want this in blue color with a ribbon on top of it and a card.',
        price: 100,
        quantity: 1,
        seller: 'Butanding Souvenir Shop',
    
      },
      {
        id: '2',
        name: 'Butanding Souvenir2',
        image: 'https://picsum.photos/300',
        customization: 'I want this in red color with a ribbon on top of it and a card.',
        price: 200,
        quantity: 2,
        seller: 'Butanding Souvenir Shop',
      },
      {
        id: '3',
        name: 'Butanding Souvenir3',
        image: 'https://picsum.photos/400',
        customization: 'I want this in violet color with a ribbon on top of it and a card.',
        price: 200,
        quantity: 5,
        seller: 'Butanding Souvenir Shop',
      }
    ]
  },
  {
    id: '2',
    seller: 'Butanding Souvenir2 Shop2',
    products: [
      {
        id: '4',
        name: 'Butanding Souvenir4',
        image: 'https://picsum.photos/200',
        customization: 'I want this in blue color with a ribbon on top of it and a card.',
        price: 100,
        quantity: 1,
        seller: 'Butanding Souvenir Shop',
    
      },
      {
        id: '5',
        name: 'Butanding Souvenir5',
        image: 'https://picsum.photos/300',
        customization: 'I want this in red color with a ribbon on top of it and a card.',
        price: 200,
        quantity: 2,
        seller: 'Butanding Souvenir Shop',
      },
      {
        id: '6',
        name: 'Butanding Souvenir6',
        image: 'https://picsum.photos/400',
        customization: 'I want this in violet color with a ribbon on top of it and a card.',
        price: 200,
        quantity: 5,
        seller: 'Butanding Souvenir Shop',
      }
    ]
  }
];

function Cart() {
  const deliveryDetails = useSelector((store) => getDeliveryDetails(store));

  const loginUpdate = useActionDispatch(
    usersActions.loginActions.loginUpdate
  );

  const [totalPrice, setTotalPrice] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Set the products of the userCart to have isSelected property
  const [newUserCart, setNewUserCart] = useState(userCart.map((cart) => ({
    ...cart,
    isSelected: false,
    products: cart.products.map((product) => ({
      ...product,
      isSelected: false,
    })),
  })));

  return (
    <div className={styles.Cart}>
     <div className={styles.Cart_banner}>
      <div className={styles.Cart_banner_text}>
         <Text
          colorClass={colorClasses.BLUE['400']}
          type={textTypes.HEADING.MD}
        > 
         Artisan Cart 
        </Text>

        <Image
          alt="Shopping Cart"
          height={60}
          src={ShoppingCart}
          width={60}
        />
      </div>
     </div>

     <Card className={styles.Cart_details}>
        <Checkbox
          checked={isAllSelected}
          className={styles.Cart_details_checkbox}
          label="Product"
          name="product"
          onChange={() => { 
            setIsAllSelected(!isAllSelected);
            
            // Set the cart products to have isSelected property
            setNewUserCart(newUserCart.map((cart) => ({
              ...cart,
              isSelected: !isAllSelected,
              products: cart.products.map((product) => ({
                ...product,
                isSelected: !isAllSelected,
              })),
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
     </Card>
       
      {newUserCart.length > 0 ?
        <CartCardList
          className={styles.Cart_products}
          isAllSelected={isAllSelected}
          setIsAllSelected={setIsAllSelected}
          setTotalPrice={setTotalPrice}
          setUserCart={setNewUserCart}
          totalPrice={totalPrice}
          userCart={newUserCart}
        />
      :
        <NoResults
          className={styles.Cart_noResults}
          message="You have no items in your cart."
        />
      }

     <div className={styles.Cart_footer}>
      <div className={styles.Cart_footer_container}> 
        <div className={styles.Cart_footer_left}>
          <Checkbox
            checked={isAllSelected}
            label="Select All"
            name="product"
            onChange={() => { 
              setIsAllSelected(!isAllSelected);

              // Set the cart products to have isSelected property
              setNewUserCart(newUserCart.map((cart) => ({
                ...cart,
                isSelected: !isAllSelected,
                products: cart.products.map((product) => ({
                  ...product,
                  isSelected: !isAllSelected,
                })),
              })));
            }}
          />

          <Button
            className={styles.Cart_footer_button}
            disabled={totalPrice === 0}
            type={buttonTypes.PRIMARY.RED}
            onClick={()=>{
              // Set the cart products to have isSelected property and filter the selected products
              setNewUserCart(newUserCart.map((cart) => ({
                ...cart,
                products: cart.products.filter((product) => !product.isSelected),
              })));

            }}
          >
            Delete Selected
          </Button>
        </div>

        <div className={styles.Cart_footer_right}>
          <Text 
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.HEADING.XXS}
          >
            Total ({ 
              // Get the total number of selected products from the userCart
              newUserCart.reduce((total, cart) => total + cart.products.filter((product) => product.isSelected).length, 0)
            } item{
              // Get the total number of selected products from the userCart
              newUserCart.reduce((total, cart) => total + cart.products.filter((product) => product.isSelected).length, 0) > 1 ? 's' : ''}) :
          </Text>

          <Text 
            colorClass={colorClasses.BLUE['300']}
            type={textTypes.HEADING.XS}
          >
            ₱{totalPrice}
          </Text>

          <ButtonLink
            className={styles.Cart_footer_button}
            disabled={totalPrice === 0}
            to={deliveryDetails?.fullName ? '/buyer/checkout' : '/buyer/delivery'}
            onClick={() => {
              // Update the checkout_cart property of the user with the only the selected products
                loginUpdate({
                  checkout_cart: newUserCart.map((cart) => ({
                    ...cart,
                    products: cart.products.filter((product) => product.isSelected),
                  })),
                });
              }
            }
          >
            Checkout
          </ButtonLink>
        </div>
      </div>
     </div>
    </div>
  );
}

export default Cart;

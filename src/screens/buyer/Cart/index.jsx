import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { useSelector } from 'react-redux';

import ShoppingCart from '%/images/Misc/shopping-cart.png'
import { buttonTypes, colorClasses, textTypes } from '@/app-globals';
import {
  Button, 
  ButtonLink, 
  Card, 
  Checkbox, 
  NoResults, 
  ScreenLoader, 
  Text 
} from '@/components';

import { getUser, getCartCount } from '@/ducks';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch, useCart } from '@/hooks';

import CartCardList from './CartCardList';

import styles from './styles.module.scss';

function Cart() {
  const user = useSelector((store) => getUser(store));
  const cartCount = useSelector((store) => getCartCount(store));
  const loginUpdate = useActionDispatch(
    usersActions.loginActions.loginUpdate
  );

  const [totalPrice, setTotalPrice] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const { 
    isLoading: isCartLoading, 
    cart: userCart,
    isDeleting: isDeletingCartItems,
    deleteCartItems, 
  } = useCart();

  const [newUserCart, setNewUserCart] = useState([]);

  useEffect(() => {
    if (!isCartLoading) {
      // Set the items of the userCart to have isSelected property
      setNewUserCart(userCart.cartSellers.map((cart) => ({
        ...cart,
        isSelected: false,
        cartItems: cart.cartItems.map((item) => ({
          ...item,
          isSelected: false,
        })),
      })));
    }
  }, [isCartLoading]);

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

     {isCartLoading ? (
        <ScreenLoader/>
      ) : (
        <>
          <Card className={styles.Cart_details}>
            <Checkbox
              checked={isAllSelected}
              className={styles.Cart_details_checkbox}
              label="Product"
              name="item"
              onChange={() => { 
                setIsAllSelected(!isAllSelected);
                
                // Set the cart items to have isSelected property
                setNewUserCart(newUserCart.map((cart) => ({
                  ...cart,
                  isSelected: !isAllSelected,
                  cartItems: cart.cartItems.map((item) => ({
                    ...item,
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
              className={styles.Cart_items}
              deleteCartItems={deleteCartItems}
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
                  name="item"
                  onChange={() => { 
                    setIsAllSelected(!isAllSelected);

                    // Set the cart cartItems to have isSelected property
                    setNewUserCart(newUserCart.map((cart) => ({
                      ...cart,
                      isSelected: !isAllSelected,
                      cartItems: cart.cartItems.map((item) => ({
                        ...item,
                        isSelected: !isAllSelected,
                      })),
                    })));
                  }}
                />

                <Button
                  className={styles.Cart_footer_button}
                  disabled={totalPrice === 0 || isDeletingCartItems}
                  type={buttonTypes.PRIMARY.RED}
                  onClick={ async ()=>{
                    // Only pass the ids of the selected cartItems to the deleteCartItems function as an array
                    const cartItemsIds = newUserCart.reduce((total, cart) => 
                      total.concat(cart.cartItems.filter((item) => 
                        item.isSelected).map((item) => item.id)), []);

                    await deleteCartItems(cartItemsIds);

                    // Set the cart cartItems to have isSelected property and filter the selected cartItems
                    setNewUserCart(newUserCart.map((cart) => ({
                      ...cart,
                      cartItems: cart.cartItems.filter((item) => !item.isSelected),
                    })));

                    loginUpdate({ cart_count: cartCount === 1 ? {} : cartCount - cartItemsIds.length });
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
                    // Get the total number of selected cartItems from the userCart
                    newUserCart.reduce((total, cart) => 
                      total + cart.cartItems.filter((item) => 
                        item.isSelected).length, 0)
                  } item{
                    // Get the total number of selected cartItems from the userCart
                    newUserCart.reduce((total, cart) => 
                      total + cart.cartItems.filter((item) => 
                        item.isSelected).length, 0) > 1 ? 's' : ''}) :
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
                  to={(user?.deliveryFullName && user?.deliveryAddress) ? 
                    '/buyer/checkout' : '/buyer/delivery'}
                  onClick={() => {
                    // Update the checkout_cart property of the user with the only the selected cartItems
                      loginUpdate({
                        checkout_cart: newUserCart.map((cart) => ({
                          ...cart,
                          cartItems: cart.cartItems.filter((item) => item.isSelected),
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
        </>
      )
     }

    </div>
  );
}

export default Cart;

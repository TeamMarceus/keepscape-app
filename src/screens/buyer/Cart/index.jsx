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

import { getUser } from '@/ducks';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch, useCart } from '@/hooks';

import CartCardList from './CartCardList';

import styles from './styles.module.scss';

function Cart() {
  const user = useSelector((store) => getUser(store));
  const loginUpdate = useActionDispatch(
    usersActions.loginActions.loginUpdate
  );

  const [totalPrice, setTotalPrice] = useState(0);
  const [isAllAvailableSelected, setIsAllAvailableSelected] = useState(false);
  const [isAllOutOfStockSelected, setIsAllOutOfStockSelected] = useState(false);

  const { 
    isLoading: isCartLoading, 
    cart: userCart,
    isDeleting: isDeletingCartItems,
    deleteCartItems, 
  } = useCart();

  const [newUserCart, setNewUserCart] = useState([]);
  const [outOfStockItems, setOutOfStockItems] = useState([])

  useEffect(() => {
    if (!isCartLoading) {
      // Set the items of the userCart to have isSelected property
      setNewUserCart(userCart.cartSellers.map((cart) => ({
        ...cart,
        isSelected: false,
        cartItems: cart.cartItems.map((item) => ({
          ...item,
          isSelected: false,
          quantity: item.quantity > item.totalStock ? item.totalStock : item.quantity,
        })),
      })));

      // Set the out of stock items
      setOutOfStockItems(userCart.hiddenItems.map((item) => ({
        ...item,
        isSelected: false,
        cartItems: item.cartItems.map((cart) => ({
          ...cart,
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
              checked={isAllAvailableSelected}
              className={styles.Cart_details_checkbox}
              label="Product"
              name="item"
              onChange={() => { 
                setIsAllAvailableSelected(!isAllAvailableSelected);
                
                // Set the cart items to have isSelected property
                setNewUserCart(newUserCart.map((cart) => ({
                  ...cart,
                  isSelected: !isAllAvailableSelected,
                  cartItems: cart.cartItems.map((item) => ({
                    ...item,
                    isSelected: !isAllAvailableSelected,
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
            
          {(newUserCart.length > 0 || outOfStockItems.length > 0 ) ?
            <>
              <CartCardList
                className={styles.Cart_items}
                deleteCartItems={deleteCartItems}
                isAllSelected={isAllAvailableSelected}
                setIsAllSelected={setIsAllAvailableSelected}
                setTotalPrice={setTotalPrice}
                setUserCart={setNewUserCart}
                totalPrice={totalPrice}
                userCart={newUserCart}
              />

              {outOfStockItems.length > 0 && (
                <div className={styles.Cart_outOfStock}>
                  <Text
                    className={styles.Cart_outOfStock_title}
                    colorClass={colorClasses.NEUTRAL['400']}
                    type={textTypes.HEADING.SM}
                  >
                    Out of Stock Items
                  </Text>

                  <CartCardList
                    isOutOfStock
                    className={styles.Cart_outOfStock_items}
                    deleteCartItems={deleteCartItems}
                    isAllSelected={isAllOutOfStockSelected}
                    setIsAllSelected={setIsAllOutOfStockSelected}
                    setUserCart={setOutOfStockItems}
                    userCart={outOfStockItems}
                  />
                </div>
              )}
            </>
          :
            <NoResults
              className={styles.Cart_noResults}
              message="You have no items in your cart."
            />
          }

          <div className={styles.Cart_footer}>
            <div className={styles.Cart_footer_container}> 
              <div className={styles.Cart_footer_left}>
                {newUserCart.length > 0 &&
                  <Checkbox
                    checked={isAllAvailableSelected}
                    label={outOfStockItems.length > 0 ? 'Select All Available' : 'Select All'}
                    name="available"
                    onChange={() => { 
                      setIsAllAvailableSelected(!isAllAvailableSelected);

                      // Set the cart cartItems to have isSelected property
                      setNewUserCart(newUserCart.map((cart) => ({
                        ...cart,
                        isSelected: !isAllAvailableSelected,
                        cartItems: cart.cartItems.map((item) => ({
                          ...item,
                          isSelected: !isAllAvailableSelected,
                        })),
                      })));
                    }}
                />
                }

                {outOfStockItems.length > 0 &&
                  <Checkbox
                    checked={isAllOutOfStockSelected}
                    label={newUserCart.length > 0 ? 'Select All Out of Stock' : 'Select All'}
                    name="outOfStock"
                    onChange={() => { 
                      setIsAllOutOfStockSelected(!isAllOutOfStockSelected);

                      // Set the cart outOfStock items to have isSelected property
                      setOutOfStockItems(outOfStockItems.map((item) => ({
                        ...item,
                        isSelected: !isAllOutOfStockSelected,
                        cartItems: item.cartItems.map((cart) => ({
                          ...cart,
                          isSelected: !isAllOutOfStockSelected,
                        })),
                      })));
                   }}
                />
                }

                <Button
                  className={styles.Cart_footer_button}
                  disabled={
                    isDeletingCartItems || 
                    // Check if there are no selected cartItems or outOfStockItems
                    (outOfStockItems.reduce((total, item) =>
                      total + item.cartItems.filter((cart) =>
                        cart.isSelected).length, 0) === 0 &&
                    totalPrice === 0)
                  }
                  type={buttonTypes.PRIMARY.RED}
                  onClick={ async ()=>{
                    // Only pass the ids of the selected cartItems to the deleteCartItems function as an array

                    const availableCartItemIds = newUserCart.reduce((total, cart) => 
                      total.concat(cart.cartItems.filter((item) => 
                        item.isSelected).map((item) => item.id)), []);
                    
                    const outOfStockItemIds = outOfStockItems.reduce((total, cart) => 
                      total.concat(cart.cartItems.filter((item) => 
                        item.isSelected).map((item) => item.id)), []);

                    const cartItemsIds = availableCartItemIds.concat(outOfStockItemIds);

                    // Set the cart cartItems to have isSelected property and filter the selected cartItems
                    setNewUserCart(newUserCart.map((cart) => ({
                      ...cart,
                      cartItems: cart.cartItems.filter((item) => !item.isSelected),
                    })));

                    // Set the cart outOfStock items to have isSelected property and filter the selected cartItems
                    setOutOfStockItems(outOfStockItems.map((item) => ({
                      ...item,
                      cartItems: item.cartItems.filter((cart) => !cart.isSelected),
                    })));
                    
                    await deleteCartItems(cartItemsIds);
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
                  ₱{totalPrice.toLocaleString()}
                </Text>

                <ButtonLink
                  className={styles.Cart_footer_button}
                  disabled={totalPrice === 0}
                  to={(user?.deliveryFullName && user?.deliveryAddress) ? 
                    '/buyer/checkout' : '/buyer/delivery'}
                  onClick={ async () => {
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

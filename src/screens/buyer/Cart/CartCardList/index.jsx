import React, { useEffect } from 'react';

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
  Icon, 
  IconButton, 
  Text
} from '@/components';

import { textAreaTypes } from '../../../../components/TextArea/constants';

import styles from './styles.module.scss';

function CartCardList({
  className,
  isAllSelected,
  userCart,
  setIsAllSelected,
  setUserCart,
  setTotalPrice,
  totalPrice,
}) {

  useEffect (() => {
    // Iterate through all cartItems set the total price of all selected cartItems
    let total = 0;
      userCart.forEach((cart) => {
        cart.cartItems.forEach((prod) => {
          if (prod.isSelected) {
            total += (prod.price * prod.quantity);
          }
        });   
    });
    setTotalPrice(total);
  
  }
  ,[isAllSelected, userCart]);
  

  const onCartSelectChange = (cart) => {
    if (isAllSelected) {
      setIsAllSelected(false);
  
      // Set the user cart seller cartItems to be unselected
      setUserCart(userCart.map((prevCart) => {
        if (prevCart.id === cart.id) {
          return {
            ...prevCart,
            isSelected: false,
            cartItems: cart.cartItems.map((prevProduct) => ({
                ...prevProduct,
                isSelected: false,
              }))
          };
        }
  
        return prevCart;
      }));
    } else {
      // Set the user cart seller cartItems to be selected or unselected
      setUserCart((prevUserCart) => prevUserCart.map((prevCart) => {
        if (prevCart.id === cart.id) {
          return {
            ...prevCart,
            isSelected: !cart.isSelected,
            cartItems: cart.cartItems.map((prevProduct) => ({
              ...prevProduct,
              isSelected: !cart.isSelected,
            }))
          };
        }

        return prevCart;
      }));
    } 
  }

  const onProductSelectChange = (cart, product) => {
    if (isAllSelected) {
      console.log('here')
      setIsAllSelected(false);
      
      setUserCart(userCart.map((prevCart) => {
        if (prevCart.id === cart.id) {
          return {
            ...prevCart,
            isSelected: false,
            cartItems: cart.cartItems.map((prevProduct) => {
              if (prevProduct.id === product.id) {
                return {
                  ...prevProduct,
                  isSelected: true,
                };
              } 
              
              return {
                ...prevProduct,
                isSelected: false,
              }; 
            })
          };
        }
  
        return prevCart;
      }));

    } else if (cart.isSelected) {
        console.log('here')
       // Set cart seller to be unselected and set the only selected product to be selected
       setUserCart(userCart.map((prevCart) => {
        if (prevCart.id === cart.id) {
          return {
            ...prevCart,
            isSelected: false,
            cartItems: cart.cartItems.map((prevProduct) => {
              if (prevProduct.id === product.id) {
                return {
                  ...prevProduct,
                  isSelected: true,
                };
              }
  
              return {
                ...prevProduct,
                isSelected: false,
              }; 
            })
          };
        }
  
        return prevCart;
      }));

    } else {
      console.log('here')
      // Set the cart individual product to be selected or unselected
      setUserCart(userCart.map((prevCart) => {
        if (prevCart.id === cart.id) {
          return {
            ...prevCart,
            cartItems: cart.cartItems.map((prevProduct) => {
              if (prevProduct.id === product.id) {
                return {
                  ...prevProduct,
                  isSelected: !product.isSelected,
                };
              }
  
              return prevProduct;
            })
          };
        }
  
        return prevCart;
      }));
    } 
  }

  const onCustomizationChange = (cart, product, value) => {
    // Set the cart product customization to be changed
    setUserCart(userCart.map((prevCart) => {
      if (prevCart.id === cart.id) {
        return {
          ...prevCart,
          cartItems: cart.cartItems.map((prevProduct) => {
            if (prevProduct.id === product.id) {
              return {
                ...prevProduct,
                customizationMessage: value,
              };
            }

            return prevProduct;
          })
        };
      }

      return prevCart;
    }));
  }

  const onQuantityIncrement = (cart, product) => {
    // Set the cart product quantity to be incremented
    setUserCart(userCart.map((prevCart) => {
      if (prevCart.id === cart.id) {
        return {
          ...prevCart,
          cartItems: cart.cartItems.map((prevProduct) => {
            if (prevProduct.id === product.id) {
              return {
                ...prevProduct,
                quantity: prevProduct.quantity + 1,
              };
            }

            return prevProduct;
          })
        };
      }

      return prevCart;
    }));
  }

  const onQuantityDecrement = (cart, product) => {
    // Set the cart product quantity to be decremented
    setUserCart(userCart.map((prevCart) => {
      if (prevCart.id === cart.id) {
        return {
          ...prevCart,
          cartItems: cart.cartItems.map((prevProduct) => {
            if (prevProduct.id === product.id) {
              return {
                ...prevProduct,
                quantity: prevProduct.quantity - 1,
              };
            }

            return prevProduct;
          })
        };
      }

      return prevCart;
    }));
  }

  const onDelete = (cart, product) => {
    // Set the cart product to be deleted
    setUserCart(userCart.map((prevCart) => {
      if (prevCart.id === cart.id) {
        return {
          ...prevCart,
          cartItems: cart.cartItems.filter((prevProduct) => prevProduct.id !== product.id),
        };
      }

      return prevCart;
    }));
  }

  return (
    <>
      {userCart.map((cart) => (
        cart.cartItems.length > 0 &&
        <Card 
          key={cart.id}
          className={cn(
            styles.CartCardList, 
            className
          )}
        >
          {cart.cartItems.length > 0 &&
            <div className={styles.CartCardList_seller}>
              <Checkbox
                checked={isAllSelected || cart.isSelected}
                className={styles.CartCardList_product_checkbox}
                name={cart.sellerName}
                onChange={() => onCartSelectChange(cart)}
              />

              <Icon 
                className={styles.CartCardList_seller_icon}
                icon="storefront" 
              />

              <Text
                className={styles.CartCardList_seller_text}
                type={textTypes.HEADING.XXXS}
              >
                {cart.sellerName}
              </Text>
            </div>
          }

          {cart.cartItems.length > 0 &&
            cart.cartItems.map((product) => (
              <div key={product.id} className={styles.CartCardList_item}>
                <div className={styles.CartCardList_product}>
                  <Checkbox
                    checked={isAllSelected || cart.isSelected || product.isSelected}
                    className={styles.CartCardList_product_checkbox}
                    name={product.id}
                    onChange={() => onProductSelectChange(cart, product)}
                  />

                  <div className={styles.CartCardList_product_details}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={product.productImageUrl}
                      className={styles.CartCardList_product_details_image}
                      height={100}
                      src={product.productImageUrl}
                      width={100}
                    />
                    <div className={styles.CartCardList_product_details_detail}>
                      <Text 
                        className={styles.CartCardList_product_details_text}
                        type={textTypes.HEADING.XXS}
                      >
                        {product.name}
                      </Text>

                      { product.isCustomizable &&
                        <ControlledTextArea
                          inputClassName={styles.CartCardList_product_details_customize}
                          name="customize"
                          placeholder="Enter customization details here..."
                          type={textAreaTypes.SLIM}
                          value={product.customizationMessage}
                          onChange={(e) => onCustomizationChange(cart, product, e.target.value)}
                        />
                      }
                    </div>
                  </div>
                </div>

                <div className={styles.CartCardList_price}>
                  <Text
                    className={styles.CartCardList_price_text}
                    colorClass={colorClasses.NEUTRAL['400']}
                    type={textTypes.HEADING.XXS}
                  >
                  ₱{product.price}
                  </Text>
                </div>

                <div className={styles.CartCardList_quantity}>
                  <IconButton 
                    disabled={product.quantity <= 0}
                    icon="remove"
                    type={iconButtonTypes.OUTLINE.LG}
                    onClick={()=> onQuantityDecrement(cart, product)}
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
                    onClick={()=> onQuantityIncrement(cart, product)}
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
                  <Button
                    className={styles.CartCardList_actions_button}
                    type={buttonTypes.SECONDARY.RED}
                    onClick={()=> onDelete(cart, product)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          }
        </Card>
      ))}
    </>
  );
}

CartCardList.propTypes = {
  className: PropTypes.string,
  isAllSelected: PropTypes.bool,
  userCart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    sellerName: PropTypes.string,
    isSelected: PropTypes.bool,
    cartItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      productId: PropTypes.string,
      isCustomizable: PropTypes.bool,
      customizationMessage: PropTypes.string,
      productImageUrl: PropTypes.string,
      name: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
      isSelected: PropTypes.bool,
    })),
  })),
  setIsAllSelected: PropTypes.func,
  setUserCart: PropTypes.func,
  setTotalPrice: PropTypes.func,
  totalPrice: PropTypes.number,
};

export default CartCardList;
import { useState, useRef } from 'react';

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useSelector } from 'react-redux';
import { Link as LinkScroll } from 'react-scroll';

import Logo from '%/images/Logo/logo-white.svg'

import { PUBLIC_ROUTES } from '@/app/keepscape/routes';
import { buttonKinds, colorClasses, iconButtonTypes, userTypes} from '@/app-globals';
import { Card, ControlledInput, Icon, IconButton, Text } from '@/components';
import { getUser} from '@/ducks';
import { useOnClickOutside } from '@/hooks';

import styles from './styles.module.scss';

function Navbar() {
  const ref = useRef();
  const router = useRouter();
  const pathname = usePathname();

  const [isDropdownToggled, toggleDropdown] = useState(false);
  useOnClickOutside(ref, () => toggleDropdown(false));

  const user = useSelector((store) => getUser(store));
  const { userType, id: userId } = user;

  const [search, setSearch] = useState('');
  
  const isSellerOrAdmin = userType === userTypes.SELLER || userType === userTypes.ADMIN;

  return (
    <div className={cn(styles.Navbar, {
      [styles.Navbar___seller]: isSellerOrAdmin && pathname !== PUBLIC_ROUTES.MAIN_PAGE,
    })}>
      <div className={styles.Navbar_container}>
        <div className={cn(styles.Navbar_links, {
          [styles.Navbar_links___seller]: isSellerOrAdmin && pathname !== PUBLIC_ROUTES.MAIN_PAGE,
        })}>
          <div className={styles.Navbar_links_scrollLinks}>
            {pathname === PUBLIC_ROUTES.MAIN_PAGE ? (
              <>
                {userType === userTypes.BUYER &&
                  <>
                    <LinkScroll
                    key="preferences"
                    smooth
                    className={styles.Navbar_links_link}
                    duration={700}
                    offset={-200}
                    to="preferences"
                  >
                    <Text
                      className={styles.Navbar_links_link_text}
                      colorClass={colorClasses.NEUTRAL['0']}
                    >
                      Shop by Preferences
                    </Text>
                    </LinkScroll>
                    |
                  </>
                }
                <LinkScroll
                  key="province"
                  smooth
                  className={styles.Navbar_links_link}
                  duration={700}
                  offset={-200}
                  to="province"
                >
                  <Text
                    className={styles.Navbar_links_link_text}
                    colorClass={colorClasses.NEUTRAL['0']}
                  >
                    Shop by Province
                  </Text>
                </LinkScroll>
                |
                <LinkScroll
                  key="category"
                  smooth
                  className={styles.Navbar_links_link}
                  duration={700}
                  offset={-200}
                  to="category"
                >
                  <Text
                    className={styles.Navbar_links_link_text}
                    colorClass={colorClasses.NEUTRAL['0']}
                  >
                    Shop by Category
                  </Text>
                </LinkScroll>
                |
                <LinkScroll
                  key="discover"
                  smooth
                  className={styles.Navbar_links_link}
                  duration={700}
                  offset={-200}
                  to="discover"
                >
                  <Text
                    className={styles.Navbar_links_link_text}
                    colorClass={colorClasses.NEUTRAL['0']}
                  >
                    Discover More
                  </Text>
                </LinkScroll>
              </>
            ) : (
              <>
                {userType === userTypes.BUYER &&
                  <Link
                    className={styles.Navbar_links_link}
                    href="/"
                  >
                    <Text
                      className={styles.Navbar_links_link_text}
                      colorClass={colorClasses.NEUTRAL['0']}
                    >
                      Keepscape Home
                    </Text>
                  </Link>
                }
                {isSellerOrAdmin &&
                  <Link href={userType === userTypes.SELLER ? '/seller/dashboard' : '/admin/dashboard'}>
                    <Image
                      alt="Keepscape"
                      className={styles.Navbar_logo}
                      src={Logo}
                      width={200}
                    />
                  </Link>
                }
              </>
            )
          }
          </div>
          
          {userId ?
            ( 
              <div
                ref={ref}
                className={styles.Navbar_navUser}
              >
                <button
                    className={styles.Navbar_navUser_button}
                    tabIndex={0}
                    type="button"
                    onClick={() => toggleDropdown(!isDropdownToggled)}
                  >
                  <Icon
                      className={styles.Navbar_navUser_accountIcon}
                      icon="account_circle"
                    />
                    {(userType === userTypes.BUYER || userType === userTypes.ADMIN) && 
                      <span className={styles.Navbar_navUser_name}>{user.firstName}</span>}

                    {userType === userTypes.SELLER && <span className={styles.Navbar_navUser_name}>{user.sellerName}</span>}
                    <Icon
                      className={styles.Navbar_navUser_caret}
                      icon="keyboard_arrow_down"
                    />
                </button>

                <Card
                  className={cn({
                    [styles.Navbar_navUser_dropdown]: !isDropdownToggled,
                    [styles.Navbar_navUser_dropdown___toggled]: isDropdownToggled,
                  })}
                >
                  {userType !== userTypes.ADMIN &&
                    <Link
                    className={styles.Navbar_navUser_dropdown_link}
                    href={`/${(user.userType).toLowerCase()}/account?activeTab=information`}
                    onClick={() => toggleDropdown(!isDropdownToggled)}
                    >
                      <Icon
                        className={styles.Navbar_navUser_dropdown_link_icon}
                        icon="settings"
                      />
                      My Account
                    </Link>
                  }

                  {userType === userTypes.BUYER &&
                    <Link
                      className={styles.Navbar_navUser_dropdown_link}
                      href="/buyer/account?activeTab=purchase"
                      onClick={() => toggleDropdown(!isDropdownToggled)}
                    >
                      <Icon
                        className={styles.Navbar_navUser_dropdown_link_icon}
                        icon="shopping_bag"
                      />
                      My Purchase
                    </Link>
                  }

                  <Link className={styles.Navbar_navUser_dropdown_link} href="/logout">
                    <Icon
                      className={styles.Navbar_navUser_dropdown_link_icon}
                      icon="exit_to_app"
                    />
                    Logout
                  </Link>
                </Card>
                  
              </div>
            ) : (
              <div className={styles.Navbar_loginSignup}>
                <Link
                  className={styles.Navbar_loginSignup_link}
                  href="/signup"
                >
                  Sign Up
                </Link>
                {' '} | {' '}
                <Link
                  className={styles.Navbar_loginSignup_link}
                  href="/login"
                >
                  Login
                </Link>
              </div>
            )    
          } 
        </div>
        
        {(!pathname.includes('/seller/') && !pathname.includes('/admin/')) &&
          <div className={styles.Navbar_header}>
            <Link href="/">
              <Image
                alt="Keepscape"
                className={styles.Navbar_logo}
                src={Logo}
                width={200}
              />
            </Link>

            <form 
              className={styles.Navbar_search} 
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/keepscape/search?keyword=${search}`);
              }}
            >
              <ControlledInput
                className={styles.Navbar_search_input}
                name="search"
                placeholder="Search for souvenir products, places, and shops"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    router.push(`/keepscape/search?keyword=${search}`);
                  }}
                }
              />

              <div className={styles.Navbar_search_button}>
                <IconButton
                  className={styles.Navbar_search_icon}
                  icon="search"
                  kind={buttonKinds.SUBMIT}
                  type={iconButtonTypes.SOLID.LG}
                  onClick={()=>{}}
                />
              </div>
            </form>
            
            {!isSellerOrAdmin &&
              <div className={styles.Navbar_cart}>
                <div className={styles.Navbar_cart_count}>
                  7
                </div>
                <IconButton
                  className={styles.Navbar_cart_icon}
                  icon="shopping_cart"
                  type={iconButtonTypes.ICON.LG}
                  onClick={()=>{
                    router.push('/buyer/cart'); 
                  }}
                />
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default Navbar;

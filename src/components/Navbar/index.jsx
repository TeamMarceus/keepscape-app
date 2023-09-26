import { useState, useRef } from 'react';

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';


import { useSelector } from 'react-redux';

import Logo from '%/images/Logo/logo-white.svg'

import { colorClasses, iconButtonTypes, textTypes } from '@/app-globals';
import { Card, ControlledInput, Icon, IconButton, Text } from '@/components';
import { getUser} from '@/ducks';
import { useOnClickOutside } from '@/hooks';


import styles from './styles.module.scss';

function Navbar() {
  const ref = useRef();
  const [isDropdownToggled, toggleDropdown] = useState(false);
  useOnClickOutside(ref, () => toggleDropdown(false));
  const user = useSelector((store) => getUser(store));
  const [search, setSearch] = useState('');
  return (
    <div className={styles.Navbar}>
      {user.guid ?
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
                <span className={styles.Navbar_navUser_name}>Stephine</span>
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
              <Link
                className={styles.Navbar_navUser_dropdown_link}
                href="/"
                onClick={() => toggleDropdown(!isDropdownToggled)}
              >
                <Icon
                  className={styles.Navbar_navUser_dropdown_link_icon}
                  icon="settings"
                />
                My Account
              </Link>

              <Link
                className={styles.Navbar_navUser_dropdown_link}
                href="/"
                onClick={() => toggleDropdown(!isDropdownToggled)}
              >
                <Icon
                  className={styles.Navbar_navUser_dropdown_link_icon}
                  icon="shopping_bag"
                />
                My Purchase
              </Link>

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

      <div className={styles.Navbar_header}>
        <Image
          alt="keepscape"
          className={styles.Navbar_logo}
          src={Logo}
          width={200}
        />

        <div className={styles.Navbar_search}>
          <ControlledInput
            className={styles.Navbar_search_input}
            name="search"
            placeholder="Search for souvenir products, places, and shops"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className={styles.Navbar_search_button}>
            <IconButton
              className={styles.Navbar_search_icon}
              icon="search"
              type={iconButtonTypes.SOLID.LG}
              onClick={()=>{}}
            />
          </div>

        </div>

        <IconButton
          className={styles.Navbar_cart}
          icon="shopping_cart"
          type={iconButtonTypes.SOLID.LG}
          onClick={()=>{}}
        />
      </div>
    </div>
  );
}

export default Navbar;

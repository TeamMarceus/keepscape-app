
import { useState } from 'react';

import cn from 'classnames';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import {
  textTypes,
  buttonTypes,
  colorClasses,
} from '@/app-globals';
import { Button, Text, ControlledInput, NoResults } from '@/components';

import PurchaseCard from './PurchaseCard';

import styles from './styles.module.scss';

const products = [
  {
    id: '1',
    name: 'Butanding Keychain',
    price: 100,
    quantity: 5,
    total: 500,
    image: 'https://picsum.photos/200',
    seller: 'Butanding Shop',
    status: 'On Going',
    dateOrdered: '2021-08-01',
    qrCode: 'https://picsum.photos/300',
    customization: 'I want it to be blue and more cute so that I can give it to my girlfriend'
  },
  {
    id: '2',
    name: 'Fish Keychain',
    price: 200,
    quantity: 2,
    total: 400,
    image: 'https://picsum.photos/200',
    seller: 'Fish Shop',
    status: 'Delivered',
    dateOrdered: '2021-08-01',
    qrCode: 'https://picsum.photos/300',
    customization: 'I want it to be blue and more cute so that I can give it to my girlfriend'
  },
  {
    id: '3',
    name: 'Dolphin Keychain',
    price: 400,
    quantity: 5,
    total: 2000,
    image: 'https://picsum.photos/200',
    seller: 'Dolphin Shop',
    status: 'Cancelled',
    dateOrdered: '2021-08-01',
    qrCode: 'https://picsum.photos/300',
    customization: 'I want it to be blue and more cute so that I can give it to my girlfriend'
  },
  {
    id: '4',
    name: 'Shark Keychain',
    price: 400,
    quantity: 5,
    total: 2000,
    image: 'https://picsum.photos/200',
    seller: 'Shark Shop',
    status: 'Pending',
    dateOrdered: '2021-08-01',
    qrCode: 'https://picsum.photos/300',
    customization: 'I want it to be blue and more cute so that I can give it to my girlfriend'
  },
]

function Purchase() {
  const [clickedFilter, setClickedFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  const filteredProducts = products.filter((product) => {
    if (clickedFilter === 'all') {
      return product;
    }
    
    const status = product.status.replace(/\s/g, '').toLowerCase();
    return status === clickedFilter;
  });

  const filteredSearch = filteredProducts.filter((product) => {
    const productName = product.name.replace(/\s/g, '').toLowerCase();
    const sellerName = product.seller.replace(/\s/g, '').toLowerCase();
    const searchValue = search.replace(/\s/g, '').toLowerCase();

    return productName.includes(searchValue) || sellerName.includes(searchValue);
  });



  return (
    <div className={styles.Purchase}>
      <Text className={styles.Purchase_title} type={textTypes.HEADING.SM}>
        My Purchase
      </Text>

      <div className={styles.Purchase_filters}>
        <Button
          className={cn(styles.Purchase_filters_button, {
            [styles.Purchase_filters_button___active]: clickedFilter === 'all',
          })}
          type={buttonTypes.TEXT.BLUE}
          onClick={() => {
            setClickedFilter('all');
          }}
        >
          <Text
            className={styles.Purchase_filters_button_text}
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.HEADING.XXXS}
          >
            All
          </Text>
        </Button>

        <Button
          className={cn(styles.Purchase_filters_button, {
            [styles.Purchase_filters_button___active]: clickedFilter === 'pending',
          })}
          type={buttonTypes.TEXT.BLUE}
          onClick={() => {
            setClickedFilter('pending');
          }}
        >
          <Text
            className={styles.Purchase_filters_button_text}
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.HEADING.XXXS}
          >
            Pending
          </Text>
        </Button>

        <Button
          className={cn(styles.Purchase_filters_button, {
            [styles.Purchase_filters_button___active]: clickedFilter === 'ongoing',
          })}
          type={buttonTypes.TEXT.BLUE}
          onClick={() => {
            setClickedFilter('ongoing');
          }}
        >
          <Text
            className={styles.Purchase_filters_button_text}
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.HEADING.XXXS}
          >
            On Going  
          </Text>
        </Button>

        <Button
          className={cn(styles.Purchase_filters_button, {
            [styles.Purchase_filters_button___active]: clickedFilter === 'delivered',
          })}
          type={buttonTypes.TEXT.BLUE}
          onClick={() => {
            setClickedFilter('delivered');
          }}
        >
          <Text
            className={styles.Purchase_filters_button_text}
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.HEADING.XXXS}
          >
            Delivered 
          </Text>
        </Button>

        <Button
          className={cn(styles.Purchase_filters_button, {
            [styles.Purchase_filters_button___active]: clickedFilter === 'cancelled',
          })}
          type={buttonTypes.TEXT.BLUE}
          onClick={() => {
            setClickedFilter('cancelled');
          }}
        >
          <Text
            className={styles.Purchase_filters_button_text}
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.HEADING.XXXS}
          >
            Cancelled 
          </Text>
        </Button>
      </div>

      <ControlledInput
        className={styles.Purchase_search}
        icon='search'
        name="search"
        placeholder="You can search by Seller Name or Product Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    {filteredSearch.length !== 0 ?
      <div className={styles.Purchase_products}>
        {filteredSearch.map((product) => (
          <PurchaseCard
            key={product.id}
            className={styles.Purchase_products_card}
            customization={product.customization}
            dateOrdered={product.dateOrdered}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            qrCode={product.qrCode}
            quantity={product.quantity}
            seller={product.seller}
            status={product.status}
            total={product.total}
          />
        ))
        }
      </div>
      :
      <NoResults
        className={styles.Purchase_noResults}
        message="No Purchase Found"
      />
    }
    </div>
  );
}

export default Purchase;

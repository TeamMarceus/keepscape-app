'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import Product from '@/screens/buyer/Product';

export default function ProductPage() {
  const params = useParams();
  const { id } = params;

 return <Product id={id}/>
}

'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import UpdateProduct from '@/screens/seller/Products/UpdateProduct';

export default function UpdateProductPage() {
  const params = useParams();
  const { id } = params;

 return <UpdateProduct id={id}/>
}

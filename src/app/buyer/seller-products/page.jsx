'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import SellerProducts from '@/screens/buyer/SellerProducts';

export default function SellerProductsLayoutPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return <SellerProducts id={id} />;
}

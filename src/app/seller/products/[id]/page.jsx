'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import ViewProduct from '@/screens/seller/Products/ViewProduct';

export default function ProductPage() {
  const params = useParams();
  const { id } = params;

  return <ViewProduct id={id} />;
}

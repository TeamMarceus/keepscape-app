'use client';

import React from 'react';

import PageNotFound from '@/screens/public/PageNotFound';

import { SELLER_ROUTES } from './routes';

export const metadata = {
  title: 'Page Not Found | Keepscape',
};

export default function SellerNotFound() {
  return (
    <PageNotFound
      buttonLink={SELLER_ROUTES.DASHBOARD}
      buttonText="BACK TO HOME"
    />
  );
}

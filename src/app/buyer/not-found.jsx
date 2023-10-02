'use client';

import React from 'react';

import PageNotFound from '@/screens/public/PageNotFound';

import { BUYER_ROUTES } from './routes';

export const metadata = {
  title: 'Page Not Found | Keepscape',
};

export default function BuyerNotFound() {
  return (
    <PageNotFound
      buttonLink={BUYER_ROUTES.HISTORY}
      buttonText="BACK TO HOME"
    />
  );
}

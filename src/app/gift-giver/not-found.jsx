'use client';

import React from 'react';

import PageNotFound from '@/screens/public/PageNotFound';

import { BUYER_ROUTES } from './routes';

export const metadata = {
  title: 'Page Not Found | keepscape',
};

export default function GiftGiverNotFound() {
  return (
    <PageNotFound
      buttonLink={BUYER_ROUTES.HISTORY}
      buttonText="BACK TO HOME"
    />
  );
}

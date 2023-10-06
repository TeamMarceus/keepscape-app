'use client';

import React from 'react';

import PageNotFound from '@/screens/public/PageNotFound';

import { PUBLIC_ROUTES } from '../keepscape/routes';

export const metadata = {
  title: 'Page Not Found | Keepscape',
};

export default function BuyerNotFound() {
  return (
    <PageNotFound
      buttonLink={PUBLIC_ROUTES.MAIN_PAGE}
      buttonText="BACK TO HOME"
    />
  );
}

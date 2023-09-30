'use client';

import React from 'react';

import PageNotFound from '@/screens/public/PageNotFound';

import { AUTHENTICATION_ROUTES } from './routes';

export const metadata = {
  title: 'Page Not Found | Keepscape',
};

export default function AppNotFound() {
  return (
    <PageNotFound
      buttonLink={AUTHENTICATION_ROUTES.LOGIN}
      buttonText="Back to Login"
    />
  );
}

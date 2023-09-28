'use client';

import React from 'react';

import PageNotFound from '@/screens/public/PageNotFound';

import { ADMIN_ROUTES } from './routes';

export const metadata = {
  title: 'Page Not Found | Keepscape',
};

export default function AdminNotFound() {
  return (
    <PageNotFound
      buttonLink={ADMIN_ROUTES.DASHBOARD}
      buttonText="BACK TO HOME"
    />
  );
}

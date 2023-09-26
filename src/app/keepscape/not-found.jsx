'use client';

import React from 'react';

import PageNotFound from '@/screens/public/PageNotFound';

export const metadata = {
  title: 'Page Not Found | keepscape',
};

export default function GiftNotFound() {
  return (
    <PageNotFound
      buttonLink="/"
      buttonText="BACK TO HOME"
    />
  );
}

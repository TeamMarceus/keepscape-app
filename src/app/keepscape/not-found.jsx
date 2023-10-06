'use client';

import React from 'react';

import PageNotFound from '@/screens/public/PageNotFound';

export const metadata = {
  title: 'Page Not Found | Keepscape',
};

export default function KeepscapeNotFound() {
  return (
    <PageNotFound
      buttonLink="/"
      buttonText="Back to Home"
    />
  );
}

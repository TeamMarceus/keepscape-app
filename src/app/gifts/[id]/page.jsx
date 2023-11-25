'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import Gift from '@/screens/public/Gift';

export default function GiftPage() {
  const params = useParams();
  const { id } = params;

  return <Gift id={id} />;
}

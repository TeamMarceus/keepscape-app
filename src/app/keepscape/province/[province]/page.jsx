'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import Province from '@/screens/public/Province';

export default function ProvincePage() {
  const params = useParams();
  const { province } = params;

 return <Province province={province}/>
}

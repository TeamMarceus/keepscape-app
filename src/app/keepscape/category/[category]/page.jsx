'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import Category from '@/screens/public/Category';

export default function CategoryPage() {
  const params = useParams();
  const { category } = params;

  return <Category category={category} />;
}

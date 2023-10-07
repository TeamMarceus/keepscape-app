'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import Search from '@/screens/public/Search';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

 return <Search keyword={keyword}/>
}

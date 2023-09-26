'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import Suggestions from '@/screens/giftGiver/Suggestions';

export default function SuggestionsPage() {
  const params = useParams();
  const { id } = params;

  return <Suggestions questionnaireId={id} /> 
}

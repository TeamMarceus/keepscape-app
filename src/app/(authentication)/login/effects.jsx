'use client';

import useNoAuthRoute from '@/hooks/useNoAuthRoute';

export default function LoginEffects({ children }) {
  useNoAuthRoute();

  return children;
}

'use client';

import useNoAuthRoute from '@/hooks/useNoAuthRoute';

export default function SignupEffects({ children }) {
  useNoAuthRoute();

  return children;
}

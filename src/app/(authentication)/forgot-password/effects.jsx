'use client';

import useNoAuthRoute from '@/hooks/useNoAuthRoute';

export default function ForgotPasswordEffects({ children }) {
  useNoAuthRoute();

  return children;
}

'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { actions as questionsActions } from '@/ducks/reducers/questions';
import { actions as productsActions } from '@/ducks/reducers/suggestions';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch } from '@/hooks';

export default function LogoutPage() {
  const loginRestart = useActionDispatch(
    usersActions.loginActions.loginRestart
  );

  const productsRestart = useActionDispatch(
    productsActions.productActions.productRestart
  );

  const questionsRestart = useActionDispatch(
    questionsActions.questionActions.questionRestart
  );

  const router = useRouter();

  useEffect(() => {
    loginRestart();
    productsRestart();
    questionsRestart();

    router.push('/login');
  }, []);

  return null;
}

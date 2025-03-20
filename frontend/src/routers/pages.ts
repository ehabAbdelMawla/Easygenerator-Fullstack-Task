import { lazy } from 'react';

const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const HomePage = lazy(() => import('../pages/HomePage'));

export {
    SignIn, HomePage, SignUp
}
import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SignIn, HomePage, SignUp } from './pages';
import IsAlreadyAuth from '../guards/IsAlreadyAuth';
import AuthGuard from '../guards/AuthGuard';
import Loader from '../components/Loader';
import AnimatedLayout from '../components/AnimatedLayout';


const Routers = () => (
    <BrowserRouter>
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route element={<AnimatedLayout />}>
                    <Route path="/" element={<Navigate to={'/signin'} />} />
                    {/* Protected Routes */}
                    <Route element={<AuthGuard redirectTo="/signin" />}>
                        <Route path="/home" element={<HomePage />} />
                    </Route>

                    <Route element={<IsAlreadyAuth redirectTo="/home" />}>
                        <Route path="signin" element={<SignIn />} />
                        <Route path="signup" element={<SignUp />} />
                    </Route>

                    <Route path="*" element={<Navigate to={'/signin'} />} />
                </Route>
            </Routes>

        </Suspense>
    </BrowserRouter >
);

export default Routers;

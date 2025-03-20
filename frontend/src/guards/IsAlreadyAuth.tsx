import React, { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const IsAlreadyAuth = ({ redirectTo = '/' }: { redirectTo: string }) => {
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		if (auth?.user) navigate(redirectTo);
	}, [auth?.user]);

	return <Outlet />;
};

export default IsAlreadyAuth;
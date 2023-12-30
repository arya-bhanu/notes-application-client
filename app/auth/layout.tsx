import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			minH={'100vh'}
			display={'flex'}
		>
			{children}
		</Box>
	);
};

export default AuthLayout;

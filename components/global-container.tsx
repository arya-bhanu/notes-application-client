import React from 'react';
import { Container } from '@chakra-ui/react';
const GlobalContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container maxW={{ base: 'xl', md: '3xl', lg: '7xl' }} px={'2rem'}>{children}</Container>
	);
};

export default GlobalContainer;

'use client';
import Header from '@/components/header';
import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default HomeLayout;

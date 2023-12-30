'use client';
import Header from '@/components/header';
import { useAuthHeader } from '@/data';
import { GET_ALL_NOTES } from '@/http/_GET';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Heading } from '@chakra-ui/react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const { data, loading, error } = useQuery(GET_ALL_NOTES);
	const router = useRouter();
	const authStore = useAuthHeader();
	useEffect(() => {
		if (error) {
			router.push('/auth/login');
		}
		if (!loading && data) {
			authStore.setIsAuth(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, data, error]);
	return loading && !data && !error ? (
		<Heading>Loading ...</Heading>
	) : (
		<>
			<Header />
			{children}
		</>
	);
};

export default HomeLayout;

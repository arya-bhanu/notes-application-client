'use client';
import React, { useEffect, useState } from 'react';
import GlobalContainer from './global-container';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { useAuthHeader } from '@/data';
import { jwtDecode } from 'jwt-decode';
import { IoIosLogOut } from 'react-icons/io';
import { useRouter } from 'next/navigation';

const Header = () => {
	const token = window.localStorage.getItem('token');
	const authStore = useAuthHeader();
	const router = useRouter();
	const [username, setUsername] = useState<string | null>(null);
	useEffect(() => {
		if (authStore.isAuth) {
			const decoded = jwtDecode(token as string) as any;
			setUsername(decoded.username);
		}
	}, [authStore.isAuth, token]);
	const handleLogout = () => {
		window.localStorage.removeItem('token');
		router.push('/auth/login');
	};
	return (
		<header
			style={{
				height: '5rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#EDF2F7',
				boxShadow: '0px 0px 10px 7px rgba(0,0,0,0.1)',
				position: 'fixed',
				left: 0,
				right: 0,
				zIndex: 999,
			}}
		>
			<GlobalContainer>
				<Flex
					justify={'space-between'}
					align={'center'}
				>
					<Heading margin={0}>Logo here</Heading>
					<Flex align={'center'}>
						{username ? (
							<>
								<Text>Helo, {username}</Text>
								<IconButton
									onClick={handleLogout}
									aria-label="logout"
									icon={<IoIosLogOut size={25} />}
								/>
							</>
						) : (
							<Text>Loading...</Text>
						)}
					</Flex>
				</Flex>
			</GlobalContainer>
		</header>
	);
};

export default Header;

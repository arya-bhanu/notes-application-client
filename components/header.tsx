'use client';
import React, { useEffect, useState } from 'react';
import GlobalContainer from './global-container';
import { Flex, Heading, IconButton, Stack, Text } from '@chakra-ui/react';
import { useAuthHeader } from '@/data';
import { jwtDecode } from 'jwt-decode';
import { IoIosLogOut } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
	const token = window.localStorage.getItem('token');
	const authStore = useAuthHeader();
	const router = useRouter();
	const [username, setUsername] = useState<string | null>(null);
	useEffect(() => {
		if (!token) {
			router.push('/auth/login');
		}
		if (authStore.isAuth && token) {
			const decoded = jwtDecode(token as string) as any;
			setUsername(decoded.username);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					<Link
						href={'/'}
						style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
					>
						<Image
							alt="logo"
							src={'/logo.png'}
							width={50}
							height={30}
						/>
						<Text fontSize={'1.1rem'}>Dibimbing Notes</Text>
					</Link>
					<Flex align={'center'}>
						{username ? (
							<Stack
								direction={'row'}
								alignItems={'center'}
								columnGap={[0, 1, 2, 3]}
							>
								<Text display={{ base: 'none', md: 'block' }}>
									Helo, {username}
								</Text>
								<IconButton
									onClick={handleLogout}
									aria-label="logout"
									icon={<IoIosLogOut size={25} />}
								/>
							</Stack>
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

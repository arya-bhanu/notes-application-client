'use client';
import { POST_LOGIN_USER } from '@/http/_POST';
import { IFormUser } from '@/interface/interface';
import { useMutation } from '@apollo/client';
import {
	Box,
	Button,
	ButtonGroup,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const Login = () => {
	const router = useRouter();
	const [loginUser, { data, loading, error }] = useMutation(POST_LOGIN_USER);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IFormUser>();
	const onSubmit: SubmitHandler<IFormUser> = async (dataForm) => {
		try {
			const response = await loginUser({
				variables: {
					input: { password: dataForm.password, username: dataForm.username },
				},
			});
			const { data } = response;
			window.localStorage.setItem('token', data.loginUser as string);
			window.location.href = '/';
		} catch (err) {
			console.error(err);
			router.push('/auth/login');
		}
	};
	return (
		<form
			style={{ margin: 'auto', width: '100%' }}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Stack
				maxW={'xl'}
				mx={'auto'}
				shadow={'lg'}
				p={5}
				rounded={'md'}
				rowGap={5}
			>
				<Heading>Login</Heading>
				<FormControl isInvalid={Boolean(errors.username)}>
					<FormLabel htmlFor="username">Username</FormLabel>
					<Input
						id="username"
						{...register('username', { required: 'Enter your username' })}
						type="text"
						placeholder="Username"
					/>
					<FormErrorMessage>{errors.username?.message}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={Boolean(errors.password)}>
					<FormLabel htmlFor="password">Password</FormLabel>
					<Input
						id="password"
						{...register('password', { required: 'Enter your password' })}
						type="password"
						placeholder="Password"
					/>
					<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
				</FormControl>

				<ButtonGroup>
					<Button type="submit">Login</Button>
					<Button
						onClick={() => {
							router.push('/auth/signup');
						}}
					>
						Signup
					</Button>
				</ButtonGroup>
			</Stack>
		</form>
	);
};

export default Login;

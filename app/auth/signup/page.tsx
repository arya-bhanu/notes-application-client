'use client';
import { POST_ADD_USER } from '@/http/_POST';
import { IFormUser } from '@/interface/interface';
import { useMutation } from '@apollo/client';
import {
	Button,
	ButtonGroup,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
} from '@chakra-ui/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
export type IFormSignup = IFormUser & {
	confirmPassword: string;
};
const Signup = () => {
	const router = useRouter();
	const [addUser, { data, loading, error }] = useMutation(POST_ADD_USER);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IFormSignup>();
	const onSubmit: SubmitHandler<IFormSignup> = async (data) => {
		try {
			const response = await addUser({
				variables: {
					input: { password: data.password, username: data.username },
				},
			});

			router.push('/auth/login');
		} catch (err) {
			console.error(err);
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
			>
				<Heading>Signup</Heading>
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
				<FormControl isInvalid={Boolean(errors.confirmPassword)}>
					<FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
					<Input
						id="confirmPassword"
						{...register('confirmPassword', {
							required: 'Enter your confirm password',
							validate: (val: string) => {
								if (watch('password') !== val) {
									return "Your password doesn't match";
								}
							},
						})}
						type="password"
						placeholder="Confirm password"
					/>
					<FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
				</FormControl>
				<ButtonGroup>
					<Button type="submit">Signup</Button>
					<Button onClick={() => router.push('/auth/login')}>Login</Button>
				</ButtonGroup>
			</Stack>
		</form>
	);
};

export default Signup;

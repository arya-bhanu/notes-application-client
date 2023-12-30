'use client';
import React, { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	from,
	HttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

const port = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000/graphql";

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, locations, path }) => {
			alert('Graphql Error ' + message);
		});
	}
});
const link = from([errorLink, authLink, new HttpLink({ uri: port })]);
const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});
const GlobalProvider = ({ children }: { children: ReactNode }) => {
	return (
		<ApolloProvider client={client}>
			<ChakraProvider>{children}</ChakraProvider>
		</ApolloProvider>
	);
};

export default GlobalProvider;

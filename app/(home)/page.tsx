'use client';
import GlobalContainer from '@/components/global-container';
import { useQuery } from '@apollo/client';
import { GET_ALL_NOTES } from '@/http/_GET';
import NotesContainer from './(components)/notes-container';
import { NoteType } from '@/types';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heading } from '@chakra-ui/react';
import { useAuthHeader } from '@/data';
import helperAuth from '@/helper/auth.helper';
export default function Home() {
	const { data, loading, error } = useQuery(GET_ALL_NOTES);
	const authState = useAuthHeader();
	const router = useRouter();
	useEffect(() => {
		helperAuth(error, authState, router);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);
	return (
		<main style={{ paddingTop: '7rem' }}>
			<GlobalContainer>
				{data && !loading && !error ? (
					<NotesContainer notes={data.getAllNotes as NoteType[]} />
				) : (
					<Heading>Loading ...</Heading>
				)}
			</GlobalContainer>
		</main>
	);
}

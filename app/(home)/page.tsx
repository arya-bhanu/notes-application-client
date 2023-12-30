'use client';
import GlobalContainer from '@/components/global-container';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_ALL_NOTES } from '@/http/_GET';
import NotesContainer from './(components)/notes-container';
export default function Home() {
	const { data, loading, error } = useQuery(GET_ALL_NOTES);
	console.log(data.getAllNotes);
	return (
		<main style={{ paddingTop: '7rem' }}>
			<GlobalContainer>
				<NotesContainer />
			</GlobalContainer>
		</main>
	);
}

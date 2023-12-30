'use client';
import GlobalContainer from '@/components/global-container';
import { useAuthHeader } from '@/data';
import helperAuth from '@/helper/auth.helper';
import { GET_NOTE } from '@/http/_GET';
import { useQuery } from '@apollo/client';
import { Box, Heading, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import parse from 'html-react-parser';

const NoteDetail = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const router = useRouter();
	const authHeader = useAuthHeader();
	const { data, loading, error } = useQuery(GET_NOTE, { variables: { id } });
	useEffect(() => {
		helperAuth(error, authHeader, router);
		if (data && data.getNote === null) {
			router.push('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, data]);
	return (
		<Box pt={'7rem'}>
			<GlobalContainer>
				{data && data.getNote && !loading && !error && (
					<Stack>
						<Heading>{data.getNote.title}</Heading>
						<Box>
							<span>{parse(data.getNote.body)}</span>
						</Box>
					</Stack>
				)}
			</GlobalContainer>
		</Box>
	);
};

export default NoteDetail;

import React from 'react';
import { Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import AddNote from './add-note';
import NoteCard from './note-card';
import { NoteType } from '@/types';

const NotesContainer = ({ notes }: { notes: NoteType[] }) => {
	return (
		<Flex
			w={'100%'}
			minH={'60vh'}
		>
			<Stack
				m={'auto'}
				alignItems={'center'}
				w={'100%'}
				rowGap={5}
			>
				{notes.length === 0 ? <Text>Your notes is empty</Text>: <SimpleGrid
					w={'100%'}
					columns={[1, 2, 3, 4, 5]}
					gap={4}
				>
					{notes.map((el, index) => {
						return (
							<NoteCard
								key={el.id}
								{...el}
							/>
						);
					})}
				</SimpleGrid>}
				
				<AddNote />
			</Stack>
		</Flex>
	);
};

export default NotesContainer;

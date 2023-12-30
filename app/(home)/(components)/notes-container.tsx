import React from 'react';
import { Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import AddNote from './add-note';
import NoteCard from './note-card';
const NotesContainer = () => {
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
				<SimpleGrid
					w={'100%'}
					columns={[1,2, 3, 4, 5]}
					gap={4}
				>
					<NoteCard />
					<NoteCard />
					<NoteCard />
					<NoteCard />
					<NoteCard />
					<NoteCard />
				</SimpleGrid>
				{/* <Text>Your notes is empty</Text> */}
				<AddNote />
			</Stack>
		</Flex>
	);
};

export default NotesContainer;

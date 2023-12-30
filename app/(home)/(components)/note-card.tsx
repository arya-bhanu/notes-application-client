import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Flex, Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const NoteCard = () => {
	return (
		<Stack
			p={3}
			rounded={'lg'}
			shadow={'md'}
			rowGap={8}
		>
			<Link
				href={'/'}
				style={{ textDecoration: 'underline', color: 'blue' }}
			>
				Title here
			</Link>
			<Flex
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Text>12/13/2023</Text>
				<Stack direction={'row'}>
					<IconButton
						size={'xs'}
						aria-label="delete note"
						icon={<DeleteIcon />}
					/>
					<IconButton
						size={'xs'}
						icon={<ViewIcon />}
						aria-label="view note"
					/>
                    <IconButton
						size={'xs'}
						icon={<EditIcon />}
						aria-label="edit note"
					/>
				</Stack>
			</Flex>
		</Stack>
	);
};

export default NoteCard;

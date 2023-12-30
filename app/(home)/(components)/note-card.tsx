import { DELETE_NOTE } from '@/http/_DELETE';
import { NoteType } from '@/types';
import { useMutation } from '@apollo/client';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
	Button,
	Flex,
	Icon,
	IconButton,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import ModalForm from './modal-form';

const NoteCard: React.FC<NoteType> = ({
	active,
	body,
	createdAt,
	id,
	title,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isEditModalOpen,
		onOpen: onEditModalOpen,
		onClose: onEditModalClose,
	} = useDisclosure();
	const router = useRouter();
	const [deleteNote, { data, loading, error }] = useMutation(DELETE_NOTE);
	const handleDeleteNote = async () => {
		try {
			const response = await deleteNote({
				variables: { input: id },
			});
			console.log(response);
			onClose();
			window.location.href = '/';
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Stack
			p={3}
			rounded={'lg'}
			shadow={'md'}
			rowGap={8}
		>
			<Link
				href={`/note/${id}`}
				style={{ textDecoration: 'underline', color: 'blue' }}
			>
				{title}
			</Link>
			<Flex
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Text>{new Date(createdAt).toLocaleDateString()}</Text>
				<Stack direction={'row'}>
					<IconButton
						onClick={onOpen}
						size={'xs'}
						aria-label="delete note"
						icon={<DeleteIcon />}
					/>
					<IconButton
						onClick={() => {
							router.push(`/note/${id}`);
						}}
						size={'xs'}
						icon={<ViewIcon />}
						aria-label="view note"
					/>
					<IconButton
						onClick={onEditModalOpen}
						size={'xs'}
						icon={<EditIcon />}
						aria-label="edit note"
					/>
				</Stack>
			</Flex>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Are you sure want to delete this note?</ModalHeader>
					<ModalCloseButton />

					<ModalFooter>
						<Button
							colorScheme="red"
							mr={3}
							onClick={handleDeleteNote}
						>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<ModalForm
				isOpen={isEditModalOpen}
				isUpdate
				onClose={onEditModalClose}
				note={{ active, body, createdAt, id, title } as NoteType}
			/>
		</Stack>
	);
};

export default NoteCard;

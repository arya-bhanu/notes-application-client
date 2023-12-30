import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Button, Stack, Text, useDisclosure } from '@chakra-ui/react';
import ModalForm from './modal-form';

const AddNote = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	return (
		<>
			<Stack m={'auto'}>
				<Button
					onClick={onOpen}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					gap={2}
				>
					<AddIcon />
					<span>Add note </span>
				</Button>
			</Stack>
			<ModalForm
				isUpdate={false}
				finalRef={finalRef}
				initialRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	);
};

export default AddNote;

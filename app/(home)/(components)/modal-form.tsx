import { POST_ADD_NEW_NOTE } from '@/http/_POST';
import { IFormNote } from '@/interface/interface';
import { useMutation } from '@apollo/client';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
export type ModalFormProps = {
	isUpdate: boolean;
	isOpen: boolean;
	initialRef: React.MutableRefObject<null>;
	finalRef: React.MutableRefObject<null>;
	onClose: () => void;
};

const ModalForm: React.FC<ModalFormProps> = ({
	finalRef,
	initialRef,
	isOpen,
	onClose,
	isUpdate,
}) => {
	const [valueRichText, setValueRichText] = useState('');
	const router = useRouter();
	const [addNote, { loading, data, error }] = useMutation(POST_ADD_NEW_NOTE);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormNote>();
	const onSubmit: SubmitHandler<IFormNote> = async (data) => {
		try {
			const response = await addNote({
				variables: { input: { title: data.title, body: valueRichText } },
			});
			onClose();
			window.location.href = '/';
			console.log(response);
		} catch (err) {
			console.error(err);
		}
	};
	function isQuillEmpty(value: string) {
		if (
			value.replace(/<(.|\n)*?>/g, '').trim().length === 0 &&
			!value.includes('<img')
		) {
			return true;
		}
		return false;
	}
	return (
		<Modal
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					{isUpdate ? 'Update Note' : 'Create New Note'}
				</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalBody pb={6}>
						<FormControl isInvalid={Boolean(errors.title)}>
							<FormLabel htmlFor="title">Title</FormLabel>
							<Input
								id="title"
								{...register('title', { required: 'Title is required' })}
								placeholder="Note title"
							/>
							<FormErrorMessage>{errors.title?.message}</FormErrorMessage>
						</FormControl>
						<FormControl
							mt={6}
							isInvalid={Boolean(isQuillEmpty(valueRichText))}
						>
							<Stack>
								<FormLabel>Note Content</FormLabel>
								<ReactQuill
									theme="snow"
									value={valueRichText}
									onChange={setValueRichText}
								/>
							</Stack>
							<FormErrorMessage mt={2}>
								{Boolean(isQuillEmpty(valueRichText)) &&
									'Note content is required'}
							</FormErrorMessage>
						</FormControl>
					</ModalBody>

					<ModalFooter mt={5}>
						<Button
							type="submit"
							colorScheme="blue"
							mr={3}
						>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default ModalForm;

import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Text,
	VStack,
	Icon,
} from '@chakra-ui/react';

// Lock icon
const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
		/>
	</svg>
);

interface AccessCodeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (accessCode: string) => Promise<void>;
	challengeTitle: string;
	isLoading?: boolean;
}

export const AccessCodeModal: React.FC<AccessCodeModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	challengeTitle,
	isLoading = false,
}) => {
	const [accessCode, setAccessCode] = useState('');
	const [error, setError] = useState<string>('');

	const handleSubmit = async () => {
		if (!accessCode.trim()) {
			setError('Access code is required');
			return;
		}

		setError('');
		try {
			await onSubmit(accessCode.trim());
			// If successful, close modal and reset state
			handleClose();
		} catch (error: any) {
			setError(error.message || 'Invalid access code');
		}
	};

	const handleClose = () => {
		setAccessCode('');
		setError('');
		onClose();
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !isLoading) {
			handleSubmit();
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} isCentered size={{ base: 'full', md: 'md' }}>
			<ModalOverlay />
			<ModalContent mx={{ base: 4, md: 'auto' }} my={{ base: 4, md: 'auto' }}>
				<ModalHeader>
					<VStack spacing={2} align="start">
						<Text display="flex" alignItems="center" gap={2}>
							<Icon as={LockIcon} w={5} h={5} />
							Private Challenge
						</Text>
						<Text fontSize="sm" fontWeight="normal" color="gray.600">
							{challengeTitle}
						</Text>
					</VStack>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing={4}>
						<Text fontSize="sm" color="gray.600">
							This is a private challenge. Please enter the access code to join.
						</Text>
						<FormControl isInvalid={!!error}>
							<FormLabel>Access Code</FormLabel>
							<Input
								value={accessCode}
								onChange={e => {
									setAccessCode(e.target.value);
									if (error) setError(''); // Clear error when user types
								}}
								onKeyPress={handleKeyPress}
								placeholder="Enter access code"
								disabled={isLoading}
								autoFocus
							/>
							{error && <FormErrorMessage>{error}</FormErrorMessage>}
						</FormControl>
					</VStack>
				</ModalBody>

				<ModalFooter flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
					<Button
						variant="ghost"
						mr={{ base: 0, md: 3 }}
						onClick={handleClose}
						disabled={isLoading}
						w={{ base: 'full', md: 'auto' }}
						order={{ base: 2, md: 1 }}
					>
						Cancel
					</Button>
					<Button
						colorScheme="green"
						onClick={handleSubmit}
						isLoading={isLoading}
						loadingText="Joining..."
						disabled={!accessCode.trim()}
						w={{ base: 'full', md: 'auto' }}
						order={{ base: 1, md: 2 }}
					>
						Join Challenge
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

import React from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	HStack,
} from '@chakra-ui/react';

interface ConfirmationDialogProps {
	/** Dialog open state */
	isOpen: boolean;
	/** Close handler */
	onClose: () => void;
	/** Confirm action handler */
	onConfirm: () => void;
	/** Ref for focus management */
	cancelRef: React.RefObject<HTMLButtonElement>;
	/** Dialog title */
	title?: string;
	/** Dialog message */
	message?: string;
	/** Confirm button text */
	confirmText?: string;
	/** Cancel button text */
	cancelText?: string;
	/** Confirm button color scheme */
	confirmColorScheme?: string;
	/** Loading state for confirm button */
	isLoading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
	isOpen,
	onClose,
	onConfirm,
	cancelRef,
	title = 'Confirm Action',
	message = 'Are you sure you want to proceed? This action cannot be undone.',
	confirmText = 'Delete',
	cancelText = 'Cancel',
	confirmColorScheme = 'red',
	isLoading = false,
}) => {
	const handleConfirm = () => {
		onConfirm();
		onClose();
	};

	return (
		<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						{title}
					</AlertDialogHeader>

					<AlertDialogBody>{message}</AlertDialogBody>

					<AlertDialogFooter>
						<HStack spacing={3}>
							<Button ref={cancelRef} onClick={onClose}>
								{cancelText}
							</Button>
							<Button colorScheme={confirmColorScheme} onClick={handleConfirm} isLoading={isLoading}>
								{confirmText}
							</Button>
						</HStack>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

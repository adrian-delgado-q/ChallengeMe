import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormHelperText
} from '@chakra-ui/react';

interface AccessCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (accessCode: string) => void;
    isLoading?: boolean;
    teamName?: string;
}

export const AccessCodeModal: React.FC<AccessCodeModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
    teamName
}) => {
    const [accessCode, setAccessCode] = useState('');

    const handleSubmit = () => {
        if (accessCode.trim()) {
            onSubmit(accessCode.trim());
        }
    };

    const handleClose = () => {
        setAccessCode('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Join Private Team{teamName ? `: ${teamName}` : ''}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Access Code</FormLabel>
                        <Input
                            type="password"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            placeholder="Enter the team's access code"
                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                            isDisabled={isLoading}
                        />
                        <FormHelperText>
                            Enter the access code provided by the team administrator
                        </FormHelperText>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="ghost"
                        mr={3}
                        onClick={handleClose}
                        isDisabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        isDisabled={!accessCode.trim()}
                    >
                        Join Team
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

import React from 'react';
import { Center, Alert, AlertIcon, AlertTitle, AlertDescription, Box } from '@chakra-ui/react';

interface GenericErrorProps {
    message?: string;
    details?: string;
}

export const GenericError: React.FC<GenericErrorProps> = ({
    message = "An Unexpected Error Occurred",
    details = "Something went wrong on our end. Please refresh the page or try again later."
}) => (
    <Center h="60vh" color="gray.800">
        <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="220px"
            rounded="lg"
            p={6}
        >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
                {message}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
                {details}
            </AlertDescription>
        </Alert>
    </Center>
);
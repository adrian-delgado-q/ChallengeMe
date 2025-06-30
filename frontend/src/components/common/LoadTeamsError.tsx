import React from 'react';
import { Center, Alert, AlertIcon, AlertTitle, AlertDescription, Button } from '@chakra-ui/react';

interface LoadTeamsErrorProps {
    onRetry: () => void;
}

export const LoadTeamsError: React.FC<LoadTeamsErrorProps> = ({ onRetry }) => (
    <Center h="60vh">
        <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            rounded="lg"
        >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
                Could not load teams
            </AlertTitle>
            <AlertDescription maxWidth="sm">
                There was an issue fetching the team data. Please try again later.
            </AlertDescription>
            <Button mt={4} colorScheme="red" variant="outline" onClick={onRetry}>
                Try Again
            </Button>
        </Alert>
    </Center>
);
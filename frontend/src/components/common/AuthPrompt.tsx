import React from 'react';
import { Center, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { Card } from './Card';

interface AuthPromptProps {
  onLogin: () => void;
}

export const AuthPrompt: React.FC<AuthPromptProps> = ({ onLogin }) => (
    <Center h="60vh">
        <Card p={8} textAlign="center">
            <VStack spacing={4}>
                <Heading as="h3" size="lg">Authentication Required</Heading>
                <Text color="gray.600">Please log in or sign up to view this page.</Text>
                <Button colorScheme="orange" onClick={onLogin}>
                    Go to Login Page
                </Button>
            </VStack>
        </Card>
    </Center>
);
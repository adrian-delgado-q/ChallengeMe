import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { Card } from '../components/common/Card';
import { ChallengeForm } from '../components/challenges/ChallengeForm'; // Import the new reusable form

const CreateChallengePage: React.FC = () => {
    
    const handleCreateChallenge = (formData: any) => {
        // In a real app, you would send this data to your backend API
        console.log("Creating new challenge with data:", formData);
        alert("Challenge created successfully! (See console for data)");
    };
    
    return (
        <Box maxW="4xl" mx="auto">
            <Card p={8}>
                <VStack spacing={8}>
                    <VStack textAlign="center">
                        <Heading as="h2" size="xl">Create a New Challenge</Heading>
                        <Text color="gray.600">Define the rules, set the goal, and invite others to join.</Text>
                    </VStack>
                    <ChallengeForm 
                        onSubmit={handleCreateChallenge}
                        isEditing={false} 
                    />
                </VStack>
            </Card>
        </Box>
    );
};
export default CreateChallengePage;

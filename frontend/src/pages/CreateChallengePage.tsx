import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { ChallengeForm } from '../components/challenges/ChallengeForm';

const CreateChallengePage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateChallenge = (challenge: any) => {
        // Navigate to the challenges list or the new challenge detail page
        if (challenge && challenge.id) {
            // Navigate to the new challenge detail page
            navigate(`/challenge/${challenge.id}`);
        } else {
            // Fallback to challenges list
            navigate('/challenges');
        }
    };

    const handleCancel = () => {
        navigate('/challenges');
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
                        onCancel={handleCancel}
                        isEditing={false}
                    />
                </VStack>
            </Card>
        </Box>
    );
};
export default CreateChallengePage;

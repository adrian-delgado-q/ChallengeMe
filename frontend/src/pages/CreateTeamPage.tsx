import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { TeamForm } from '../components/teams/TeamForm';


const CreateTeamPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateTeam = (team: any) => {
        // Navigate to the teams list or the new team detail page
        if (team && team.id) {
            // Navigate to the new team detail page
            navigate(`/teams/${team.id}`);
        } else {
            // Fallback to teams list
            navigate('/teams');
        }
    };

    const handleCancel = () => {
        navigate('/teams');
    };

    return (
        <Box maxW="4xl" mx="auto">
            <Card p={8}>
                <VStack spacing={8}>
                    <VStack textAlign="center">
                        <Heading as="h2" size="xl">Create a New Team</Heading>
                        <Text color="gray.600" maxW="2xl">
                            Build your dream team and take on challenges together. Invite friends and compete as a group!
                        </Text>
                    </VStack>
                    <Box w="full">
                        <TeamForm
                            onSubmit={handleCreateTeam}
                            onCancel={handleCancel}
                        />
                    </Box>
                </VStack>
            </Card>
        </Box>
    );
};

export default CreateTeamPage;

import React from 'react';
import { Box, Heading, Text, HStack, Icon } from '@chakra-ui/react';
import { Card } from '../common/Card';
import type { ChallengeRulesProps} from '../../types';
import { ClipboardListIcon } from '../common/Icons'; // Importing Heroicons for the clipboard icon


export const ChallengeRules: React.FC<ChallengeRulesProps> = ({ rules }) => {
    // Determine if there are any rules to display
    const hasRules = rules.minDuration || rules.minRepetitions;

    if (!hasRules) {
        return null; // Don't render anything if there are no rules
    }

    return (
        <Card p={6}>
            <HStack spacing={4}>
                <Icon as={ClipboardListIcon} w={8} h={8} color="orange.500" />
                <Box>
                    <Heading as="h3" size="md">Challenge Rules</Heading>
                    <HStack spacing={6} mt={1} color="gray.700" flexWrap="wrap">
                        {rules.minDuration && (
                            <Text fontSize="sm">Minimum Duration: <strong>{rules.minDuration} mins</strong> per activity</Text>
                        )}
                        {rules.minRepetitions && (
                            <Text fontSize="sm">Minimum Reps: <strong>{rules.minRepetitions}</strong> per activity</Text>
                        )}
                    </HStack>
                </Box>
            </HStack>
        </Card>
    );
};

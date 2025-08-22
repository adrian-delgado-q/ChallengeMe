import React, { useState, useRef, useEffect } from 'react';
import {
    Box, Input, VStack, HStack, Text, Tag, TagLabel, TagCloseButton,
    Spinner, InputGroup, InputLeftElement
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import type { ActivityType } from '../../types';

interface ActivityTypeSelectorProps {
    activityTypes: ActivityType[];
    selectedActivityTypeIds: string[];
    onSelectionChange: (selectedIds: string[]) => void;
    isLoading?: boolean;
    isDisabled?: boolean;
}

export const ActivityTypeSelector: React.FC<ActivityTypeSelectorProps> = ({
    activityTypes,
    selectedActivityTypeIds,
    onSelectionChange,
    isLoading = false,
    isDisabled = false
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Filter activity types based on search term and exclude already selected ones
    const filteredActivityTypes = activityTypes.filter(activityType =>
        !selectedActivityTypeIds.includes(activityType.id) &&
        (activityType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activityType.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activityType.unitLabel.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Get selected activity type objects
    const selectedActivityTypes = selectedActivityTypeIds.map(id =>
        activityTypes.find(at => at.id === id)
    ).filter(Boolean) as ActivityType[];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsOpen(value.length > 0);
        setHighlightedIndex(-1);
    };

    // Handle input focus
    const handleInputFocus = () => {
        if (searchTerm.length > 0) {
            setIsOpen(true);
        }
    };

    // Handle activity type selection
    const handleSelectActivityType = (activityType: ActivityType) => {
        if (!selectedActivityTypeIds.includes(activityType.id)) {
            onSelectionChange([...selectedActivityTypeIds, activityType.id]);
        }
        setSearchTerm('');
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.focus();
    };

    // Handle activity type removal
    const handleRemoveActivityType = (activityTypeId: string) => {
        onSelectionChange(selectedActivityTypeIds.filter(id => id !== activityTypeId));
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev =>
                    prev < filteredActivityTypes.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && filteredActivityTypes[highlightedIndex]) {
                    handleSelectActivityType(filteredActivityTypes[highlightedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
        }
    };

    // Group activity types by category for better display
    const groupedActivityTypes = filteredActivityTypes.reduce((acc, activityType) => {
        if (!acc[activityType.category]) {
            acc[activityType.category] = [];
        }
        acc[activityType.category].push(activityType);
        return acc;
    }, {} as Record<string, ActivityType[]>);

    return (
        <VStack spacing={4} align="stretch">
            {/* Selected Activity Types */}
            {selectedActivityTypes.length > 0 && (
                <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>Selected Activities:</Text>
                    <HStack spacing={2} flexWrap="wrap">
                        {selectedActivityTypes.map(activityType => (
                            <Tag key={activityType.id} size="md" colorScheme="orange" variant="solid">
                                <TagLabel>
                                    {activityType.name} ({activityType.unitLabel})
                                </TagLabel>
                                <TagCloseButton
                                    onClick={() => handleRemoveActivityType(activityType.id)}
                                    isDisabled={isDisabled}
                                />
                            </Tag>
                        ))}
                    </HStack>
                </Box>
            )}

            {/* Activity Type Search Input */}
            <Box position="relative" ref={listRef}>
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        {isLoading ? <Spinner size="sm" /> : <SearchIcon color="gray.400" />}
                    </InputLeftElement>
                    <Input
                        ref={inputRef}
                        placeholder="Search for activity types (e.g., running, cycling, push-ups...)"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onKeyDown={handleKeyDown}
                        isDisabled={isDisabled || isLoading}
                    />
                </InputGroup>

                {/* Dropdown List */}
                {isOpen && (
                    <Box
                        position="absolute"
                        top="100%"
                        left={0}
                        right={0}
                        zIndex={1000}
                        bg="white"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        boxShadow="lg"
                        maxH="300px"
                        overflowY="auto"
                        mt={1}
                    >
                        {filteredActivityTypes.length === 0 ? (
                            <Box p={4} textAlign="center">
                                <Text color="gray.500" fontSize="sm">
                                    {searchTerm ? 'No matching activity types found' : 'Start typing to search for activities'}
                                </Text>
                            </Box>
                        ) : (
                            <VStack spacing={0} align="stretch">
                                {Object.entries(groupedActivityTypes).map(([category, categoryActivityTypes]) => (
                                    <Box key={category}>
                                        <Text
                                            fontSize="xs"
                                            fontWeight="bold"
                                            color="gray.600"
                                            p={2}
                                            bg="gray.50"
                                            borderBottom="1px solid"
                                            borderColor="gray.100"
                                        >
                                            {category}
                                        </Text>
                                        {categoryActivityTypes.map((activityType) => {
                                            const globalIndex = filteredActivityTypes.indexOf(activityType);
                                            const isHighlighted = globalIndex === highlightedIndex;

                                            return (
                                                <Box
                                                    key={activityType.id}
                                                    p={3}
                                                    cursor="pointer"
                                                    bg={isHighlighted ? 'orange.50' : 'white'}
                                                    _hover={{ bg: 'orange.50' }}
                                                    borderBottom="1px solid"
                                                    borderColor="gray.100"
                                                    onClick={() => handleSelectActivityType(activityType)}
                                                >
                                                    <HStack justify="space-between">
                                                        <VStack align="start" spacing={1}>
                                                            <Text fontSize="sm" fontWeight="medium">
                                                                {activityType.name}
                                                            </Text>
                                                            {activityType.description && (
                                                                <Text fontSize="xs" color="gray.600">
                                                                    {activityType.description}
                                                                </Text>
                                                            )}
                                                        </VStack>
                                                        <Text fontSize="xs" color="orange.600" fontWeight="medium">
                                                            {activityType.unitLabel}
                                                        </Text>
                                                    </HStack>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                ))}
                            </VStack>
                        )}
                    </Box>
                )}
            </Box>

            {/* Helper Text */}
            <Text fontSize="xs" color="gray.500">
                Select one or more activities for this challenge. Participants can log activities from any of the selected types.
            </Text>
        </VStack>
    );
};

import React from 'react';
import {
	Box,
	VStack,
	HStack,
	Text,
	Input,
	IconButton,
	Button,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Badge,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import type { ActivityType, Milestone } from '../../types';

interface MilestoneManagerProps {
	activityTypes: ActivityType[];
	selectedActivityTypeIds: string[];
	milestonesByActivityType: Record<string, Partial<Milestone>[]>;
	onUpdateMilestone: (activityTypeId: string, index: number, field: string, value: any) => void;
	onAddMilestone: (activityTypeId: string) => void;
	onRemoveMilestone: (activityTypeId: string, index: number) => void;
	isDisabled?: boolean;
}

export const MilestoneManager: React.FC<MilestoneManagerProps> = ({
	activityTypes,
	selectedActivityTypeIds,
	milestonesByActivityType,
	onUpdateMilestone,
	onAddMilestone,
	onRemoveMilestone,
	isDisabled = false,
}) => {
	// Get selected activity types with their data
	const selectedActivityTypes = selectedActivityTypeIds
		.map(id => activityTypes.find(at => at.id === id))
		.filter(Boolean) as ActivityType[];

	if (selectedActivityTypes.length === 0) {
		return null;
	}

	return (
		<Box>
			<VStack align="stretch" spacing={4}>
				<Box>
					<Text fontSize="lg" fontWeight="bold" mb={2}>
						Milestone Goals by Activity
					</Text>
					<Text fontSize="sm" color="gray.600" mb={4}>
						Define progressive milestones for each activity type. Participants will work towards these
						goals as they log activities.
					</Text>
				</Box>

				<Accordion allowMultiple defaultIndex={[0]}>
					{selectedActivityTypes.map(activityType => {
						const milestones = milestonesByActivityType[activityType.id] || [];
						const totalMilestones = milestones.length;
						const completedMilestones = milestones.filter(m => m.name && m.value && m.value > 0).length;

						return (
							<AccordionItem
								key={activityType.id}
								border="1px solid"
								borderColor="gray.200"
								borderRadius="md"
								mb={3}
							>
								<AccordionButton bg="gray.50" _hover={{ bg: 'gray.100' }} borderRadius="md" p={4}>
									<Box flex="1" textAlign="left">
										<HStack justify="space-between" w="full">
											<VStack align="start" spacing={1}>
												<HStack>
													<Text fontWeight="bold" color="orange.600">
														{activityType.name}
													</Text>
													<Badge colorScheme="blue" variant="subtle">
														{activityType.category}
													</Badge>
												</HStack>
												<Text fontSize="sm" color="gray.600">
													Measured in {activityType.unitLabel}
												</Text>
											</VStack>
											<HStack>
												<Badge
													colorScheme={completedMilestones === totalMilestones ? 'green' : 'orange'}
													variant="solid"
												>
													{completedMilestones}/{totalMilestones} completed
												</Badge>
												<AccordionIcon />
											</HStack>
										</HStack>
									</Box>
								</AccordionButton>
								<AccordionPanel p={4} bg="white">
									<VStack spacing={4} align="stretch">
										{/* Milestone explanation */}
										<Box p={3} bg="blue.50" borderRadius="md" borderLeft="4px solid" borderColor="blue.400">
											<Text fontSize="sm" color="blue.800">
												<strong>Tip:</strong> Create progressive milestones that motivate participants. For
												example: "Beginner" (10 {activityType.unit}), "Intermediate" (25 {activityType.unit}),
												"Advanced" (50 {activityType.unit}
												).
											</Text>
										</Box>

										{/* Milestone list */}
										<VStack spacing={3} align="stretch">
											{milestones.map((milestone, milestoneIndex) => (
												<Box
													key={milestoneIndex}
													p={3}
													border="1px solid"
													borderColor="gray.200"
													borderRadius="md"
													bg="gray.50"
												>
													<HStack spacing={3} align="end">
														<VStack align="start" flex={1} spacing={2}>
															<Text fontSize="xs" fontWeight="medium" color="gray.600">
																Milestone Name
															</Text>
															<Input
																placeholder={`e.g., ${milestoneIndex === 0 ? 'Beginner' : milestoneIndex === 1 ? 'Intermediate' : 'Advanced'}`}
																value={milestone.name || ''}
																onChange={e =>
																	onUpdateMilestone(activityType.id, milestoneIndex, 'name', e.target.value)
																}
																isDisabled={isDisabled}
																size="sm"
																bg="white"
															/>
														</VStack>
														<VStack align="start" spacing={2}>
															<Text fontSize="xs" fontWeight="medium" color="gray.600">
																Goal ({activityType.unitLabel})
															</Text>
															<NumberInput
																value={milestone.value || ''}
																onChange={(_, valueNumber) =>
																	onUpdateMilestone(activityType.id, milestoneIndex, 'value', valueNumber)
																}
																min={0}
																precision={activityType.unit === 'km' ? 1 : 0}
																step={activityType.unit === 'km' ? 0.5 : 1}
																isDisabled={isDisabled}
																size="sm"
																width="120px"
															>
																<NumberInputField bg="white" />
																<NumberInputStepper>
																	<NumberIncrementStepper />
																	<NumberDecrementStepper />
																</NumberInputStepper>
															</NumberInput>
														</VStack>
														<VStack spacing={2}>
															<Text fontSize="xs" fontWeight="medium" color="gray.600">
																Action
															</Text>
															<IconButton
																aria-label="Remove milestone"
																icon={<DeleteIcon />}
																colorScheme="red"
																variant="ghost"
																size="sm"
																onClick={() => onRemoveMilestone(activityType.id, milestoneIndex)}
																isDisabled={milestones.length <= 1 || isDisabled}
															/>
														</VStack>
													</HStack>
												</Box>
											))}
										</VStack>

										{/* Add milestone button */}
										<Button
											leftIcon={<AddIcon />}
											variant="outline"
											colorScheme="orange"
											size="sm"
											onClick={() => onAddMilestone(activityType.id)}
											isDisabled={isDisabled}
											alignSelf="start"
										>
											Add Milestone
										</Button>

										{/* Milestone preview */}
										{milestones.some(m => m.name && m.value && m.value > 0) && (
											<Box
												p={3}
												bg="green.50"
												borderRadius="md"
												borderLeft="4px solid"
												borderColor="green.400"
											>
												<Text fontSize="sm" fontWeight="medium" color="green.800" mb={2}>
													Preview: {activityType.name} Milestones
												</Text>
												<HStack spacing={2} flexWrap="wrap">
													{milestones
														.filter(m => m.name && m.value && m.value > 0)
														.sort((a, b) => (a.value || 0) - (b.value || 0))
														.map((milestone, index) => (
															<Badge key={index} colorScheme="green" variant="solid">
																{milestone.name}: {milestone.value} {activityType.unit}
															</Badge>
														))}
												</HStack>
											</Box>
										)}
									</VStack>
								</AccordionPanel>
							</AccordionItem>
						);
					})}
				</Accordion>
			</VStack>
		</Box>
	);
};

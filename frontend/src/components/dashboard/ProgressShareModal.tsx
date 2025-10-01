import React, { useRef, useState } from 'react';
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure,
	VStack,
	HStack,
	Text,
	Box,
	useToast,
	Icon,
} from '@chakra-ui/react';
import { ShareableWidget } from './ShareableWidget';
import { SocialShareButton } from './SocialShareButton';
import { ShareImageGenerator } from '../../services/shareImageService';
import type { Challenge } from '../../types';

// Achievement/Trophy icon for sharing progress
const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.228a9.014 9.014 0 012.916.52 6.003 6.003 0 01-4.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0A6.002 6.002 0 0112 15.75c-2.904 0-5.231-2.051-5.231-4.57 0-.422.049-.843.144-1.255m5.087 5.825a8.25 8.25 0 01-2.81 0m8.272-13.595a12.023 12.023 0 013.933.725 9.013 9.013 0 01-3.933-.725z"
		/>
	</svg>
);

interface ProgressShareModalProps {
	challenge: Challenge;
	currentProgress?: number;
	progressByActivityType?: Record<string, number>;
	dailyStreak?: number;
	todayActivity?: boolean;
	userName?: string;
	buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
	buttonVariant?: 'solid' | 'outline' | 'ghost';
	iconColor?: string;
}

export const ProgressShareModal: React.FC<ProgressShareModalProps> = ({
	challenge,
	currentProgress = 0,
	progressByActivityType = {},
	dailyStreak = 0,
	todayActivity = false,
	userName = 'You',
	buttonSize = 'sm',
	buttonVariant = 'outline',
	iconColor = 'gray.600',
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const shareableWidgetRef = useRef<HTMLDivElement>(null);
	const [isGeneratingImage, setIsGeneratingImage] = useState(false);
	const toast = useToast();

	// Calculate user progress data
	const milestones = challenge.milestones || [];
	const achievedMilestones = milestones.filter(milestone => {
		const activityProgress =
			progressByActivityType[milestone.activityTypeId || 'general'] || currentProgress;
		return activityProgress >= milestone.value;
	}).length;

	const userProgress = {
		currentProgress,
		achievedMilestones,
		totalMilestones: milestones.length,
		dailyStreak,
		todayActivity,
		progressByActivityType,
	};

	// Generate shareable image
	const handleGenerateShareImage = async (): Promise<string> => {
		if (!shareableWidgetRef.current) {
			throw new Error('Share widget not available');
		}

		setIsGeneratingImage(true);
		try {
			const imageData = await ShareImageGenerator.generateImage(shareableWidgetRef.current, {
				width: 400,
				height: 500,
				quality: 1,
				pixelRatio: 2,
			});

			return imageData;
		} catch (error) {
			console.error('Failed to generate share image:', error);
			toast({
				title: 'Failed to generate image',
				description: 'Unable to create shareable image. Please try again.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			throw error;
		} finally {
			setIsGeneratingImage(false);
		}
	};

	return (
		<>
			{/* Small share button */}
			<Button
				leftIcon={<Icon as={ShareIcon} color={iconColor} />}
				size={buttonSize}
				variant={buttonVariant}
				color={iconColor}
				onClick={onOpen}
				_hover={{ transform: 'translateY(-1px)', color: 'gray.800' }}
				transition="all 0.2s"
			>
				Share
			</Button>

			{/* Share modal */}
			<Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Share Your Progress</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<VStack spacing={6}>
							{/* Progress widget preview */}
							<Box>
								<Text fontSize="sm" color="gray.600" mb={4} textAlign="center">
									Here's your beautiful progress card:
								</Text>
								<HStack justify="center">
									<ShareableWidget
										ref={shareableWidgetRef}
										challenge={challenge}
										userProgress={userProgress}
										userName={userName}
									/>
								</HStack>
							</Box>

							{/* Share options */}
							<Box w="full">
								<Text fontSize="sm" color="gray.600" mb={3} textAlign="center">
									Share your achievements:
								</Text>
								<HStack justify="center">
									<SocialShareButton
										challenge={challenge}
										userProgress={userProgress}
										onGenerateShareImage={handleGenerateShareImage}
									/>
								</HStack>
							</Box>

							{/* Motivational message */}
							<Box
								bg="purple.50"
								p={4}
								borderRadius="md"
								border="1px solid"
								borderColor="purple.200"
								w="full"
							>
								<Text fontSize="sm" color="purple.800" textAlign="center" fontWeight="medium">
									🎉 Share your progress to motivate others and celebrate your achievements!
								</Text>
							</Box>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>

			{/* Loading state overlay */}
			{isGeneratingImage && (
				<Box
					position="fixed"
					top="0"
					left="0"
					right="0"
					bottom="0"
					bg="blackAlpha.600"
					display="flex"
					alignItems="center"
					justifyContent="center"
					zIndex={9999}
				>
					<Box bg="white" p={6} borderRadius="md" textAlign="center" boxShadow="lg">
						<VStack spacing={3}>
							<Box
								w={8}
								h={8}
								border="2px solid"
								borderColor="purple.200"
								borderTopColor="purple.500"
								borderRadius="50%"
								animation="spin 1s linear infinite"
								css={{
									'@keyframes spin': {
										'0%': { transform: 'rotate(0deg)' },
										'100%': { transform: 'rotate(360deg)' },
									},
								}}
							/>
							<Box fontSize="sm" color="gray.600">
								Generating your progress image...
							</Box>
						</VStack>
					</Box>
				</Box>
			)}
		</>
	);
};

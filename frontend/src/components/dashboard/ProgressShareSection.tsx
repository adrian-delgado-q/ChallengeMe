import React, { useRef, useState, useCallback } from 'react';
import { Box, VStack, HStack, useToast } from '@chakra-ui/react';
import { CompactMilestones } from './CompactMilestones';
import { SocialShareButton } from './SocialShareButton';
import { ShareableWidget } from './ShareableWidget';
import { ShareImageGenerator } from '../../services/shareImageService';
import type { Challenge } from '../../types';

interface ProgressShareSectionProps {
	challenge: Challenge;
	currentProgress?: number;
	progressByActivityType?: Record<string, number>;
	dailyStreak?: number;
	todayActivity?: boolean;
	userName?: string;
}

export const ProgressShareSection: React.FC<ProgressShareSectionProps> = ({
	challenge,
	currentProgress = 0,
	progressByActivityType = {},
	dailyStreak = 0,
	todayActivity = false,
	userName = 'You',
}) => {
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
	};

	// Generate shareable image
	const handleGenerateShareImage = useCallback(async (): Promise<string> => {
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
	}, [toast]);

	return (
		<VStack spacing={4} align="stretch">
			{/* Compact milestones display */}
			<CompactMilestones
				challenge={challenge}
				currentProgress={currentProgress}
				progressByActivityType={progressByActivityType}
				dailyStreak={dailyStreak}
				todayActivity={todayActivity}
			/>

			{/* Share button */}
			<HStack justify="center">
				<SocialShareButton
					challenge={challenge}
					userProgress={userProgress}
					onGenerateShareImage={handleGenerateShareImage}
				/>
			</HStack>

			{/* Hidden shareable widget for image generation */}
			<Box
				position="absolute"
				left="-9999px"
				top="-9999px"
				visibility="hidden"
				pointerEvents="none"
				aria-hidden="true"
			>
				<ShareableWidget
					ref={shareableWidgetRef}
					challenge={challenge}
					userProgress={userProgress}
					userName={userName}
				/>
			</Box>

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
		</VStack>
	);
};

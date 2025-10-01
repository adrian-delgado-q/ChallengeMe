import React, { useState } from 'react';
import {
	Button,
	HStack,
	VStack,
	Text,
	Icon,
	useToast,
	Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure,
} from '@chakra-ui/react';
import type { Challenge } from '../../types';

// Share icon
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
			d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935 2.186l-9.566 5.314m0 0a2.25 2.25 0 103.933 2.186 2.25 2.25 0 00-3.933-2.186M7.75 12H4.25m15.5 12H1.75m16.5-3v3m0-6h3"
		/>
	</svg>
);

// Social media icons
const TwitterIcon: React.FC = () => (
	<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);

const FacebookIcon: React.FC = () => (
	<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
		<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
	</svg>
);

const LinkedInIcon: React.FC = () => (
	<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
		<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
	</svg>
);

const DownloadIcon: React.FC = () => (
	<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
		<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
		<polyline points="7,10 12,15 17,10" />
		<line x1="12" y1="15" x2="12" y2="3" />
	</svg>
);

interface SocialShareButtonProps {
	challenge: Challenge;
	userProgress: {
		currentProgress: number;
		achievedMilestones: number;
		totalMilestones: number;
		dailyStreak: number;
		todayActivity: boolean;
		progressByActivityType?: Record<string, number>;
	};
	onGenerateShareImage?: () => Promise<string>; // Returns base64 image
}

export const SocialShareButton: React.FC<SocialShareButtonProps> = ({
	challenge,
	userProgress,
	onGenerateShareImage,
}) => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isGenerating, setIsGenerating] = useState(false);

	const generateShareText = () => {
		const {
			achievedMilestones,
			totalMilestones,
			dailyStreak,
			todayActivity,
			progressByActivityType,
		} = userProgress;

		let text = `🏆 Making progress on "${challenge.title}"!\n\n`;

		// Show activity counts if available
		if (progressByActivityType && Object.keys(progressByActivityType).length > 0) {
			const activityEntries = Object.entries(progressByActivityType);
			const totalReps = activityEntries.reduce((sum, [, count]) => sum + count, 0);

			text += `💪 Total Activities: ${totalReps}\n`;

			// Show individual activity counts (up to 3)
			activityEntries.slice(0, 3).forEach(([activityId, count]) => {
				const activityName = activityId.includes('-') ? activityId.split('-').pop() : activityId;
				text += `   • ${activityName}: ${count} reps\n`;
			});
			text += '\n';
		}

		// Show milestone progress
		text += `🎯 Milestones: ${achievedMilestones}/${totalMilestones} completed\n`;

		if (dailyStreak > 0) {
			text += `🔥 ${dailyStreak}-day streak!\n`;
		}

		if (todayActivity) {
			text += `✅ Active today\n`;
		}

		text += `\n#ChallengeMe #Fitness #Progress`;

		return text;
	};

	const shareToTwitter = () => {
		const text = generateShareText();
		const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
		window.open(url, '_blank');
	};

	const shareToFacebook = () => {
		const text = generateShareText();
		const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`;
		window.open(url, '_blank');
	};

	const shareToLinkedIn = () => {
		const text = generateShareText();
		const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(text)}`;
		window.open(url, '_blank');
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(generateShareText());
			toast({
				title: 'Copied to clipboard!',
				description: 'Your progress text has been copied to clipboard.',
				status: 'success',
				duration: 2000,
				isClosable: true,
			});
		} catch {
			toast({
				title: 'Failed to copy',
				description: 'Unable to copy to clipboard.',
				status: 'error',
				duration: 2000,
				isClosable: true,
			});
		}
	};

	const downloadImage = async () => {
		if (!onGenerateShareImage) return;

		setIsGenerating(true);
		try {
			const imageData = await onGenerateShareImage();

			// Create download link
			const link = document.createElement('a');
			link.download = `${challenge.title.replace(/[^a-zA-Z0-9]/g, '_')}_progress.png`;
			link.href = imageData;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			toast({
				title: 'Image downloaded!',
				description: 'Your progress image has been saved.',
				status: 'success',
				duration: 2000,
				isClosable: true,
			});
		} catch {
			toast({
				title: 'Failed to generate image',
				description: 'Unable to create progress image.',
				status: 'error',
				duration: 2000,
				isClosable: true,
			});
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<>
			<Button
				leftIcon={<Icon as={ShareIcon} />}
				colorScheme="purple"
				variant="solid"
				size="sm"
				onClick={onOpen}
				borderRadius="full"
				_hover={{ transform: 'translateY(-1px)' }}
				transition="all 0.2s"
			>
				Share Progress
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Share Your Progress</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<VStack spacing={4}>
							{/* Progress summary */}
							<Box
								p={4}
								bg="purple.50"
								borderRadius="md"
								border="1px solid"
								borderColor="purple.200"
								w="full"
							>
								<Text fontSize="sm" color="gray.700" whiteSpace="pre-line">
									{generateShareText()}
								</Text>
							</Box>

							{/* Share options */}
							<VStack spacing={3} w="full">
								<text fontSize="sm" color="gray.600" fontWeight="medium">
									Share to social media:
								</text>

								<HStack spacing={3} w="full" justify="center">
									<Button
										leftIcon={<TwitterIcon />}
										size="sm"
										colorScheme="twitter"
										onClick={shareToTwitter}
									>
										Twitter
									</Button>
									<Button
										leftIcon={<FacebookIcon />}
										size="sm"
										colorScheme="facebook"
										onClick={shareToFacebook}
									>
										Facebook
									</Button>
									<Button
										leftIcon={<LinkedInIcon />}
										size="sm"
										colorScheme="linkedin"
										onClick={shareToLinkedIn}
									>
										LinkedIn
									</Button>
								</HStack>

								{/* Additional options */}
								<VStack spacing={2} w="full">
									<Button variant="outline" size="sm" onClick={copyToClipboard} w="full">
										Copy Text
									</Button>

									{onGenerateShareImage && (
										<Button
											leftIcon={<DownloadIcon />}
											variant="outline"
											size="sm"
											onClick={downloadImage}
											isLoading={isGenerating}
											loadingText="Generating..."
											w="full"
										>
											Download Progress Image
										</Button>
									)}
								</VStack>
							</VStack>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

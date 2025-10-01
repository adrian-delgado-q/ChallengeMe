import { toPng } from 'html-to-image';

export class ShareImageGenerator {
	/**
	 * Generates a shareable image from a React component element
	 * @param element - The DOM element to convert to image
	 * @param options - Configuration options for image generation
	 * @returns Promise resolving to base64 data URL
	 */
	static async generateImage(
		element: HTMLElement,
		options: {
			width?: number;
			height?: number;
			quality?: number;
			pixelRatio?: number;
		} = {}
	): Promise<string> {
		const {
			width = 400,
			height = 500,
			quality = 1,
			pixelRatio = 2, // Higher pixel ratio for better quality
		} = options;

		try {
			const dataUrl = await toPng(element, {
				width,
				height,
				quality,
				pixelRatio,
				style: {
					// Ensure the element is properly sized
					width: `${width}px`,
					height: `${height}px`,
					// Force hardware acceleration for better rendering
					transform: 'translateZ(0)',
				},
				// Filter out problematic elements
				filter: (node: Element) => {
					// Skip script tags and other non-visual elements
					if (node.tagName === 'SCRIPT') return false;
					if (node.tagName === 'STYLE') return false;
					return true;
				},
			});

			return dataUrl;
		} catch (error) {
			console.error('Failed to generate share image:', error);
			throw new Error('Failed to generate shareable image');
		}
	}

	/**
	 * Downloads an image from a base64 data URL
	 * @param dataUrl - Base64 data URL of the image
	 * @param filename - Name for the downloaded file
	 */
	static downloadImage(dataUrl: string, filename: string = 'progress-share.png'): void {
		const link = document.createElement('a');
		link.download = filename;
		link.href = dataUrl;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	/**
	 * Copies an image to the clipboard (if supported by browser)
	 * @param element - The DOM element to convert and copy
	 */
	static async copyImageToClipboard(element: HTMLElement): Promise<void> {
		try {
			// Check if clipboard API is supported
			if (!navigator.clipboard) {
				throw new Error('Clipboard API not supported');
			}

			// Generate the image as blob
			const canvas = await import('html-to-image').then(lib =>
				lib.toCanvas(element, {
					width: 400,
					height: 500,
					pixelRatio: 2,
				})
			);

			// Convert canvas to blob
			const blob = await new Promise<Blob>(resolve => {
				canvas.toBlob((blob: Blob | null) => {
					if (blob) resolve(blob);
				}, 'image/png');
			});

			// Copy to clipboard
			await navigator.clipboard.write([
				new ClipboardItem({
					'image/png': blob,
				}),
			]);
		} catch (error) {
			console.error('Failed to copy image to clipboard:', error);
			throw new Error('Failed to copy image to clipboard');
		}
	}

	/**
	 * Generates a canvas element from HTML element for more complex operations
	 * @param element - The DOM element to convert
	 * @param options - Configuration options
	 * @returns Promise resolving to HTMLCanvasElement
	 */
	static async generateCanvas(
		element: HTMLElement,
		options: {
			width?: number;
			height?: number;
			pixelRatio?: number;
		} = {}
	): Promise<HTMLCanvasElement> {
		const { width = 400, height = 500, pixelRatio = 2 } = options;

		try {
			const { toCanvas } = await import('html-to-image');

			const canvas = await toCanvas(element, {
				width,
				height,
				pixelRatio,
				style: {
					width: `${width}px`,
					height: `${height}px`,
					transform: 'translateZ(0)',
				},
			});

			return canvas;
		} catch (error) {
			console.error('Failed to generate canvas:', error);
			throw new Error('Failed to generate canvas from element');
		}
	}

	/**
	 * Converts canvas to different image formats
	 * @param canvas - The canvas element
	 * @param format - Image format ('png', 'jpeg', 'webp')
	 * @param quality - Image quality (0-1, only for jpeg/webp)
	 * @returns Base64 data URL
	 */
	static canvasToDataUrl(
		canvas: HTMLCanvasElement,
		format: 'png' | 'jpeg' | 'webp' = 'png',
		quality: number = 0.92
	): string {
		const mimeType = `image/${format}`;
		return canvas.toDataURL(mimeType, quality);
	}

	/**
	 * Shares image using Web Share API (if supported)
	 * @param element - The DOM element to convert and share
	 * @param shareData - Additional share data
	 */
	static async shareImage(
		element: HTMLElement,
		shareData: {
			title?: string;
			text?: string;
			url?: string;
		} = {}
	): Promise<void> {
		try {
			// Check if Web Share API is supported
			if (!navigator.share) {
				throw new Error('Web Share API not supported');
			}

			// Generate canvas and convert to blob
			const canvas = await this.generateCanvas(element);
			const blob = await new Promise<Blob>(resolve => {
				canvas.toBlob(blob => {
					if (blob) resolve(blob);
				}, 'image/png');
			});

			// Create file from blob
			const file = new File([blob], 'progress-share.png', { type: 'image/png' });

			// Share the file
			const shareOptions: ShareData = {
				title: shareData.title || 'My Challenge Progress',
				text: shareData.text || 'Check out my progress!',
				files: [file],
			};

			if (shareData.url) {
				shareOptions.url = shareData.url;
			}

			await navigator.share(shareOptions);
		} catch (error) {
			console.error('Failed to share image:', error);
			throw new Error('Failed to share image');
		}
	}
}

// Utility functions for common share scenarios
export const shareUtils = {
	/**
	 * Generates share text for social media
	 */
	generateShareText: (data: {
		challengeTitle: string;
		completionPercentage: number;
		achievedMilestones: number;
		totalMilestones: number;
		dailyStreak: number;
		todayActivity: boolean;
		progressByActivityType?: Record<string, number>;
	}) => {
		const {
			challengeTitle,
			achievedMilestones,
			totalMilestones,
			dailyStreak,
			todayActivity,
			progressByActivityType,
		} = data;

		let text = `🏆 Making progress on "${challengeTitle}"!\n\n`;

		// Show activity counts if available
		if (progressByActivityType && Object.keys(progressByActivityType).length > 0) {
			const activityEntries = Object.entries(progressByActivityType);
			const totalReps = activityEntries.reduce((sum, [, count]) => sum + count, 0);

			text += `� Total Activities: ${totalReps}\n`;

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
	},

	/**
	 * Opens social media share URLs
	 */
	shareToSocial: {
		twitter: (text: string, url?: string) => {
			const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}${url ? `&url=${encodeURIComponent(url)}` : ''}`;
			window.open(shareUrl, '_blank', 'width=600,height=400');
		},

		facebook: (text: string, url?: string) => {
			const shareUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}${url ? `&u=${encodeURIComponent(url)}` : ''}`;
			window.open(shareUrl, '_blank', 'width=600,height=400');
		},

		linkedin: (text: string, url?: string) => {
			const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?summary=${encodeURIComponent(text)}${url ? `&url=${encodeURIComponent(url)}` : ''}`;
			window.open(shareUrl, '_blank', 'width=600,height=400');
		},
	},
};

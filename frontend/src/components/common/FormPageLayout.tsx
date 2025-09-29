import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { Card } from './Card';

interface FormPageLayoutProps {
	/** Page title */
	title: string;
	/** Page description */
	description?: string;
	/** Form content */
	children: React.ReactNode;
	/** Maximum width of the content */
	maxWidth?: string;
	/** Custom padding */
	cardPadding?: number | { base: number; md: number };
	/** Custom spacing */
	spacing?: number | { base: number; md: number };
}

export const FormPageLayout: React.FC<FormPageLayoutProps> = ({
	title,
	description,
	children,
	maxWidth = '4xl',
	cardPadding = { base: 6, md: 8 },
	spacing = { base: 6, md: 8 },
}) => {
	return (
		<Box maxW={maxWidth} mx="auto" w="full">
			<Card p={cardPadding}>
				<VStack spacing={spacing}>
					<VStack textAlign="center" spacing={{ base: 2, md: 4 }}>
						<Heading as="h2" size={{ base: 'lg', md: 'xl' }}>
							{title}
						</Heading>
						{description && (
							<Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }} maxW="2xl">
								{description}
							</Text>
						)}
					</VStack>
					<Box w="full">{children}</Box>
				</VStack>
			</Card>
		</Box>
	);
};

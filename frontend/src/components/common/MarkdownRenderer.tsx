import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
	Box,
	Text,
	UnorderedList,
	OrderedList,
	ListItem,
	Link,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Code,
	Divider,
	Heading,
} from '@chakra-ui/react';

interface MarkdownRendererProps {
	content: string;
	maxLines?: number;
	fontSize?: string;
	color?: string;
	lineHeight?: string | number;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
	content,
	maxLines,
	fontSize = 'md',
	color = 'gray.600',
	lineHeight = '1.6',
}) => {
	const components = {
		// Headings
		h1: ({ children }: any) => (
			<Heading as="h1" size="lg" mb={2} color="gray.800">
				{children}
			</Heading>
		),
		h2: ({ children }: any) => (
			<Heading as="h2" size="md" mb={2} color="gray.800">
				{children}
			</Heading>
		),
		h3: ({ children }: any) => (
			<Heading as="h3" size="sm" mb={2} color="gray.800">
				{children}
			</Heading>
		),

		// Paragraphs
		p: ({ children }: any) => (
			<Text mb={2} fontSize={fontSize} color={color} lineHeight={lineHeight}>
				{children}
			</Text>
		),

		// Lists
		ul: ({ children }: any) => (
			<UnorderedList mb={2} pl={4}>
				{children}
			</UnorderedList>
		),
		ol: ({ children }: any) => (
			<OrderedList mb={2} pl={4}>
				{children}
			</OrderedList>
		),
		li: ({ children }: any) => (
			<ListItem fontSize={fontSize} color={color} lineHeight={lineHeight}>
				{children}
			</ListItem>
		),

		// Links
		a: ({ href, children }: any) => (
			<Link href={href} color="blue.500" isExternal>
				{children}
			</Link>
		),

		// Tables
		table: ({ children }: any) => (
			<Table variant="simple" size="sm" mb={4}>
				{children}
			</Table>
		),
		thead: ({ children }: any) => <Thead>{children}</Thead>,
		tbody: ({ children }: any) => <Tbody>{children}</Tbody>,
		tr: ({ children }: any) => <Tr>{children}</Tr>,
		th: ({ children }: any) => (
			<Th fontSize="xs" color="gray.600">
				{children}
			</Th>
		),
		td: ({ children }: any) => (
			<Td fontSize={fontSize} color={color}>
				{children}
			</Td>
		),

		// Code
		code: ({ children, className }: any) => {
			// Check if it's a code block (has a language class)
			if (className?.startsWith('language-')) {
				return (
					<Box as="pre" bg="gray.100" p={3} borderRadius="md" overflowX="auto" mb={2}>
						<Code fontSize="sm" color="gray.800">
							{children}
						</Code>
					</Box>
				);
			}
			// Inline code
			return (
				<Code bg="gray.100" px={1} borderRadius="sm" fontSize="sm">
					{children}
				</Code>
			);
		},

		// Dividers
		hr: () => <Divider my={4} />,

		// Strong/Bold
		strong: ({ children }: any) => (
			<Text as="strong" fontWeight="bold">
				{children}
			</Text>
		),

		// Emphasis/Italic
		em: ({ children }: any) => (
			<Text as="em" fontStyle="italic">
				{children}
			</Text>
		),
	};

	return (
		<Box
			sx={{
				// If maxLines is specified, add truncation
				...(maxLines && {
					display: '-webkit-box',
					WebkitLineClamp: maxLines,
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				}),
			}}
		>
			<ReactMarkdown
				components={components}
				remarkPlugins={[remarkGfm]}
				skipHtml={true} // Skip HTML for security
			>
				{content}
			</ReactMarkdown>
		</Box>
	);
};

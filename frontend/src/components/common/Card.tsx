import React from 'react';
import { Box } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

export const Card: React.FC<BoxProps> = ({ children, ...props }) => (
    <Box bg="white" rounded="xl" shadow="sm" {...props}>
        {children}
    </Box>
);

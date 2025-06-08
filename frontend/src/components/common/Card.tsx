import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export const Card: React.FC<BoxProps> = ({ children, ...props }) => (
    <Box bg="white" rounded="xl" shadow="sm" {...props}>
        {children}
    </Box>
);

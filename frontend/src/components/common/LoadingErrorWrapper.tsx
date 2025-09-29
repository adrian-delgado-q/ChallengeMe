import React from 'react';
import { VStack, Spinner, Center } from '@chakra-ui/react';
import { ErrorDisplay } from './ErrorDisplay';

interface LoadingErrorWrapperProps {
    /** Loading state */
    isLoading: boolean;
    /** Error state */
    error?: string | Error | null;
    /** Custom loading component */
    loadingComponent?: React.ReactNode;
    /** Custom error title */
    errorTitle?: string;
    /** Custom error message */
    errorMessage?: string;
    /** Retry handler */
    onRetry?: () => void;
    /** Show full screen loading/error */
    fullScreen?: boolean;
    /** Loading text */
    loadingText?: string;
    /** Children to render when not loading and no error */
    children: React.ReactNode;
}

export const LoadingErrorWrapper: React.FC<LoadingErrorWrapperProps> = ({
    isLoading,
    error,
    loadingComponent,
    errorTitle,
    errorMessage,
    onRetry,
    fullScreen = false,
    loadingText,
    children
}) => {
    if (isLoading) {
        if (loadingComponent) {
            return <>{loadingComponent}</>;
        }

        const spinner = (
            <VStack spacing={4}>
                <Spinner size="xl" color="blue.500" />
                {loadingText && <span>{loadingText}</span>}
            </VStack>
        );

        return fullScreen ? (
            <Center h="60vh">
                {spinner}
            </Center>
        ) : (
            <Center py={8}>
                {spinner}
            </Center>
        );
    }

    if (error) {
        const errorMsg = typeof error === 'string' ? error : error.message || 'An error occurred';

        return (
            <ErrorDisplay
                title={errorTitle}
                message={errorMessage || errorMsg}
                onRetry={onRetry}
                fullScreen={fullScreen}
            />
        );
    }

    return <>{children}</>;
};

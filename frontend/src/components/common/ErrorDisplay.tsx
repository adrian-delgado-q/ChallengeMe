import React from 'react';
import { Center, Alert, AlertIcon, AlertTitle, AlertDescription, Button } from '@chakra-ui/react';

interface ErrorDisplayProps {
  /** Error title */
  title?: string;
  /** Error message description */
  message?: string;
  /** Show as full viewport centered error */
  fullScreen?: boolean;
  /** Optional retry callback */
  onRetry?: () => void;
  /** Retry button text */
  retryText?: string;
  /** Show in compact mode (smaller padding and sizing) */
  compact?: boolean;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = 'An Unexpected Error Occurred',
  message = 'Something went wrong on our end. Please refresh the page or try again later.',
  fullScreen = false,
  onRetry,
  retryText = 'Try Again',
  compact = false,
}) => {
  const alert = (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height={compact ? '180px' : '220px'}
      rounded="lg"
      p={compact ? 4 : 6}
    >
      <AlertIcon boxSize={compact ? '30px' : '40px'} mr={0} />
      <AlertTitle mt={4} mb={1} fontSize={compact ? 'md' : 'lg'}>
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm" fontSize={compact ? 'sm' : 'md'}>
        {message}
      </AlertDescription>
      {onRetry && (
        <Button
          mt={4}
          colorScheme="red"
          variant="outline"
          size={compact ? 'sm' : 'md'}
          onClick={onRetry}
        >
          {retryText}
        </Button>
      )}
    </Alert>
  );

  if (fullScreen) {
    return (
      <Center h="60vh" color="gray.800">
        {alert}
      </Center>
    );
  }

  return alert;
};

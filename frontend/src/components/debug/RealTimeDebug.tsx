import React, { useState, useEffect } from 'react';
import { Box, Text, Badge, VStack, Collapse, Button, useDisclosure } from '@chakra-ui/react';
import { supabase } from '../../supabase/client';

interface RealTimeDebugProps {
  challengeId?: string;
}

export const RealTimeDebug: React.FC<RealTimeDebugProps> = ({ challengeId }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [connectionStatus, setConnectionStatus] = useState<string>('Not connected');
  const [lastUpdate, setLastUpdate] = useState<string>('Never');
  const [updateCount, setUpdateCount] = useState<number>(0);

  useEffect(() => {
    if (!challengeId) return;

    const channel = supabase
      .channel(`debug-${challengeId}`, {
        config: {
          presence: {
            key: 'debug_' + Math.random().toString(36).substr(2, 9),
          },
        },
      })
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Activity',
          filter: `challengeId=eq.${challengeId}`,
        },
        payload => {
          setLastUpdate(new Date().toLocaleTimeString());
          setUpdateCount(prev => prev + 1);
          console.log('Debug: Real-time update received:', payload);
        }
      )
      .subscribe((status, err) => {
        setConnectionStatus(status);
        console.log('Debug: Connection status:', status);
        if (err) {
          console.error('Debug: Connection error:', err);
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [challengeId]);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Box position="fixed" bottom={4} right={4} zIndex={1000}>
      <Button size="sm" onClick={onToggle} colorScheme="gray" variant="outline">
        Debug Real-time
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={3}
          mt={2}
          shadow="md"
          minW="200px"
        >
          <VStack align="start" spacing={2}>
            <Text fontSize="sm" fontWeight="bold">
              Real-time Status
            </Text>
            <Badge colorScheme={connectionStatus === 'SUBSCRIBED' ? 'green' : 'red'}>
              {connectionStatus}
            </Badge>
            <Text fontSize="xs">
              <strong>Last Update:</strong> {lastUpdate}
            </Text>
            <Text fontSize="xs">
              <strong>Updates Count:</strong> {updateCount}
            </Text>
            <Text fontSize="xs">
              <strong>Challenge ID:</strong> {challengeId || 'None'}
            </Text>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
};

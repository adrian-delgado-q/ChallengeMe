import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '../supabase/client';

interface UseActivityUpdatesProps {
  challengeId?: string;
  onActivityUpdate: () => void;
  enabled?: boolean;
}

/**
 * Custom hook to handle real-time activity updates with fallback to polling
 * Optimized to prevent excessive subscriptions and infinite reconnection loops
 */
export const useActivityUpdates = ({
  challengeId,
  onActivityUpdate,
  enabled = true,
}: UseActivityUpdatesProps) => {
  const subscriptionRef = useRef<any>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityCountRef = useRef<number>(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCleanedUpRef = useRef<boolean>(false);

  // Real-time subscription setup with better error handling
  const setupRealTimeSubscription = useCallback(() => {
    if (!enabled || isCleanedUpRef.current) return;

    // Clean up existing subscription
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    // Only create subscription if we have a specific challenge ID
    // This prevents global subscriptions on the main page
    if (!challengeId) {
      console.log('No challengeId provided, skipping real-time subscription');
      return;
    }

    const channelName = `activities-${challengeId}`;

    try {
      console.log('Setting up real-time subscription for challenge:', challengeId);

      subscriptionRef.current = supabase
        .channel(channelName, {
          config: {
            presence: {
              key: 'user_' + Math.random().toString(36).substr(2, 9),
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
            console.log('Real-time activity update detected:', payload);
            if (!isCleanedUpRef.current) {
              onActivityUpdate();
            }
          }
        )
        .subscribe((status, err) => {
          console.log('Activity subscription status:', status);

          if (err) {
            console.error('Subscription error:', err);
          }

          // Handle different subscription states
          if (status === 'SUBSCRIBED') {
            console.log('Successfully subscribed to real-time updates');
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            console.warn('Real-time subscription failed, relying on polling');
            // Don't attempt reconnection for these error types
          } else if (status === 'CLOSED') {
            // Only attempt reconnection if we're still enabled and not cleaned up
            if (enabled && !isCleanedUpRef.current) {
              console.log('Connection closed, will attempt to reconnect in 5 seconds...');
              reconnectTimeoutRef.current = setTimeout(() => {
                if (enabled && !isCleanedUpRef.current) {
                  setupRealTimeSubscription();
                }
              }, 5000); // Increased delay to 5 seconds to prevent rapid reconnections
            }
          }
        });
    } catch (error) {
      console.warn('Failed to setup real-time subscription:', error);
      // Don't fall back to polling here, let the polling system handle it independently
    }
  }, [challengeId, enabled, onActivityUpdate]);

  // Polling fallback setup with better performance
  const setupPollingFallback = useCallback(async () => {
    if (!enabled || isCleanedUpRef.current) return;

    // Clear existing polling
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    // Only poll if we have a specific challenge ID
    if (!challengeId) {
      console.log('No challengeId provided, skipping polling');
      return;
    }

    // Check activity count every 10 seconds (reduced frequency)
    pollingIntervalRef.current = setInterval(async () => {
      // Only poll when the browser tab is active and not cleaned up
      if (document.hidden || isCleanedUpRef.current) return;

      try {
        const { count } = await supabase
          .from('Activity')
          .select('*', { count: 'exact', head: true })
          .eq('challengeId', challengeId);

        if (count !== null && count !== lastActivityCountRef.current) {
          lastActivityCountRef.current = count;
          console.log('Polling detected activity change, triggering update');
          if (!isCleanedUpRef.current) {
            onActivityUpdate();
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 10000); // Increased to 10 seconds to reduce load

    // Get initial count
    try {
      const { count } = await supabase
        .from('Activity')
        .select('*', { count: 'exact', head: true })
        .eq('challengeId', challengeId);

      if (count !== null) {
        lastActivityCountRef.current = count;
      }
    } catch (error) {
      console.error('Failed to get initial activity count:', error);
    }
  }, [challengeId, enabled, onActivityUpdate]);

  // Setup subscriptions/polling
  useEffect(() => {
    if (!enabled) return;

    isCleanedUpRef.current = false;

    // Start with polling as the primary method (more reliable)
    setupPollingFallback();

    // Try real-time as an enhancement after a delay to avoid conflicts
    const realTimeTimeout = setTimeout(() => {
      if (!isCleanedUpRef.current) {
        setupRealTimeSubscription();
      }
    }, 2000);

    // Cleanup function
    return () => {
      isCleanedUpRef.current = true;

      clearTimeout(realTimeTimeout);

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }

      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [setupRealTimeSubscription, setupPollingFallback, enabled]);

  // Manual cleanup function
  const cleanup = useCallback(() => {
    isCleanedUpRef.current = true;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
  }, []);

  return { cleanup };
};

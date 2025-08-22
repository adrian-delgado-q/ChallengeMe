import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '../supabase/client';

interface UseActivityUpdatesProps {
    challengeId?: string;
    onActivityUpdate: () => void;
    enabled?: boolean;
}

/**
 * Custom hook to handle real-time activity updates with fallback to polling
 */
export const useActivityUpdates = ({ 
    challengeId, 
    onActivityUpdate, 
    enabled = true 
}: UseActivityUpdatesProps) => {
    const subscriptionRef = useRef<any>(null);
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastActivityCountRef = useRef<number>(0);

    // Real-time subscription setup
    const setupRealTimeSubscription = useCallback(() => {
        if (!enabled) return;

        // Clean up existing subscription
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
            subscriptionRef.current = null;
        }

        const channelName = challengeId ? `activities-${challengeId}` : 'activities-all';
        
        try {
            console.log('Setting up real-time subscription for:', channelName);
            
            subscriptionRef.current = supabase
                .channel(channelName, {
                    config: {
                        presence: {
                            key: 'user_' + Math.random().toString(36).substr(2, 9)
                        }
                    }
                })
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'Activity',
                        ...(challengeId && { filter: `challengeId=eq.${challengeId}` })
                    },
                    (payload) => {
                        console.log('Real-time activity update detected:', payload);
                        onActivityUpdate();
                    }
                )
                .subscribe((status, err) => {
                    console.log('Activity subscription status:', status);
                    
                    if (err) {
                        console.error('Subscription error:', err);
                    }
                    
                    // Only fall back to polling if subscription definitely failed
                    if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                        console.warn('Real-time subscription failed, falling back to polling');
                        setupPollingFallback();
                    } else if (status === 'CLOSED') {
                        // Connection was closed, attempt to reconnect after a delay
                        console.log('Connection closed, will attempt to reconnect...');
                        setTimeout(() => {
                            if (enabled) {
                                setupRealTimeSubscription();
                            }
                        }, 2000);
                    }
                });
        } catch (error) {
            console.warn('Failed to setup real-time subscription, falling back to polling:', error);
            setupPollingFallback();
        }
    }, [challengeId, enabled, onActivityUpdate]);

    // Polling fallback setup
    const setupPollingFallback = useCallback(async () => {
        if (!enabled) return;

        // Clear existing polling
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
        }

        // Check activity count every 5 seconds (only when tab is visible)
        pollingIntervalRef.current = setInterval(async () => {
            // Only poll when the browser tab is active
            if (document.hidden) return;
            
            try {
                const query = supabase
                    .from('Activity')
                    .select('*', { count: 'exact', head: true });

                if (challengeId) {
                    query.eq('challengeId', challengeId);
                }

                const { count } = await query;
                
                if (count !== null && count !== lastActivityCountRef.current) {
                    lastActivityCountRef.current = count;
                    console.log('Polling detected activity change, triggering update');
                    onActivityUpdate();
                }
            } catch (error) {
                console.error('Polling error:', error);
            }
        }, 5000); // Poll every 5 seconds

        // Get initial count
        try {
            const query = supabase
                .from('Activity')
                .select('*', { count: 'exact', head: true });

            if (challengeId) {
                query.eq('challengeId', challengeId);
            }

            const { count } = await query;
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

        // Start with polling as the primary method (more reliable)
        setupPollingFallback();
        
        // Try real-time as an enhancement, but don't rely on it
        const realTimeTimeout = setTimeout(() => {
            setupRealTimeSubscription();
        }, 1000); // Delay real-time setup to avoid conflicts

        // Cleanup function
        return () => {
            clearTimeout(realTimeTimeout);
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, [setupRealTimeSubscription, setupPollingFallback, enabled]);

    // Manual cleanup function
    const cleanup = useCallback(() => {
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
        }
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
        }
    }, []);

    return { cleanup };
};

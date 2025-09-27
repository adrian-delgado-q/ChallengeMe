import React, { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Center, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Card } from '../common/Card';
import { ChallengeService } from '../../graphql/services/challengeService';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface ProgressChartProps {
    challengeId?: string;
}

interface ProgressDataPoint {
    date: string;
    totalValue: number;
    activityType: string;
    activityTypeName: string;
    unit: string;
    milestoneLevel: number;
}

interface MilestoneData {
    name: string;
    targetValue: number;
    activityTypeId: string;
    order: number;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ challengeId }) => {
    const [progressData, setProgressData] = useState<ProgressDataPoint[]>([]);
    const [milestones, setMilestones] = useState<MilestoneData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProgressData = async () => {
            if (!challengeId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const result = await ChallengeService.getChallengeProgressOverTime(challengeId);
                setProgressData(result.progressData);
                setMilestones(result.milestones);
            } catch (err: any) {
                console.error('Error fetching progress data:', err);
                setError(err.message || 'Failed to load progress data');
            } finally {
                setLoading(false);
            }
        };

        fetchProgressData();
    }, [challengeId]);

    // Group progress data by activity type
    const getChartData = () => {
        if (progressData.length === 0) {
            return {
                labels: [],
                datasets: []
            };
        }

        // Group data by activity type
        const activityTypeGroups: Record<string, ProgressDataPoint[]> = {};
        progressData.forEach(point => {
            if (!activityTypeGroups[point.activityType]) {
                activityTypeGroups[point.activityType] = [];
            }
            activityTypeGroups[point.activityType].push(point);
        });

        // Get all unique dates for labels, sorted chronologically
        const allDates = [...new Set(progressData.map(p => p.date))].sort();

        // Color palette for different activity types
        const colors = [
            '#f97316', // orange-500
            '#3b82f6', // blue-500
            '#10b981', // emerald-500
            '#8b5cf6', // violet-500
            '#f59e0b', // amber-500
            '#ef4444', // red-500
            '#06b6d4', // cyan-500
            '#84cc16', // lime-500
        ];

        const datasets = Object.entries(activityTypeGroups).map(([activityTypeId, points], index) => {
            // Sort points by date for this activity type
            const sortedPoints = points.sort((a, b) => a.date.localeCompare(b.date));

            // Create a map of dates to data for this activity type
            const dataByDate: Record<string, { value: number; milestoneLevel: number }> = {};
            sortedPoints.forEach(point => {
                dataByDate[point.date] = {
                    value: point.totalValue,
                    milestoneLevel: point.milestoneLevel
                };
            });

            // Fill in data for all dates (cumulative progress)
            let lastValue = 0;
            let lastMilestoneLevel = 0;
            const data: number[] = [];
            const pointData: Array<{ milestoneLevel: number }> = [];

            allDates.forEach(date => {
                if (dataByDate[date]) {
                    lastValue = dataByDate[date].value;
                    lastMilestoneLevel = dataByDate[date].milestoneLevel;
                }
                data.push(lastValue);
                pointData.push({ milestoneLevel: lastMilestoneLevel });
            });

            const activityTypeName = points[0]?.activityTypeName || 'Unknown';
            const unit = points[0]?.unit || '';
            const color = colors[index % colors.length];

            // Milestone colors for point borders
            const milestoneColors = ['#6b7280', '#10b981', '#f59e0b', '#f97316', '#ef4444', '#8b5cf6'];

            return {
                label: `${activityTypeName} (${unit})`,
                data,
                borderColor: color,
                backgroundColor: color.replace(')', ', 0.1)').replace('rgb', 'rgba'),
                fill: false,
                tension: 0.4,
                pointRadius: pointData.map(point => {
                    // Make points larger based on milestone level (minimum 4, max 8)
                    return Math.min(Math.max(4, point.milestoneLevel + 3), 8);
                }),
                pointBorderWidth: pointData.map(point => {
                    // Add thicker border for milestone achievements
                    return point.milestoneLevel > 0 ? 3 : 1;
                }),
                pointBorderColor: pointData.map(point => {
                    // Change border color based on milestone level
                    return milestoneColors[Math.min(point.milestoneLevel, milestoneColors.length - 1)];
                }),
                pointBackgroundColor: pointData.map(point => {
                    // Highlight milestone points with different background
                    return point.milestoneLevel > 0 ? '#ffffff' : color;
                }),
                // Store activity type ID for tooltip reference
                activityTypeId
            };
        });

        return {
            labels: allDates.map(date => new Date(date).toLocaleDateString()),
            datasets
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Progress Value'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    afterLabel: function (context: any) {
                        const dataIndex = context.dataIndex;
                        const dataset = context.dataset;
                        const activityTypeId = dataset.activityTypeId;

                        if (!activityTypeId) return '';

                        // Find the corresponding progress data point
                        const date = Object.keys(progressData.reduce((acc, point) => {
                            acc[point.date] = true;
                            return acc;
                        }, {} as Record<string, boolean>)).sort()[dataIndex];

                        const relevantPoint = progressData.find(p =>
                            p.activityType === activityTypeId && p.date === date
                        );

                        if (relevantPoint && relevantPoint.milestoneLevel > 0) {
                            const milestone = milestones.find(m =>
                                m.activityTypeId === activityTypeId &&
                                m.order === relevantPoint.milestoneLevel
                            );
                            return milestone ? `🏆 Milestone: ${milestone.name}` : `🏆 Milestone Level ${relevantPoint.milestoneLevel}`;
                        }
                        return '';
                    }
                }
            }
        },
    };

    if (loading) {
        return (
            <Card p={6}>
                <Heading as="h3" size="lg" mb={4}>Progress Over Time</Heading>
                <Center h="250px">
                    <Spinner size="lg" color="orange.500" />
                </Center>
            </Card>
        );
    }

    if (error) {
        return (
            <Card p={6}>
                <Heading as="h3" size="lg" mb={4}>Progress Over Time</Heading>
                <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>
            </Card>
        );
    }

    if (!challengeId) {
        return (
            <Card p={6}>
                <Heading as="h3" size="lg" mb={4}>Progress Over Time</Heading>
                <Center h="250px">
                    <Text color="gray.500">Select a challenge to view progress</Text>
                </Center>
            </Card>
        );
    }

    if (progressData.length === 0) {
        return (
            <Card p={6}>
                <Heading as="h3" size="lg" mb={4}>Progress Over Time</Heading>
                <Center h="250px">
                    <Text color="gray.500">No progress data available yet. Start logging activities to see your progress!</Text>
                </Center>
            </Card>
        );
    }

    const chartData = getChartData();

    return (
        <Card p={6}>
            <Heading as="h3" size="lg" mb={4}>Progress Over Time</Heading>
            <Box h={{ base: '250px', md: '320px' }}>
                <Line data={chartData} options={chartOptions} />
            </Box>
        </Card>
    );
};

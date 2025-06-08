import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
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

const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [{
        label: 'Your Progress (km)',
        data: [15, 25, 40, 55, 71],
        borderColor: '#f97316', // orange-500
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.4,
    },
    {
        label: 'Average Progress (km)',
        data: [12, 22, 35, 50, 65],
        borderColor: '#78716c', // stone-500
        backgroundColor: 'rgba(120, 113, 108, 0.1)',
        fill: true,
        tension: 0.4,
    }]
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: { beginAtZero: true }
    },
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

export const ProgressChart: React.FC = () => (
    <Card p={6}>
        <Heading as="h3" size="lg" mb={4}>Progress Over Time</Heading>
        <Box h={{ base: '250px', md: '320px' }}>
            <Line data={data} options={options} />
        </Box>
    </Card>
);

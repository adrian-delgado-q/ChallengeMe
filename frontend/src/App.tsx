import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AppLayout } from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import ChallengeDashboardPage from './pages/ChallengeDashboardPage';
import CreateChallengePage from './pages/CreateChallengePage';
import EditChallengePage from './pages/EditChallengePage';
import ProfilePage from './pages/ProfilePage';
import GroupsPage from './pages/TeamsPage';
import theme from './theme'; // Import the custom theme

export default function App() {
    const [currentPage, setCurrentPage] = useState<string>('home');

    const handleNavigate = (page: string) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} />;
            case 'dashboard':
                return <ChallengeDashboardPage />;
            case 'create':
                return <CreateChallengePage />;
            case 'profile':
                 return <ProfilePage onNavigate={handleNavigate} />;
            case 'edit':
                return <EditChallengePage />;
            case 'groups':
                return <GroupsPage onNavigate={handleNavigate} />;
            default:
                return <HomePage onNavigate={handleNavigate} />;
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <AppLayout onNavigate={handleNavigate}>
                {renderPage()}
            </AppLayout>
        </ChakraProvider>
    );
}

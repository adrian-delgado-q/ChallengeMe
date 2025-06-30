import React, { useState } from 'react';
import { useUser } from './contexts/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import TeamsPage from './pages/TeamsPage';
import ProfilePage from './pages/ProfilePage';
import CreateChallengePage from './pages/CreateChallengePage';
import EditChallengePage from './pages/EditChallengePage';
import ChallengeDashboardPage from './pages/ChallengeDashboardPage';
import { GenericError } from './components/common/GenericError';

const App: React.FC = () => {
    const { session } = useUser();
    const [currentPage, setCurrentPage] = useState('home');

    const handleNavigate = (page: string) => {
        // Allow navigation to the login page even if not authenticated
        if (page === 'login') {
            setCurrentPage('login');
            return;
        }
        
        // If the user tries to navigate somewhere else without a session,
        // force them to the login page.
        if (!session) {
            setCurrentPage('login');
            return;
        }
        
        setCurrentPage(page);
    };

    if (!session) {
        // If there's no session, always show the AuthPage
        return <AuthPage />;
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} />;
            case 'dashboard':
                return <ChallengeDashboardPage />;
            case 'profile':
                return <ProfilePage onNavigate={handleNavigate} />;
            case 'teams':
                return <TeamsPage onNavigate={handleNavigate} />;
            case 'create':
                return <CreateChallengePage />;
            case 'edit':
                 return <EditChallengePage />;
            case 'login':
                 // This case should ideally not be hit if a session exists,
                 // but as a fallback, we redirect to home.
                 setCurrentPage('home');
                 return <HomePage onNavigate={handleNavigate} />;
            default:
                return <GenericError message="Page Not Found" />;
        }
    };

    return (
        <AppLayout onNavigate={handleNavigate}>
            {renderPage()}
        </AppLayout>
    );
};

export default App;
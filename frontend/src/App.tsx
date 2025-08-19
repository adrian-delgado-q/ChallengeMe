import React, { useState } from 'react';
import { useUser } from './contexts/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import AuthPage from './pages/AuthPage';
import ChallengesPage from './pages/ChallengesPage';
import TeamsPage from './pages/TeamsPage';
import ProfilePage from './pages/ProfilePage';
import CreateChallengePage from './pages/CreateChallengePage';
import EditChallengePage from './pages/EditChallengePage';
import ChallengeDashboardPage from './pages/ChallengeDashboardPage';
import { GenericError } from './components/common/GenericError';
import { DebugPanel } from './components/common/DebugPanel';
import { isSupabaseConfigured } from './supabase/client';

const App: React.FC = () => {
    const { session } = useUser();
    const [currentPage, setCurrentPage] = useState('home');

    // Show configuration warning if Supabase is not configured
    if (!isSupabaseConfigured) {
        return (
            <div style={{
                padding: '20px',
                textAlign: 'center',
                backgroundColor: '#fff3cd',
                borderLeft: '4px solid #ffc107',
                margin: '20px'
            }}>
                <h2>⚠️ Configuration Required</h2>
                <p>Supabase environment variables are not configured.</p>
                <p>Please check <strong>QUICK_AUTH_SETUP.md</strong> for setup instructions.</p>
                <DebugPanel />
            </div>
        );
    }

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
                return <ChallengesPage onNavigate={handleNavigate} />;
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
                return <ChallengesPage onNavigate={handleNavigate} />;
            default:
                return <GenericError message="Page Not Found" />;
        }
    };

    return (
        <AppLayout onNavigate={handleNavigate}>
            {renderPage()}
            <DebugPanel />
        </AppLayout>
    );
};

export default App;
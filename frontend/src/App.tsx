import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useUser } from './contexts/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import AuthPage from './pages/AuthPage';
import ChallengesPage from './pages/ChallengesPage';
import TeamsPage from './pages/TeamsPage';
import TeamDashboardPage from './pages/TeamDashboardPage';
import ProfilePage from './pages/ProfilePage';
import CreateChallengePage from './pages/CreateChallengePage';
import CreateTeamPage from './pages/CreateTeamPage';
import EditChallengePage from './pages/EditChallengePage';
import EditTeamPage from './pages/EditTeamPage';
import ChallengeDashboardPage from './pages/ChallengeDashboardPage';
import ManageChallengePage from './pages/ManageChallengePage';
import MyChallengesPage from './pages/MyChallengesPage';
import { ActivityManagementPage } from './pages/ActivityManagementPage';
import { DebugPanel } from './components/common/DebugPanel';
import { isSupabaseConfigured } from './supabase/client';

// Protected route wrapper that requires authentication
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { session, isLoading } = useUser();
    const location = useLocation();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px',
                color: '#666'
            }}>
                Loading...
            </div>
        );
    }

    return session ? <>{children}</> : <Navigate to="/auth" state={{ from: location }} replace />;
};

// Layout wrapper for authenticated pages
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AppLayout>
            {children}
            <DebugPanel />
        </AppLayout>
    );
};

const App: React.FC = () => {
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

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/auth" element={<AuthPage />} />

                {/* Protected routes - each wrapped individually */}
                <Route path="/" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <ChallengesPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/challenges" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <ChallengesPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/challenges/:id" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <ChallengeDashboardPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/challenges/:id/manage" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <ManageChallengePage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/challenges/:id/edit" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <EditChallengePage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/my-challenges" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <MyChallengesPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/teams" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <TeamsPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/teams/:id" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <TeamDashboardPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <ProfilePage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/activities" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <ActivityManagementPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/create" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <CreateChallengePage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/create-team" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <CreateTeamPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/edit/:id" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <EditChallengePage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/teams/:id/edit" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <EditTeamPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                {/* Catch all route - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
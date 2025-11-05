import React, { useState } from 'react';
import { UserRole } from './types';
import { Header } from './components/Header';
import { JobFeedView, ProfileView, ApplicationTrackerView } from './components/CandidateViews';
import { RecruiterDashboardView } from './components/RecruiterViews';
import { BottomNavBar } from './components/BottomNavBar';

type CandidateView = 'feed' | 'profile' | 'applications';

function App() {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CANDIDATE);
  const [candidateView, setCandidateView] = useState<CandidateView>('feed');

  const renderCandidateView = () => {
    switch (candidateView) {
      case 'profile':
        return <ProfileView />;
      case 'applications':
        return <ApplicationTrackerView />;
      case 'feed':
      default:
        return <JobFeedView />;
    }
  }

  const isFeedView = userRole === UserRole.CANDIDATE && candidateView === 'feed';

  return (
    <div className={`bg-gray-900 text-white ${isFeedView ? 'h-screen flex flex-col' : 'min-h-screen'}`}>
      <Header userRole={userRole} setUserRole={setUserRole} onNavigate={setCandidateView} currentView={candidateView} />
      <main className={`pt-16 ${isFeedView ? 'flex-grow overflow-hidden' : 'pb-20 md:pb-0'}`}>
        {userRole === UserRole.CANDIDATE ? renderCandidateView() : <RecruiterDashboardView />}
      </main>
      {userRole === UserRole.CANDIDATE && <BottomNavBar currentView={candidateView} onNavigate={setCandidateView} />}
    </div>
  );
}

export default App;

import React from 'react';
import { UserRole } from '../types';
import { SparklesIcon } from './Icons';
import { t } from '../i18n';

interface HeaderProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onNavigate: (view: 'feed' | 'profile' | 'applications') => void;
  currentView?: string;
}

export const Header: React.FC<HeaderProps> = ({ userRole, setUserRole, onNavigate, currentView }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-md z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="h-8 w-8 text-cyan-400"/>
            <h1 className="text-2xl font-bold text-white">kiki-web</h1>
          </div>

          {userRole === UserRole.CANDIDATE && (
             <nav className="hidden md:flex items-center space-x-4">
                <button onClick={() => onNavigate('feed')} className={`px-3 py-2 rounded-md text-sm font-medium ${currentView === 'feed' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>{t('header.jobFeed')}</button>
                <button onClick={() => onNavigate('profile')} className={`px-3 py-2 rounded-md text-sm font-medium ${currentView === 'profile' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>{t('header.profile')}</button>
                <button onClick={() => onNavigate('applications')} className={`px-3 py-2 rounded-md text-sm font-medium ${currentView === 'applications' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>{t('header.myApplications')}</button>
             </nav>
          )}

          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-4">{t('header.viewingAs')}</span>
            <div className="relative bg-gray-800 p-1 rounded-lg flex items-center">
              <button
                onClick={() => setUserRole(UserRole.CANDIDATE)}
                className={`w-full px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${userRole === UserRole.CANDIDATE ? 'bg-cyan-500 text-white' : 'text-gray-300'}`}
              >
                {t('header.candidate')}
              </button>
              <button
                onClick={() => setUserRole(UserRole.RECRUITER)}
                className={`w-full px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${userRole === UserRole.RECRUITER ? 'bg-purple-500 text-white' : 'text-gray-300'}`}
              >
                {t('header.recruiter')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

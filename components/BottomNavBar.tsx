
import React from 'react';
import { HomeIcon, ClipboardDocumentListIcon, UserIcon } from './Icons';
import { t } from '../i18n';

type CandidateView = 'feed' | 'profile' | 'applications';

interface BottomNavBarProps {
  currentView: CandidateView;
  onNavigate: (view: CandidateView) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
    >
        {icon}
        <span className="text-xs font-medium">{label}</span>
    </button>
);


export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentView, onNavigate }) => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 h-16 flex items-center justify-around z-50">
           <NavItem 
                icon={<HomeIcon className="w-6 h-6 mb-1"/>}
                label={t('header.jobFeed')}
                isActive={currentView === 'feed'}
                onClick={() => onNavigate('feed')}
           />
           <NavItem 
                icon={<ClipboardDocumentListIcon className="w-6 h-6 mb-1"/>}
                label={t('header.myApplications')}
                isActive={currentView === 'applications'}
                onClick={() => onNavigate('applications')}
           />
           <NavItem 
                icon={<UserIcon className="w-6 h-6 mb-1"/>}
                label={t('header.profile')}
                isActive={currentView === 'profile'}
                onClick={() => onNavigate('profile')}
           />
        </nav>
    );
};

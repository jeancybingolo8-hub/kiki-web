import React, { useState, useMemo } from 'react';
import { useMockData } from '../hooks/useMockData';
import { JobCard } from './JobCard';
import { ApplicationStatus, Candidate } from '../types';
import { t } from '../i18n';
import { AdjustmentsHorizontalIcon, XCircleIcon } from './Icons';

const FiltersModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    selectedLocation: string;
    setSelectedLocation: (l: string) => void;
    uniqueLocations: string[];
    selectedType: string;
    setSelectedType: (t: string) => void;
    jobTypes: string[];
    showSavedOnly: boolean;
    setShowSavedOnly: (s: boolean) => void;
    onReset: () => void;
}> = ({ isOpen, onClose, searchQuery, setSearchQuery, selectedLocation, setSelectedLocation, uniqueLocations, selectedType, setSelectedType, jobTypes, showSavedOnly, setShowSavedOnly, onReset }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{t('filters.title')}</h2>
                <button onClick={onClose}><XCircleIcon className="w-8 h-8 text-gray-400" /></button>
            </div>
            <div className="space-y-6 flex-grow">
                <input
                    type="text"
                    placeholder={t('filters.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc === 'all' ? t('filters.allLocations') : loc}</option>)}
                </select>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    {jobTypes.map(type => <option key={type} value={type}>{type === 'all' ? t('filters.allTypes') : t(`jobType.${type}`)}</option>)}
                </select>
                 <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                    <label htmlFor="show-saved" className="text-white font-medium">{t('filters.showSaved')}</label>
                    <button onClick={() => setShowSavedOnly(!showSavedOnly)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${showSavedOnly ? 'bg-cyan-500' : 'bg-gray-600'}`}>
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${showSavedOnly ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>
            <div className="mt-auto flex gap-4">
                 <button onClick={onReset} className="flex-1 text-center bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                    {t('filters.reset')}
                </button>
                <button onClick={onClose} className="flex-1 text-center bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 transition-colors">
                    {t('filters.done')}
                </button>
            </div>
        </div>
    );
}

export const JobFeedView: React.FC = () => {
  const { jobs, applyForJob, applications, currentUser, savedJobs, toggleSaveJob } = useMockData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);


  const uniqueLocations = useMemo(() => ['all', ...Array.from(new Set(jobs.map(j => j.location)))], [jobs]);
  const jobTypes = ['all', 'Full-time', 'Part-time', 'Contract'];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (showSavedOnly && !savedJobs.includes(job.id)) {
          return false;
      }
      const searchLower = searchQuery.toLowerCase();
      const matchesQuery = searchLower === '' ||
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.qualifications.join(' ').toLowerCase().includes(searchLower);

      const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
      const matchesType = selectedType === 'all' || job.type === selectedType;

      return matchesQuery && matchesLocation && matchesType;
    });
  }, [jobs, searchQuery, selectedLocation, selectedType, showSavedOnly, savedJobs]);
  
  const handleReset = () => {
      setSearchQuery('');
      setSelectedLocation('all');
      setSelectedType('all');
      setShowSavedOnly(false);
  }

  return (
    <div className="h-full flex flex-col">
       {/* Desktop Filters */}
       <div className="hidden md:block sticky top-16 bg-gray-900 bg-opacity-90 backdrop-blur-md z-40 p-4 border-b border-gray-700">
           <div className="container mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="md:col-span-2">
                         <input
                            type="text"
                            placeholder={t('filters.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                            {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc === 'all' ? t('filters.allLocations') : loc}</option>)}
                        </select>
                    </div>
                    <div>
                       <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                           {jobTypes.map(type => <option key={type} value={type}>{type === 'all' ? t('filters.allTypes') : t(`jobType.${type}`)}</option>)}
                       </select>
                    </div>
               </div>
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4">
                        <button onClick={handleReset} className="text-sm text-cyan-400 hover:text-cyan-300">{t('filters.reset')}</button>
                    </div>
                     <div className="flex items-center gap-2">
                        <label htmlFor="show-saved-desktop" className="text-sm text-white">{t('filters.showSaved')}</label>
                        <button onClick={() => setShowSavedOnly(!showSavedOnly)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${showSavedOnly ? 'bg-cyan-500' : 'bg-gray-600'}`}>
                            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${showSavedOnly ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
           </div>
       </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden sticky top-16 bg-gray-900 z-40 p-4 border-b border-gray-700">
            <div className="container mx-auto">
                <button onClick={() => setIsFilterModalOpen(true)} className="w-full flex items-center justify-center gap-2 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <AdjustmentsHorizontalIcon className="w-5 h-5" />
                    {t('filters.title')}
                </button>
            </div>
        </div>

       <FiltersModal 
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            uniqueLocations={uniqueLocations}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            jobTypes={jobTypes}
            showSavedOnly={showSavedOnly}
            setShowSavedOnly={setShowSavedOnly}
            onReset={handleReset}
       />

       <div className="flex-grow snap-y snap-mandatory overflow-y-scroll">
            {filteredJobs.length > 0 ? (
                filteredJobs.map(job => {
                    const hasApplied = applications.some(app => app.job.id === job.id && app.candidate.id === currentUser.id);
                    const isSaved = savedJobs.includes(job.id);
                    return <JobCard key={job.id} job={job} onApply={applyForJob} hasApplied={hasApplied} onSave={toggleSaveJob} isSaved={isSaved} />
                })
            ) : (
                <div className="h-full flex justify-center items-center">
                    <p className="text-gray-400 text-lg">{t('filters.noJobsFound')}</p>
                </div>
            )}
       </div>
    </div>
  );
};

export const ProfileView: React.FC = () => {
    const { currentUser } = useMockData();
    const user = currentUser;

    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8 border border-gray-700">
                <div className="flex items-center space-x-6 mb-8">
                    <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-cyan-400" />
                    <div>
                        <h1 className="text-4xl font-bold">{user.name}</h1>
                        <p className="text-xl text-gray-300">{user.headline}</p>
                        <p className="text-md text-gray-400">{user.email}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold border-b-2 border-cyan-500 pb-2 mb-4">{t('profile.skills')}</h2>
                        <div className="flex flex-wrap gap-2">
                            {user.skills.map(skill => <span key={skill} className="bg-gray-700 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>)}
                        </div>
                    </div>
                     <div>
                        <h2 className="text-2xl font-semibold border-b-2 border-cyan-500 pb-2 mb-4">{t('profile.experience')}</h2>
                        <p className="text-gray-300 whitespace-pre-line">{user.experience}</p>
                    </div>
                     <div>
                        <h2 className="text-2xl font-semibold border-b-2 border-cyan-500 pb-2 mb-4">{t('profile.education')}</h2>
                        <p className="text-gray-300">{user.education}</p>
                    </div>
                </div>
                <button className="mt-8 w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 transition-colors">{t('profile.update')}</button>
            </div>
        </div>
    )
}

export const ApplicationTrackerView: React.FC = () => {
    const { applications, currentUser } = useMockData();
    const userApplications = applications.filter(app => app.candidate.id === currentUser.id);


    const getStatusColor = (status: ApplicationStatus) => {
        switch (status) {
            case ApplicationStatus.APPLIED: return 'bg-blue-500';
            case ApplicationStatus.PRE_SELECTED: return 'bg-yellow-500';
            case ApplicationStatus.INTERVIEW: return 'bg-purple-500';
            case ApplicationStatus.HIRED: return 'bg-green-500';
            case ApplicationStatus.REJECTED: return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    }
    
    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <h1 className="text-4xl font-bold mb-8 text-center">{t('applications.title')}</h1>
            <div className="max-w-5xl mx-auto space-y-4">
                {userApplications.map(app => (
                    <div key={app.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center justify-between hover:border-cyan-500 transition-colors">
                        <div className="flex items-center space-x-4">
                            <img src={app.job.company.logo} alt={app.job.company.name} className="w-16 h-16 rounded-lg"/>
                            <div>
                                <h2 className="text-xl font-bold">{app.job.title}</h2>
                                <p className="text-gray-300">{app.job.company.name}</p>
                                <p className="text-sm text-gray-400">{t('applications.applied')} {app.appliedDate}</p>
                            </div>
                        </div>
                        <div className={`text-white text-sm font-semibold px-4 py-2 rounded-full ${getStatusColor(app.status)}`}>
                            {t(`status.${app.status}`)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
import React from 'react';
import { Job } from '../types';
import { t } from '../i18n';
import { BookmarkIcon, BookmarkSolidIcon, ShareIcon } from './Icons';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
  hasApplied: boolean;
  onSave: (jobId: string) => void;
  isSaved: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, hasApplied, onSave, isSaved }) => {

  const handleShare = async () => {
    const shareData = {
      title: t('share.title'),
      text: t('share.text', { jobTitle: job.title, companyName: job.company.name }),
      url: window.location.href, // In a real app, this would be a direct link to the job
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for desktop browsers
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert(t('share.copied'));
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center snap-start p-4">
        <div className="relative w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col h-full max-h-[700px] transform transition-transform duration-500">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-shrink-0 flex items-center space-x-4 mb-4">
                    <img className="h-16 w-16 rounded-full object-cover border-2 border-cyan-500" src={job.company.logo} alt={job.company.name} />
                    <div>
                        <h2 className="text-xl font-bold text-white">{job.title}</h2>
                        <p className="text-md text-gray-300">{job.company.name}</p>
                        <p className="text-sm text-gray-400">{job.location} &middot; {job.type}</p>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    
                    <h3 className="font-semibold text-white mb-2">{t('jobCard.qualifications')}</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                        {job.qualifications.map((q, index) => <li key={index}>{q}</li>)}
                    </ul>
                </div>
            </div>
            
            {/* Bottom Actions */}
            <div className="flex-shrink-0 mt-auto pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-lg font-semibold text-cyan-400">{job.salary}</span>
                        <p className="text-sm text-gray-500">{job.postedDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                         <button onClick={() => onSave(job.id)} aria-label={isSaved ? t('jobCard.saved') : t('jobCard.save')} className="text-white hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-gray-700">
                            {isSaved ? <BookmarkSolidIcon className="w-6 h-6 text-cyan-400" /> : <BookmarkIcon className="w-6 h-6" />}
                        </button>
                        <button onClick={handleShare} aria-label={t('jobCard.share')} className="text-white hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-gray-700">
                            <ShareIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <button 
                    onClick={() => onApply(job.id)}
                    disabled={hasApplied}
                    className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {hasApplied ? t('jobCard.applied') : t('jobCard.applyNow')}
                </button>
            </div>
        </div>
    </div>
  );
};
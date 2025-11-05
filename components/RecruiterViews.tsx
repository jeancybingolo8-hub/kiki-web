
import React, { useState, useCallback } from 'react';
import { useMockData } from '../hooks/useMockData';
import { Job, Candidate, AIAnalysisResult } from '../types';
import { findBestCandidates } from '../services/geminiService';
import { SparklesIcon, CheckCircleIcon, XCircleIcon, PlusCircleIcon, ArrowPathIcon, EnvelopeIcon, WhatsAppIcon } from './Icons';
import { t } from '../i18n';

const CandidateProfileModal: React.FC<{ candidate: Candidate | null; onClose: () => void }> = ({ candidate, onClose }) => {
    if (!candidate) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-700 flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                        <img src={candidate.avatar} alt={candidate.name} className="w-20 h-20 rounded-full border-4 border-purple-400" />
                        <div>
                            <h2 className="text-3xl font-bold text-white">{candidate.name}</h2>
                            <p className="text-lg text-gray-300">{candidate.headline}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <XCircleIcon className="w-8 h-8"/>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-grow">
                     <div className="space-y-6 text-white">
                        <div>
                            <h3 className="text-xl font-semibold border-b-2 border-purple-500 pb-2 mb-3">{t('profile.skills')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.skills.map(skill => <span key={skill} className="bg-gray-700 text-purple-300 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>)}
                            </div>
                        </div>
                         <div>
                            <h3 className="text-xl font-semibold border-b-2 border-purple-500 pb-2 mb-3">{t('profile.experience')}</h3>
                            <p className="text-gray-300 whitespace-pre-line">{candidate.experience}</p>
                        </div>
                         <div>
                            <h3 className="text-xl font-semibold border-b-2 border-purple-500 pb-2 mb-3">{t('profile.education')}</h3>
                            <p className="text-gray-300">{candidate.education}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-700 bg-gray-800 rounded-b-xl flex flex-col sm:flex-row gap-3">
                     <a href={`mailto:${candidate.email}`} className="flex-1 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        <EnvelopeIcon className="w-5 h-5"/>
                        {t('candidateProfile.contactEmail')}
                    </a>
                    {candidate.phone && (
                        <a href={`https://wa.me/${candidate.phone}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                            <WhatsAppIcon className="w-5 h-5"/>
                            {t('candidateProfile.contactWhatsApp')}
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}


interface CandidateCardProps {
    candidate: Candidate;
    analysis?: AIAnalysisResult['bestMatches'][0];
    onViewProfile: (candidate: Candidate) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, analysis, onViewProfile }) => (
    <div className={`bg-gray-800 p-4 rounded-lg border ${analysis ? 'border-purple-500' : 'border-gray-700'} relative transition-all duration-300 hover:border-purple-400 hover:shadow-lg cursor-pointer`} onClick={() => onViewProfile(candidate)}>
        {analysis && (
             <div className="absolute -top-3 -right-3 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                <SparklesIcon className="w-4 h-4 mr-1"/>
                {t('recruiter.topMatch')} {analysis.rank}
            </div>
        )}
        <div className="flex items-center space-x-4">
            <img src={candidate.avatar} alt={candidate.name} className="w-16 h-16 rounded-full" />
            <div>
                <h3 className="text-lg font-bold text-white">{candidate.name}</h3>
                <p className="text-sm text-gray-300">{candidate.headline}</p>
            </div>
        </div>
        {analysis && (
            <div className="mt-3 bg-gray-900 p-3 rounded-md">
                <p className="text-sm text-purple-300 italic">"{analysis.justification}"</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${analysis.score}%` }}></div>
                </div>
            </div>
        )}
        <div className="mt-4 flex space-x-2">
            <button onClick={(e) => {e.stopPropagation();}} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center transition-colors">
                <CheckCircleIcon className="w-5 h-5 mr-1"/> {t('recruiter.shortlist')}
            </button>
            <button onClick={(e) => {e.stopPropagation();}} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center transition-colors">
                <XCircleIcon className="w-5 h-5 mr-1"/> {t('recruiter.reject')}
            </button>
        </div>
    </div>
);

const ApplicantsView: React.FC<{ job: Job }> = ({ job }) => {
    const { getApplicantsForJob } = useMockData();
    const [applicants, setApplicants] = useState(() => getApplicantsForJob(job.id));
    const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [topN, setTopN] = useState(3);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    React.useEffect(() => {
        setApplicants(getApplicantsForJob(job.id));
        setAnalysisResult(null);
    }, [job, getApplicantsForJob]);

    const handleAnalyze = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await findBestCandidates(job, applicants, topN);
            if (result) {
                setAnalysisResult(result);
            } else {
                setError(t('recruiter.analysisError'));
            }
        } catch (e: any) {
            setError(e.message || t('recruiter.unexpectedError'));
        } finally {
            setIsLoading(false);
        }
    }, [job, applicants, topN]);

    const sortedApplicants = React.useMemo(() => {
        if (!analysisResult) return applicants;
        const rankedIds = analysisResult.bestMatches.map(m => m.candidateId);
        return [...applicants].sort((a, b) => {
            const aRank = rankedIds.indexOf(a.id);
            const bRank = rankedIds.indexOf(b.id);
            if (aRank === -1 && bRank === -1) return 0;
            if (aRank === -1) return 1;
            if (bRank === -1) return -1;
            return aRank - bRank;
        });
    }, [applicants, analysisResult]);

    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">{t('recruiter.applicantsFor', { title: job.title })}</h2>
                    <p className="text-gray-400">{t('recruiter.totalCandidates', { count: applicants.length })}</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-900 p-3 rounded-lg border border-gray-700">
                     <div>
                        <label htmlFor="topN" className="text-sm font-medium text-gray-300 mr-2">{t('recruiter.topProfilesLabel')}</label>
                        <input
                            id="topN"
                            type="number"
                            value={topN}
                            onChange={(e) => setTopN(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            className="w-20 bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            min="1"
                            max={applicants.length}
                        />
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading || applicants.length === 0}
                        className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <ArrowPathIcon className="w-5 h-5 animate-spin mr-2"/> : <SparklesIcon className="w-5 h-5 mr-2"/>}
                        {isLoading ? t('recruiter.analyzing') : t('recruiter.findBestMatches')}
                    </button>
                </div>
            </div>

            {error && <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedApplicants.map(candidate => (
                    <CandidateCard 
                        key={candidate.id} 
                        candidate={candidate}
                        analysis={analysisResult?.bestMatches.find(m => m.candidateId === candidate.id)}
                        onViewProfile={setSelectedCandidate}
                    />
                ))}
            </div>
             <CandidateProfileModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
        </div>
    );
};

export const RecruiterDashboardView: React.FC = () => {
    const { recruiterJobs } = useMockData();
    const [selectedJob, setSelectedJob] = useState<Job | null>(recruiterJobs[0] || null);
    
    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="md:w-1/3 lg:w-1/4">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{t('recruiter.yourPostings')}</h2>
                            <button className="text-purple-400 hover:text-purple-300">
                                <PlusCircleIcon className="w-7 h-7" />
                            </button>
                        </div>
                        <ul className="space-y-2">
                            {recruiterJobs.map(job => (
                                <li key={job.id}>
                                    <button onClick={() => setSelectedJob(job)} className={`w-full text-left p-3 rounded-lg transition-colors ${selectedJob?.id === job.id ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                        <h3 className="font-semibold">{job.title}</h3>
                                        <p className="text-sm text-gray-300">{job.location}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
                <main className="flex-1">
                    {selectedJob ? (
                        <ApplicantsView job={selectedJob} />
                    ) : (
                        <div className="flex justify-center items-center h-full bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <p className="text-gray-400">{t('recruiter.selectJob')}</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
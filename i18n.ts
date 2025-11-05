
const translations = {
  fr: {
    // Header
    'header.viewingAs': 'Voir en tant que :',
    'header.candidate': 'Candidat',
    'header.recruiter': 'Recruteur',
    'header.jobFeed': 'Offres',
    'header.profile': 'Profil',
    'header.myApplications': 'Candidatures',

    // Job Card
    'jobCard.save': 'Sauver',
    'jobCard.saved': 'Sauvé',
    'jobCard.share': 'Partager',
    'jobCard.applyNow': 'Postuler',
    'jobCard.applied': 'Postulé',
    'jobCard.qualifications': 'Qualifications Clés :',

    // Share
    'share.title': 'Découvrez cette offre d\'emploi !',
    'share.text': 'Je pense que cette offre de {{jobTitle}} chez {{companyName}} pourrait vous intéresser.',
    'share.copied': 'Détails de l\'offre copiés dans le presse-papiers !',

    // Profile View
    'profile.skills': 'Compétences',
    'profile.experience': 'Expérience',
    'profile.education': 'Formation',
    'profile.update': 'Mettre à jour le profil',

    // Application Tracker View
    'applications.title': 'Mes Candidatures',
    'applications.applied': 'Postulé le :',

    // Application Status
    'status.Applied': 'Postulé',
    'status.Pre-selected': 'Présélectionné',
    'status.Interview': 'Entretien',
    'status.Rejected': 'Rejeté',
    'status.Hired': 'Embauché',
    
    // Recruiter Views
    'recruiter.topMatch': 'Meilleur profil #',
    'recruiter.shortlist': 'Présélectionner',
    'recruiter.reject': 'Rejeter',
    'recruiter.applicantsFor': 'Candidats pour {{title}}',
    'recruiter.totalCandidates': '{{count}} candidats au total',
    'recruiter.findBestMatches': 'Pré-sélectionner (IA)',
    'recruiter.topProfilesLabel': 'Classer les meilleurs :',
    'recruiter.analyzing': 'Analyse en cours...',
    'recruiter.analysisError': "Échec de l'analyse par l'IA.",
    'recruiter.unexpectedError': "Une erreur inattendue est survenue.",
    'recruiter.yourPostings': 'Vos offres d\'emploi',
    'recruiter.selectJob': 'Sélectionnez une offre pour voir les candidats.',
    'recruiter.viewProfile': 'Voir le profil',

    // Candidate Profile Modal
    'candidateProfile.contactEmail': 'Contacter par Email',
    'candidateProfile.contactWhatsApp': 'Contacter par WhatsApp',

    // Filters
    'filters.title': 'Filtres',
    'filters.searchPlaceholder': 'Rechercher par titre, compétence...',
    'filters.allLocations': 'Tous les lieux',
    'filters.allTypes': 'Tous les types',
    'filters.reset': 'Réinitialiser',
    'filters.noJobsFound': 'Aucune offre ne correspond à vos critères.',
    'filters.showSaved': 'Voir les offres sauvegardées',
    'filters.done': 'Terminé',


    // Job Types
    'jobType.Full-time': 'Plein temps',
    'jobType.Part-time': 'Temps partiel',
    'jobType.Contract': 'Contrat',
    
    // Gemini Service Prompt
    'gemini.prompt.base': `
    Description du poste :
    - Titre: {{jobTitle}}
    - Description: {{jobDescription}}
    - Qualifications: {{jobQualifications}}

    Profils des candidats :
    {{candidatesJson}}

    En vous basant sur la description du poste, veuillez analyser les profils des candidats fournis.
    Retournez un objet JSON contenant une liste classée des {{matchCount}} meilleurs profils.
    Pour chaque profil, fournissez une justification brève (une phrase en français) et un score de correspondance de 0 à 100.
    La justification doit mettre en évidence les qualifications les plus pertinentes.
  `
  },
  en: {
    // Header
    'header.viewingAs': 'Viewing as:',
    'header.candidate': 'Candidate',
    'header.recruiter': 'Recruiter',
    'header.jobFeed': 'Feed',
    'header.profile': 'Profile',
    'header.myApplications': 'Applications',
    
    // Job Card
    'jobCard.save': 'Save',
    'jobCard.saved': 'Saved',
    'jobCard.share': 'Share',
    'jobCard.applyNow': 'Apply Now',
    'jobCard.applied': 'Applied',
    'jobCard.qualifications': 'Key Qualifications:',
    
    // Share
    'share.title': 'Check out this job opportunity!',
    'share.text': 'Thought you might be interested in this {{jobTitle}} position at {{companyName}}.',
    'share.copied': 'Job details copied to clipboard!',

    // Profile View
    'profile.skills': 'Skills',
    'profile.experience': 'Experience',
    'profile.education': 'Education',
    'profile.update': 'Update Profile',

    // Application Tracker View
    'applications.title': 'My Applications',
    'applications.applied': 'Applied:',

    // Application Status
    'status.Applied': 'Applied',
    'status.Pre-selected': 'Pre-selected',
    'status.Interview': 'Interview',
    'status.Rejected': 'Rejected',
    'status.Hired': 'Hired',
    
    // Recruiter Views
    'recruiter.topMatch': 'Top Match #',
    'recruiter.shortlist': 'Shortlist',
    'recruiter.reject': 'Reject',
    'recruiter.applicantsFor': 'Applicants for {{title}}',
    'recruiter.totalCandidates': '{{count}} total candidates',
    'recruiter.findBestMatches': 'Pre-select with AI',
    'recruiter.topProfilesLabel': 'Rank top profiles:',
    'recruiter.analyzing': 'Analyzing...',
    'recruiter.analysisError': "Failed to get analysis from AI.",
    'recruiter.unexpectedError': "An unexpected error occurred.",
    'recruiter.yourPostings': 'Your Job Postings',
    'recruiter.selectJob': 'Select a job posting to view applicants.',
    'recruiter.viewProfile': 'View Profile',
    
    // Candidate Profile Modal
    'candidateProfile.contactEmail': 'Contact via Email',
    'candidateProfile.contactWhatsApp': 'Contact via WhatsApp',

    // Filters
    'filters.title': 'Filters',
    'filters.searchPlaceholder': 'Search by title, skill...',
    'filters.allLocations': 'All Locations',
    'filters.allTypes': 'All Types',
    'filters.reset': 'Reset',
    'filters.noJobsFound': 'No jobs match your criteria.',
    'filters.showSaved': 'Show saved jobs',
    'filters.done': 'Done',

    // Job Types
    'jobType.Full-time': 'Full-time',
    'jobType.Part-time': 'Part-time',
    'jobType.Contract': 'Contract',

    // Gemini Service Prompt
    'gemini.prompt.base': `
    Job Description:
    - Title: {{jobTitle}}
    - Description: {{jobDescription}}
    - Qualifications: {{jobQualifications}}

    Candidate Profiles:
    {{candidatesJson}}

    Based on the job description, please analyze the provided candidate profiles. 
    Return a JSON object containing a ranked list of the top {{matchCount}} best matches. 
    For each match, provide a brief justification (one sentence) and a matching score from 0 to 100.
    The justification should highlight the most relevant qualifications.
  `
  }
};

type Language = keyof typeof translations;
const supportedLanguages: Language[] = ['fr', 'en'];
let currentLanguage: Language = 'fr';

const browserLang = navigator.language.split('-')[0];
if (supportedLanguages.includes(browserLang as Language)) {
    currentLanguage = browserLang as Language;
}

export const getLang = () => currentLanguage;

export const t = (key: string, replacements?: Record<string, string | number>): string => {
    let translation = translations[currentLanguage]?.[key] || translations.fr[key] || key;
    
    if (replacements) {
        Object.entries(replacements).forEach(([key, value]) => {
            translation = translation.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
        });
    }

    return translation;
}

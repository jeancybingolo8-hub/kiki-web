
import { useState } from 'react';
import { Company, Job, Candidate, Application, ApplicationStatus } from '../types';
import { getLang } from '../i18n';

const lang = getLang();

const companies: Company[] = [
    { id: 'c1', name: 'Innovate Inc.', logo: 'https://picsum.photos/seed/innovate/100', industry: 'Technologie' },
    { id: 'c2', name: 'Quantum Solutions', logo: 'https://picsum.photos/seed/quantum/100', industry: 'Conseil' },
    { id: 'c3', name: 'Creative Minds', logo: 'https://picsum.photos/seed/creative/100', industry: 'Marketing' },
];

const fr_jobs: Job[] = [
    {
        id: 'j1',
        title: 'Ingénieur Frontend Senior',
        company: companies[0],
        location: 'Télétravail',
        salary: '120 000€ - 160 000€',
        type: 'Full-time',
        postedDate: 'Il y a 2 jours',
        description: 'Rejoignez notre équipe pour construire la nouvelle génération d\'applications web avec React et TypeScript.',
        responsibilities: ['Développer de nouvelles fonctionnalités orientées utilisateur', 'Construire du code et des bibliothèques réutilisables', 'Assurer la faisabilité technique des designs UI/UX'],
        qualifications: ['5+ ans d\'expérience avec React', 'Compréhension approfondie de TypeScript', 'Expérience avec Tailwind CSS'],
    },
    {
        id: 'j2',
        title: 'Chef de Produit',
        company: companies[1],
        location: 'Paris, France',
        salary: '130 000€ - 170 000€',
        type: 'Full-time',
        postedDate: 'Il y a 5 jours',
        description: 'Dirigez la vision produit et la feuille de route de notre plateforme d\'analyse phare.',
        responsibilities: ['Définir la stratégie et la feuille de route du produit', 'Recueillir et prioriser les exigences des produits et des clients', 'Travailler en étroite collaboration avec l\'ingénierie, les ventes et le marketing'],
        qualifications: ['Expérience avérée en tant que Chef de Produit', 'Excellentes compétences en communication écrite et verbale', 'Formation technique avec expérience en développement Agile'],
    },
    {
        id: 'j3',
        title: 'Designer UI/UX',
        company: companies[2],
        location: 'Lyon, France',
        salary: '90 000€ - 120 000€',
        type: 'Contract',
        postedDate: 'Il y a 1 semaine',
        description: 'Nous recherchons un designer UI/UX talentueux pour créer des expériences utilisateur incroyables pour notre suite créative.',
        responsibilities: ['Créer des wireframes, storyboards, flux utilisateurs, et plans de site', 'Mener des recherches utilisateurs et évaluer les retours', 'Établir et promouvoir des directives de conception'],
        qualifications: ['Expérience avérée en conception UI/UX', 'Solide portfolio de projets de design', 'Maîtrise de Figma, Sketch ou d\'outils similaires'],
    },
];

const en_jobs: Job[] = [
    {
        id: 'j1',
        title: 'Senior Frontend Engineer',
        company: companies[0],
        location: 'Remote',
        salary: '$120,000 - $160,000',
        type: 'Full-time',
        postedDate: '2 days ago',
        description: 'Join our team to build the next generation of web applications using React and TypeScript.',
        responsibilities: ['Develop new user-facing features', 'Build reusable code and libraries', 'Ensure the technical feasibility of UI/UX designs'],
        qualifications: ['5+ years of experience with React', 'Deep understanding of TypeScript', 'Experience with Tailwind CSS'],
    },
    {
        id: 'j2',
        title: 'Product Manager',
        company: companies[1],
        location: 'New York, NY',
        salary: '$130,000 - $170,000',
        type: 'Full-time',
        postedDate: '5 days ago',
        description: 'Lead the product vision and roadmap for our flagship analytics platform.',
        responsibilities: ['Define product strategy and roadmap', 'Gather and prioritize product and customer requirements', 'Work closely with engineering, sales, and marketing'],
        qualifications: ['Proven experience as a Product Manager', 'Excellent written and verbal communication skills', 'Technical background with experience in Agile development'],
    },
    {
        id: 'j3',
        title: 'UI/UX Designer',
        company: companies[2],
        location: 'San Francisco, CA',
        salary: '$90,000 - $120,000',
        type: 'Contract',
        postedDate: '1 week ago',
        description: 'We are looking for a talented UI/UX designer to create amazing user experiences for our creative suite.',
        responsibilities: ['Create wireframes, storyboards, user flows, process flows and site maps', 'Conduct user research and evaluate user feedback', 'Establish and promote design guidelines'],
        qualifications: ['Proven UI/UX design experience', 'Strong portfolio of design projects', 'Proficiency in Figma, Sketch, or similar tools'],
    },
];

const jobs = lang === 'fr' ? fr_jobs : en_jobs;

const fr_candidates: Candidate[] = [
    {
        id: 'u1',
        name: 'Alice Dubois',
        avatar: 'https://picsum.photos/seed/alice/100',
        headline: 'Développeuse Frontend Senior | React, TypeScript, Node.js',
        email: 'alice.d@example.com',
        phone: '33612345678',
        skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS'],
        experience: '8 ans d\'expérience dans la création d\'applications web évolutives pour des entreprises SaaS. J\'ai dirigé l\'équipe frontend chez TechCorp, augmentant les performances de 30%.',
        education: 'Licence en Informatique, Université Paris-Saclay'
    },
    {
        id: 'u2',
        name: 'Bob Martin',
        avatar: 'https://picsum.photos/seed/bob/100',
        headline: 'Développeur React Intermédiaire',
        email: 'bob.m@example.com',
        phone: '33687654321',
        skills: ['React', 'JavaScript', 'Redux', 'CSS-in-JS'],
        experience: '3 ans d\'expérience en développement frontend, spécialisé dans les plateformes e-commerce. Compétent dans la création d\'interfaces utilisateur réactives et accessibles.',
        education: 'Bootcamp de codage, Le Wagon'
    },
    {
        id: 'u3',
        name: 'Charlie Dupont',
        avatar: 'https://picsum.photos/seed/charlie/100',
        headline: 'Ingénieur Frontend Junior',
        email: 'charlie.d@example.com',
        phone: '33611223344',
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        experience: 'Récemment diplômé en informatique passionné par le développement web. A réalisé plusieurs projets personnels avec React, dont une application de chat en temps réel.',
        education: 'Licence en Informatique, EPITA'
    },
     {
        id: 'u4',
        name: 'Diana Prince',
        avatar: 'https://picsum.photos/seed/diana/100',
        headline: 'Ingénieure Full-Stack avec 6 ans d\'expérience',
        email: 'diana.p@example.com',
        phone: '33655667788',
        skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
        experience: '6 ans en développement full-stack, avec un accent sur la création d\'API robustes et d\'infrastructures cloud évolutives. A développé et maintenu une architecture de microservices pour une startup fintech.',
        education: 'Master en Génie Logiciel, École 42'
    }
];

const en_candidates: Candidate[] = [
    {
        id: 'u1',
        name: 'Alice Johnson',
        avatar: 'https://picsum.photos/seed/alice/100',
        headline: 'Senior Frontend Developer | React, TypeScript, Node.js',
        email: 'alice.j@example.com',
        phone: '14155552671',
        skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS'],
        experience: '8 years of experience building scalable web applications for SaaS companies. Led the frontend team at TechCorp, increasing performance by 30%.',
        education: 'B.S. in Computer Science, Stanford University'
    },
    {
        id: 'u2',
        name: 'Bob Williams',
        avatar: 'https://picsum.photos/seed/bob/100',
        headline: 'Mid-level React Developer',
        email: 'bob.w@example.com',
        phone: '12125553589',
        skills: ['React', 'JavaScript', 'Redux', 'CSS-in-JS'],
        experience: '3 years of frontend development experience, specializing in e-commerce platforms. Proficient in building responsive and accessible user interfaces.',
        education: 'Coding Bootcamp, Fullstack Academy'
    },
    {
        id: 'u3',
        name: 'Charlie Brown',
        avatar: 'https://picsum.photos/seed/charlie/100',
        headline: 'Aspiring Frontend Engineer',
        email: 'charlie.b@example.com',
        phone: '16175558901',
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        experience: 'Recent computer science graduate with a passion for web development. Completed several personal projects using React, including a real-time chat application.',
        education: 'B.S. in Computer Science, MIT'
    },
     {
        id: 'u4',
        name: 'Diana Prince',
        avatar: 'https://picsum.photos/seed/diana/100',
        headline: 'Full-Stack Engineer with 6 years of experience',
        email: 'diana.p@example.com',
        phone: '14125559876',
        skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
        experience: '6 years in full-stack development, with a focus on building robust APIs and scalable cloud infrastructure. Developed and maintained microservices architecture for a fintech startup.',
        education: 'M.S. in Software Engineering, Carnegie Mellon University'
    }
];

const candidates = lang === 'fr' ? fr_candidates : en_candidates;
const currentUser = candidates[0];

// Pre-populate some applications for recruiter view
const initialApplications: Application[] = [
    { id: 'a1', job: jobs[0], candidate: candidates[1], status: ApplicationStatus.APPLIED, appliedDate: lang === 'fr' ? 'Il y a 1 jour' : '1 day ago' },
    { id: 'a2', job: jobs[0], candidate: candidates[2], status: ApplicationStatus.APPLIED, appliedDate: lang === 'fr' ? 'Il y a 2 jours' : '2 days ago' },
    { id: 'a3', job: jobs[0], candidate: candidates[3], status: ApplicationStatus.APPLIED, appliedDate: lang === 'fr' ? 'Il y a 4 jours' : '4 days ago' },
];

export const useMockData = () => {
    const [allJobs, setAllJobs] = useState<Job[]>(jobs);
    const [allCandidates] = useState<Candidate[]>(candidates);
    const [applications, setApplications] = useState<Application[]>(initialApplications);
    const [savedJobs, setSavedJobs] = useState<string[]>([]);
    const [recruiterJobs] = useState<Job[]>([jobs[0]]); // Recruiter posted the first job

    const getApplicantsForJob = (jobId: string) => {
        const jobApplications = applications.filter(app => app.job.id === jobId);
        return jobApplications.map(app => app.candidate);
    };
    
    const applyForJob = (jobId: string) => {
        const job = allJobs.find(j => j.id === jobId);
        if (!job) return;

        // Check if already applied
        const hasApplied = applications.some(app => app.job.id === jobId && app.candidate.id === currentUser.id);
        if (hasApplied) return;

        const newApplication: Application = {
            id: `app-${Date.now()}`,
            job,
            candidate: currentUser,
            status: ApplicationStatus.APPLIED,
            appliedDate: lang === 'fr' ? 'À l\'instant' : 'Just now'
        };
        setApplications(prev => [newApplication, ...prev]);
    };

    const toggleSaveJob = (jobId: string) => {
        setSavedJobs(prev => 
            prev.includes(jobId) 
                ? prev.filter(id => id !== jobId)
                : [...prev, jobId]
        );
    };

    const addJob = (job: Omit<Job, 'id' | 'company' | 'postedDate'>) => {
        const newJob: Job = {
            ...job,
            id: `j${Date.now()}`,
            company: companies[1], // Mock recruiter company
            postedDate: lang === 'fr' ? 'À l\'instant' : 'Just now'
        };
        setAllJobs(prev => [newJob, ...prev]);
    }

    return { 
        jobs: allJobs, 
        candidates: allCandidates, 
        applications, 
        recruiterJobs, 
        getApplicantsForJob, 
        addJob,
        applyForJob,
        currentUser,
        savedJobs,
        toggleSaveJob,
    };
};

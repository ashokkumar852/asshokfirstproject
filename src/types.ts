export interface PortfolioData {
  fullName: string;
  title: string;
  bio: string;
  profilePicture?: string;
  contact: {
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string[];
  }[];
  projects: {
    name: string;
    description: string;
    techStack: string[];
    link?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
  }[];
  certificates?: {
    name: string;
    issuer: string;
    date?: string;
    icon?: string;
  }[];
  achievements?: string[];
}

export type ThemeType = 'minimal' | 'technical' | 'luxury' | 'brutalist' | 'vibrant' | 'professional';

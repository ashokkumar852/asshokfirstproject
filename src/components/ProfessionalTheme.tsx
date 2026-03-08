import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData } from '../types';
import { 
  Mail, Github, Linkedin, ExternalLink, MapPin, Briefcase, 
  GraduationCap, Code, Award, Send, Moon, Sun, Download, 
  ChevronRight, Instagram, Globe, Phone, User, Sparkles
} from 'lucide-react';

interface ThemeProps {
  data: PortfolioData;
}

export const ProfessionalTheme: React.FC<ThemeProps> = ({ data }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className={`${isDarkMode ? 'dark bg-slate-900 text-white' : 'bg-white text-slate-900'} min-h-screen font-sans transition-colors duration-300`}>
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-100'} px-6 py-4`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              {data.fullName.charAt(0)}
            </div>
            <span className="hidden sm:inline">{data.fullName}</span>
          </div>
          
          <div className="flex items-center gap-8">
            <ul className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => scrollTo(item.id)}
                    className={`text-sm font-bold transition-colors ${activeSection === item.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
          >
            <div className="relative flex-shrink-0">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] rotate-6 opacity-10 animate-pulse" />
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                  {data.profilePicture ? (
                    <img src={data.profilePicture} alt={data.fullName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <User size={80} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
                Welcome to my portfolio
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter">
                I'm <span className="text-indigo-600">{data.fullName}</span>, <br />
                {data.title}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-lg leading-relaxed mx-auto md:mx-0">
                {data.bio.split('.')[0]}. I specialize in building high-performance applications and solving complex problems.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => scrollTo('projects')}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2"
                >
                  View Projects <ChevronRight size={18} />
                </button>
                <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2">
                  Resume <Download size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 px-6 ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-4">
                <span className="w-12 h-1 bg-indigo-600 rounded-full" />
                About Me
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                {data.bio}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-indigo-600 font-bold mb-2">Education</h4>
                  {data.education.map((edu, i) => (
                    <div key={i} className="mb-4">
                      <p className="font-bold text-sm">{edu.degree}</p>
                      <p className="text-xs text-slate-400">{edu.institution}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-indigo-600 font-bold mb-2">Objective</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    To leverage my skills in {data.skills[0]?.items.slice(0, 3).join(', ')} to build innovative solutions and grow as a professional.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-indigo-500/5 border border-slate-100 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Briefcase size={20} className="text-indigo-600" />
                  Experience
                </h3>
                <div className="space-y-8">
                  {data.experience.slice(0, 2).map((exp, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-700">
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-800" />
                      <h4 className="font-bold">{exp.role}</h4>
                      <p className="text-sm text-indigo-600 mb-1">{exp.company}</p>
                      <p className="text-xs text-slate-400">{exp.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-slate-500 dark:text-slate-400">The tools and technologies I use to bring ideas to life</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.skills.map((skillGroup, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-indigo-500/5 border border-slate-100 dark:border-slate-700"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-bold mb-6">{skillGroup.category}</h3>
                <div className="space-y-4">
                  {skillGroup.items.map((skill, j) => (
                    <div key={j}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium">{skill}</span>
                        <span className="text-indigo-600 font-bold">90%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '90%' }}
                          className="h-full bg-indigo-600 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-24 px-6 ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-slate-500 dark:text-slate-400">A selection of my recent work and open-source contributions</p>
            </div>
            <a href={data.contact.github} target="_blank" rel="noreferrer" className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View all on GitHub <ChevronRight size={20} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/5 border border-slate-100 dark:border-slate-700"
              >
                <div className="h-64 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600/80 backdrop-blur-sm">
                    <div className="flex gap-4">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white text-indigo-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <Github size={24} />
                        </a>
                      )}
                      <button className="w-12 h-12 bg-white text-indigo-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <Globe size={24} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, j) => (
                      <span key={j} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Case Study <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Certifications & Achievements</h2>
            <p className="text-slate-500 dark:text-slate-400">Recognition for my continuous learning and professional growth</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.certificates?.map((cert, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{cert.name}</h4>
                  <p className="text-xs text-slate-400">{cert.issuer} • {cert.date}</p>
                </div>
              </div>
            ))}
            {data.achievements?.map((ach, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{ach}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 px-6 ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-12">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-indigo-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Me</p>
                    <p className="font-bold">{data.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-indigo-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="font-bold">{data.contact.location || 'Remote / Worldwide'}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 flex gap-4">
                {[
                  { icon: <Github size={20} />, link: data.contact.github },
                  { icon: <Linkedin size={20} />, link: data.contact.linkedin },
                  { icon: <Instagram size={20} />, link: '#' },
                  { icon: <Globe size={20} />, link: data.contact.website }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-md flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <form className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 border border-slate-100 dark:border-slate-700 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-indigo-600 transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <input type="email" className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-indigo-600 transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                <textarea rows={4} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-indigo-600 transition-colors resize-none" placeholder="Tell me about your project..." />
              </div>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 text-center border-t border-slate-100 dark:border-slate-800">
        <p className="text-slate-400 text-sm font-medium">
          © {new Date().getFullYear()} {data.fullName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { PortfolioData } from '../types';
import { Mail, Github, Linkedin, ExternalLink, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';

interface ThemeProps {
  data: PortfolioData;
}

export const VibrantTheme: React.FC<ThemeProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      {/* Hero / Header */}
      <div className="relative overflow-hidden bg-indigo-600 py-24 px-6 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-violet-500/30 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-400/20 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {data.profilePicture && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl"
                >
                  <img src={data.profilePicture} alt={data.fullName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
              )}
              <div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">{data.fullName}</h1>
                <p className="text-xl md:text-2xl font-medium text-indigo-100">{data.title}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {data.contact.github && (
                <a href={data.contact.github} target="_blank" rel="noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm border border-white/10">
                  <Github size={24} />
                </a>
              )}
              {data.contact.linkedin && (
                <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm border border-white/10">
                  <Linkedin size={24} />
                </a>
              )}
              <a href={`mailto:${data.contact.email}`} className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* About Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-indigo-500/5 border border-slate-100"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-600">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Briefcase size={16} />
                </div>
                About Me
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {data.bio}
              </p>
              <div className="mt-8 space-y-4 pt-8 border-t border-slate-50">
                {data.contact.location && (
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <MapPin size={16} className="text-indigo-400" />
                    {data.contact.location}
                  </div>
                )}
                {data.contact.email && (
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Mail size={16} className="text-indigo-400" />
                    {data.contact.email}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Skills Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-indigo-500/5 border border-slate-100"
            >
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-emerald-600">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Code size={16} />
                </div>
                Skills
              </h2>
              <div className="space-y-6">
                {data.skills.map((group, idx) => (
                  <div key={idx}>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{group.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill, sIdx) => (
                        <span key={sIdx} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium border border-slate-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Experience */}
            <section className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-indigo-500/5 border border-slate-100">
              <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <Briefcase size={20} />
                </div>
                Work Experience
              </h2>
              <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-12 group">
                    <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center z-10 group-hover:border-indigo-100 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-indigo-600" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                        <p className="text-indigo-600 font-semibold">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {exp.description.map((item, iIdx) => (
                        <li key={iIdx} className="text-slate-600 leading-relaxed flex gap-3">
                          <span className="text-indigo-300 mt-1.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projects.map((project, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl shadow-xl shadow-indigo-500/5 border border-slate-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Code size={24} />
                      </div>
                      {project.link && (
                        <a href={project.link} className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400 hover:text-indigo-600">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{project.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </section>

            {/* Education */}
            <section className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-indigo-500/5 border border-slate-100">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <GraduationCap size={20} />
                </div>
                Education
              </h2>
              <div className="space-y-8">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{edu.institution}</h3>
                      <p className="text-slate-500">{edu.degree}</p>
                    </div>
                    <span className="text-sm font-bold text-slate-400">{edu.period}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center text-slate-400 text-sm font-medium">
        © {new Date().getFullYear()} {data.fullName}
      </footer>
    </div>
  );
};

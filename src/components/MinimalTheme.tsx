import React from 'react';
import { motion } from 'motion/react';
import { PortfolioData } from '../types';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Globe } from 'lucide-react';

interface ThemeProps {
  data: PortfolioData;
}

export const MinimalTheme: React.FC<ThemeProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
            {data.profilePicture && (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                <img src={data.profilePicture} alt={data.fullName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            )}
            <div>
              <h1 className="text-6xl font-light tracking-tight mb-2">{data.fullName}</h1>
              <p className="text-xl text-gray-500 font-light">{data.title}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            {data.contact.email && (
              <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 hover:text-black transition-colors">
                <Mail size={16} /> {data.contact.email}
              </a>
            )}
            {data.contact.location && (
              <span className="flex items-center gap-2">
                <MapPin size={16} /> {data.contact.location}
              </span>
            )}
            {data.contact.github && (
              <a href={data.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black transition-colors">
                <Github size={16} /> GitHub
              </a>
            )}
            {data.contact.linkedin && (
              <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black transition-colors">
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
          </div>
        </motion.header>

        {/* Bio */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6 font-semibold">About</h2>
          <p className="text-2xl font-light leading-relaxed text-gray-700">
            {data.bio}
          </p>
        </motion.section>

        {/* Skills */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8 font-semibold">Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-medium mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1 bg-white rounded-full text-xs border border-gray-100 shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8 font-semibold">Experience</h2>
          <div className="space-y-12">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium">{exp.role}</h3>
                  <span className="text-sm text-gray-400">{exp.period}</span>
                </div>
                <p className="text-gray-500 mb-4">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.description.map((item, iIdx) => (
                    <li key={iIdx} className="text-gray-600 text-sm leading-relaxed flex gap-3">
                      <span className="text-gray-300 mt-1.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8 font-semibold">Selected Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((project, idx) => (
              <div key={idx} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-3 flex items-center justify-between">
                  {project.name}
                  {project.link && <ExternalLink size={18} className="text-gray-300" />}
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8 font-semibold">Education</h2>
          <div className="space-y-8">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{edu.institution}</h3>
                    <p className="text-gray-500">{edu.degree}</p>
                  </div>
                  <span className="text-sm text-gray-400">{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <footer className="pt-20 border-t border-gray-200 text-center text-gray-400 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} {data.fullName}
        </footer>
      </div>
    </div>
  );
};

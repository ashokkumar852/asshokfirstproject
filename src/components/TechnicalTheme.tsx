import React from 'react';
import { motion } from 'motion/react';
import { PortfolioData } from '../types';
import { Mail, Github, Linkedin, ExternalLink, Terminal, Cpu, Code2 } from 'lucide-react';

interface ThemeProps {
  data: PortfolioData;
}

export const TechnicalTheme: React.FC<ThemeProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-mono selection:bg-[#141414] selection:text-[#E4E3E0]">
      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto border-x border-[#141414]">
        {/* Header */}
        <header className="border-b border-[#141414] p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-[#141414]/50 text-xs">
              <Terminal size={14} />
              <span>SYSTEM_USER_PROFILE_V1.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-4 italic font-serif">
              {data.fullName}
            </h1>
            <p className="text-xl opacity-70 italic font-serif">{data.title}</p>
          </div>
          <div className="flex flex-col gap-2 text-xs uppercase tracking-tighter">
            {data.contact.email && <a href={`mailto:${data.contact.email}`} className="hover:underline">EMAIL: {data.contact.email}</a>}
            {data.contact.github && <a href={data.contact.github} target="_blank" rel="noreferrer" className="hover:underline">GITHUB: {data.contact.github.split('/').pop()}</a>}
            {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LINKEDIN: {data.contact.linkedin.split('/').pop()}</a>}
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Bio & Skills */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#141414]">
            <section className="p-8 border-b border-[#141414]">
              <h2 className="text-xs font-bold uppercase mb-6 flex items-center gap-2">
                <Code2 size={14} /> // OVERVIEW
              </h2>
              <p className="text-sm leading-relaxed opacity-80">
                {data.bio}
              </p>
            </section>

            <section className="p-8">
              <h2 className="text-xs font-bold uppercase mb-6 flex items-center gap-2">
                <Cpu size={14} /> // TECH_STACK
              </h2>
              <div className="space-y-8">
                {data.skills.map((group, idx) => (
                  <div key={idx}>
                    <h3 className="text-[10px] opacity-50 mb-3 uppercase tracking-widest">{group.category}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {group.items.map((skill, sIdx) => (
                        <span key={sIdx} className="text-xs hover:bg-[#141414] hover:text-[#E4E3E0] px-1 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Experience & Projects */}
          <div className="lg:col-span-8">
            <section className="border-b border-[#141414]">
              <div className="p-4 border-b border-[#141414] bg-[#141414] text-[#E4E3E0] text-[10px] uppercase tracking-widest">
                WORK_HISTORY_LOG
              </div>
              <div className="divide-y divide-[#141414]">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="p-8 hover:bg-[#141414]/5 transition-colors group">
                    <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-lg font-bold uppercase">{exp.role}</h3>
                        <p className="text-sm opacity-60 italic font-serif">{exp.company}</p>
                      </div>
                      <span className="text-xs opacity-40">{exp.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.description.map((item, iIdx) => (
                        <li key={iIdx} className="text-xs leading-relaxed opacity-70 flex gap-4">
                          <span className="opacity-30">[{iIdx.toString().padStart(2, '0')}]</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="p-4 border-b border-[#141414] bg-[#141414] text-[#E4E3E0] text-[10px] uppercase tracking-widest">
                PROJECT_DEPLOYMENTS
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide-[#141414]">
                {data.projects.map((project, idx) => (
                  <div key={idx} className="p-8 hover:bg-[#141414] hover:text-[#E4E3E0] transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold uppercase leading-tight">{project.name}</h3>
                      {project.link && <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />}
                    </div>
                    <p className="text-xs mb-6 opacity-70 group-hover:opacity-90 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-[9px] border border-current px-1.5 py-0.5 opacity-50 group-hover:opacity-100 uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <footer className="border-t border-[#141414] p-8 text-[10px] opacity-30 uppercase flex justify-between">
          <span>BUILD_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          <span>© {new Date().getFullYear()} {data.fullName} // ALL RIGHTS RESERVED</span>
        </footer>
      </div>
    </div>
  );
};

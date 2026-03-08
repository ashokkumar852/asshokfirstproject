import React from 'react';
import { motion } from 'motion/react';
import { PortfolioData } from '../types';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ThemeProps {
  data: PortfolioData;
}

export const BrutalistTheme: React.FC<ThemeProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#00FF00] selection:text-black">
      {/* Header / Hero */}
      <header className="border-b-2 border-black">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-8 p-8 md:p-16 border-b-2 md:border-b-0 md:border-r-2 border-black">
            <motion.h1 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-[15vw] md:text-[10vw] font-black leading-[0.8] uppercase tracking-tighter mb-8"
            >
              {data.fullName.split(' ')[0]}<br />
              {data.fullName.split(' ')[1]}
            </motion.h1>
            <p className="text-2xl md:text-4xl font-bold uppercase tracking-tight max-w-2xl">
              {data.title}
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col">
            <div className="p-8 border-b-2 border-black flex-1 flex flex-col justify-between">
              <span className="text-xs font-black uppercase mb-4">[01] ABOUT</span>
              <p className="font-medium leading-tight">{data.bio}</p>
            </div>
            <div className="p-8 bg-[#00FF00] flex flex-col justify-between">
              <span className="text-xs font-black uppercase mb-4">[02] CONTACT</span>
              <div className="space-y-2 font-black uppercase tracking-tight break-all">
                <a href={`mailto:${data.contact.email}`} className="block hover:underline">{data.contact.email}</a>
                {data.contact.github && <a href={data.contact.github} className="block hover:underline">GITHUB</a>}
                {data.contact.linkedin && <a href={data.contact.linkedin} className="block hover:underline">LINKEDIN</a>}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Marquee */}
      <div className="bg-black text-white py-4 overflow-hidden whitespace-nowrap border-b-2 border-black">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block text-4xl font-black uppercase tracking-tighter"
        >
          {data.skills.map(g => g.items.join(' • ')).join(' • ')} • {data.skills.map(g => g.items.join(' • ')).join(' • ')}
        </motion.div>
      </div>

      {/* Experience */}
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 p-8 border-b-2 md:border-b-0 md:border-r-2 border-black">
            <h2 className="text-6xl font-black uppercase leading-none tracking-tighter">EXP<br/>ERI<br/>ENCE</h2>
          </div>
          <div className="md:col-span-8 divide-y-2 divide-black">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="p-8 hover:bg-black hover:text-white transition-colors group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-black mb-2 block">[{idx + 1}] {exp.period}</span>
                    <h3 className="text-4xl font-black uppercase leading-none">{exp.role}</h3>
                    <p className="text-xl font-bold opacity-60">{exp.company}</p>
                  </div>
                  <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                </div>
                <ul className="space-y-2 max-w-2xl">
                  {exp.description.map((item, iIdx) => (
                    <li key={iIdx} className="font-medium leading-tight">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x-2 divide-y-2 md:divide-y-0 divide-black">
          <div className="p-8 flex flex-col justify-between min-h-[400px]">
            <h2 className="text-6xl font-black uppercase leading-none tracking-tighter">PRO<br/>JECTS</h2>
            <p className="font-black uppercase text-xs">SELECTED WORKS 2020-2024</p>
          </div>
          {data.projects.map((project, idx) => (
            <div key={idx} className="p-8 flex flex-col justify-between min-h-[400px] hover:bg-[#00FF00] transition-colors group">
              <div>
                <span className="text-xs font-black mb-4 block">PROJECT_{idx.toString().padStart(2, '0')}</span>
                <h3 className="text-4xl font-black uppercase leading-[0.9] mb-6">{project.name}</h3>
                <p className="font-bold leading-tight mb-8">{project.description}</p>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="bg-black text-white text-[10px] font-black px-2 py-1 uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && <ExternalLink size={24} />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-8 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="text-[10vw] font-black leading-none tracking-tighter uppercase">
          THANKS.
        </div>
        <div className="text-right">
          <p className="font-black uppercase text-xs mb-2">DESIGNED BY AI STUDIO</p>
          <p className="font-black uppercase text-xs">© {new Date().getFullYear()} {data.fullName}</p>
        </div>
      </footer>
    </div>
  );
};

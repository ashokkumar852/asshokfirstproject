import React from 'react';
import { motion } from 'motion/react';
import { PortfolioData } from '../types';
import { Mail, Github, Linkedin, ExternalLink, MapPin } from 'lucide-react';

interface ThemeProps {
  data: PortfolioData;
}

export const LuxuryTheme: React.FC<ThemeProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/10 blur-[120px] rounded-full" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
            {data.profilePicture && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-48 h-64 md:w-64 md:h-80 rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl"
              >
                <img src={data.profilePicture} alt={data.fullName} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </motion.div>
            )}
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8 block font-medium">Portfolio / {new Date().getFullYear()}</span>
              <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] font-light tracking-tighter">
                {data.fullName.split(' ').map((name, i) => (
                  <span key={i} className="block">{name}</span>
                ))}
              </h1>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <p className="text-xl md:text-2xl font-light text-white/60 max-w-xl leading-relaxed">
              {data.title}. {data.bio.split('.')[0]}.
            </p>
            <div className="flex gap-8">
              {data.contact.github && <a href={data.contact.github} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Github size={20} /></a>}
              {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Linkedin size={20} /></a>}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="py-32 px-6 md:px-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 sticky top-32">Experience</h2>
          </div>
          <div className="lg:col-span-8 space-y-32">
            {data.experience.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <span className="text-sm text-white/30 mb-4 block font-mono">{exp.period}</span>
                <h3 className="text-4xl md:text-5xl font-light mb-4 group-hover:italic transition-all duration-500">{exp.role}</h3>
                <p className="text-xl text-white/50 mb-8">{exp.company}</p>
                <div className="space-y-4 max-w-2xl">
                  {exp.description.map((item, iIdx) => (
                    <p key={iIdx} className="text-white/40 leading-relaxed font-light">{item}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 px-6 md:px-20 bg-white text-black">
        <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 mb-20">Selected Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
          {data.projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white p-12 md:p-20 flex flex-col justify-between aspect-square hover:bg-black hover:text-white transition-colors duration-700 group"
            >
              <div>
                <h3 className="text-4xl font-light mb-6 tracking-tight">{project.name}</h3>
                <p className="text-lg opacity-60 font-light leading-relaxed">{project.description}</p>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="text-[10px] uppercase tracking-widest border border-current px-2 py-1 rounded-full opacity-40">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && <ExternalLink size={24} className="opacity-20 group-hover:opacity-100 transition-opacity" />}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills & Contact */}
      <section className="py-32 px-6 md:px-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-12">Expertise</h2>
            <div className="space-y-12">
              {data.skills.map((group, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-medium mb-6 text-white/60">{group.category}</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {group.items.map((skill, sIdx) => (
                      <span key={sIdx} className="text-2xl font-light text-white/30 hover:text-white transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="mb-20 lg:mb-0">
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-12">Connect</h2>
              <a href={`mailto:${data.contact.email}`} className="text-[8vw] md:text-[5vw] font-light tracking-tighter hover:italic transition-all block mb-8">
                Let's talk.
              </a>
              <div className="flex flex-wrap gap-12 text-white/40 uppercase tracking-widest text-xs">
                {data.contact.email && <a href={`mailto:${data.contact.email}`} className="hover:text-white transition-colors">Email</a>}
                {data.contact.linkedin && <a href={data.contact.linkedin} className="hover:text-white transition-colors">LinkedIn</a>}
                {data.contact.github && <a href={data.contact.github} className="hover:text-white transition-colors">GitHub</a>}
              </div>
            </div>
            <footer className="text-[10px] uppercase tracking-[0.5em] text-white/20 pt-20">
              © {new Date().getFullYear()} {data.fullName}
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
};

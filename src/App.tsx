import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData } from './types';
import { MinimalTheme } from './components/MinimalTheme';
import { TechnicalTheme } from './components/TechnicalTheme';
import { LuxuryTheme } from './components/LuxuryTheme';
import { BrutalistTheme } from './components/BrutalistTheme';
import { VibrantTheme } from './components/VibrantTheme';
import { ProfessionalTheme } from './components/ProfessionalTheme';
import { convertResumeToPortfolio } from './services/geminiService';
import { extractTextFromFile } from './services/fileService';
import { Sparkles, Loader2, FileText, Layout, ArrowRight, RefreshCw, Palette, Upload, FileUp, X, Code } from 'lucide-react';

type Step = 'input' | 'processing' | 'preview';

export default function App() {
  const [step, setStep] = useState<Step>('input');
  const [resumeText, setResumeText] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [theme, setTheme] = useState<'minimal' | 'technical' | 'luxury' | 'brutalist' | 'vibrant' | 'professional'>('professional');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!resumeText.trim()) return;
    
    setStep('processing');
    setError(null);
    
    try {
      const data = await convertResumeToPortfolio(resumeText);
      if (profilePicture) {
        data.profilePicture = profilePicture;
      }
      setPortfolioData(data);
      setStep('preview');
    } catch (err) {
      console.error(err);
      setError('Something went wrong while parsing your resume. Please try again.');
      setStep('input');
    }
  };

  const loadExample = () => {
    setResumeText(`John Doe
Senior AI Engineer
john.doe@email.com | San Francisco, CA | github.com/johndoe

Summary:
Passionate AI Engineer with 8+ years of experience building scalable machine learning models and web applications. Expert in Python, TensorFlow, and Cloud Infrastructure.

Experience:
TechCorp | Senior AI Engineer | 2020 - Present
- Led the development of a real-time phishing detection system using deep learning.
- Improved model accuracy by 25% through advanced feature engineering and data augmentation.
- Mentored a team of 5 junior engineers and implemented MLOps best practices.

WebSolutions | Full Stack Developer | 2016 - 2020
- Developed and maintained multiple client-facing React applications.
- Integrated third-party APIs for payment processing and analytics.
- Reduced deployment time by 50% by implementing a robust CI/CD pipeline.

Skills:
- AI & ML: Python, TensorFlow, PyTorch, Scikit-learn
- Languages: Java, JavaScript, TypeScript, Go
- Tools: Git, GitHub, Docker, Kubernetes, AWS
- Core: Data Structures, Machine Learning, Problem Solving

Projects:
- AI Phishing Detection: A deep learning system to identify malicious URLs.
- Student Management System: A robust Java application for academic tracking.
- Recommender System: A personalized content engine built with collaborative filtering.
- Python Automation: A suite of scripts for cloud resource management.

Education:
- University of California, Berkeley | B.S. in Computer Science | 2012 - 2016

Certificates:
- AWS Certified Machine Learning Specialty | Amazon Web Services | 2022
- Deep Learning Specialization | Coursera | 2021
- Professional Data Engineer | Google Cloud | 2020

Achievements:
- Winner of the 2023 Global AI Hackathon
- Published 3 research papers on Neural Network Optimization
- Open Source Contributor to TensorFlow`);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file: File) => {
    setIsExtracting(true);
    setError(null);
    try {
      const text = await extractTextFromFile(file);
      setResumeText(text);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to extract text from file.');
    } finally {
      setIsExtracting(false);
    }
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) await processFile(file);
  };

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePicture(reader.result as string);
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setStep('input');
    setPortfolioData(null);
    setProfilePicture(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <motion.div 
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-5xl w-full">
              <header className="mb-12 text-center">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold mb-8 shadow-xl shadow-indigo-200"
                >
                  <Sparkles size={14} />
                  <span>PORTFOLIO GENERATOR</span>
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-slate-900 leading-[0.9]">
                  Resume to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Portfolio</span> in seconds.
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                  Paste your resume text and build a professional, colorful, and interactive website instantly.
                </p>
              </header>

              <div className="relative group max-w-4xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden">
                  
                  {/* Profile Picture Upload */}
                  <div className="absolute top-8 right-8 z-20">
                    <label className="relative group cursor-pointer block">
                      <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group-hover:border-indigo-400 transition-all">
                        {profilePicture ? (
                          <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="text-slate-400 flex flex-col items-center">
                            <Upload size={20} />
                            <span className="text-[10px] font-bold mt-1">PHOTO</span>
                          </div>
                        )}
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleProfilePictureUpload} />
                      {profilePicture && (
                        <button 
                          onClick={(e) => { e.preventDefault(); setProfilePicture(null); }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </label>
                  </div>

                  {/* File Upload Zone */}
                  {!resumeText && !isExtracting && (
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={onDrop}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-all"
                    >
                      <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                        <Upload size={32} />
                      </div>
                      <p className="text-xl font-bold text-slate-900 mb-2">Drop your resume here</p>
                      <p className="text-slate-500 mb-8">Supports PDF, DOCX, and TXT</p>
                      <label className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all cursor-pointer shadow-lg shadow-indigo-100">
                        Select File
                        <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileUpload} />
                      </label>
                      <button 
                        onClick={() => setResumeText(' ')} 
                        className="mt-6 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        or paste text manually
                      </button>
                    </div>
                  )}

                  {isExtracting && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
                      <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                      <p className="text-lg font-bold text-slate-900">Extracting text...</p>
                    </div>
                  )}

                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume text here (Experience, Skills, Projects, etc.)..."
                    className="w-full h-80 p-10 text-lg font-medium focus:outline-none resize-none placeholder:text-slate-300 text-slate-700"
                  />
                  
                  <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                      {resumeText ? (
                        <button 
                          onClick={() => setResumeText('')}
                          className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl"
                        >
                          <X size={14} /> Clear Text
                        </button>
                      ) : (
                        <button 
                          onClick={loadExample}
                          className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl"
                        >
                          <RefreshCw size={14} /> Try Example
                        </button>
                      )}
                      
                      <div className="hidden md:flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><FileUp size={16} className="text-slate-300" /> PDF/DOCX Support</span>
                        <span className="flex items-center gap-2"><Sparkles size={16} className="text-indigo-400" /> Smart Enhanced</span>
                      </div>
                    </div>
                    <button
                      onClick={handleConvert}
                      disabled={!resumeText.trim() || isExtracting}
                      className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95"
                    >
                      Generate My Portfolio <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center text-red-500 font-bold text-sm bg-red-50 py-3 px-6 rounded-xl inline-block mx-auto w-full max-w-md"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-4 border-gray-100 border-t-black rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="text-black" size={32} />
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <h2 className="text-2xl font-medium mb-2">Crafting your portfolio...</h2>
              <p className="text-gray-400 text-sm animate-pulse">Analyzing your career highlights</p>
            </motion.div>
          </motion.div>
        )}

        {step === 'preview' && portfolioData && (
          <motion.div 
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Toolbar */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full px-4 py-2 shadow-2xl flex items-center gap-4">
              <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
                {[
                  { id: 'professional', label: 'Pro', icon: <Layout size={14} /> },
                  { id: 'vibrant', label: 'Vibrant', icon: <Palette size={14} /> },
                  { id: 'minimal', label: 'Minimal', icon: <FileText size={14} /> },
                  { id: 'technical', label: 'Technical', icon: <Code size={14} /> },
                  { id: 'luxury', label: 'Luxury', icon: <Sparkles size={14} /> },
                  { id: 'brutalist', label: 'Brutalist', icon: <ArrowRight size={14} /> }
                ].map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => setTheme(t.id as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${theme === t.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'hover:bg-slate-100 text-slate-500'}`}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
              <button 
                onClick={reset}
                className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors px-2"
              >
                <RefreshCw size={14} /> Reset
              </button>
            </div>

            {theme === 'minimal' && <MinimalTheme data={portfolioData} />}
            {theme === 'technical' && <TechnicalTheme data={portfolioData} />}
            {theme === 'luxury' && <LuxuryTheme data={portfolioData} />}
            {theme === 'brutalist' && <BrutalistTheme data={portfolioData} />}
            {theme === 'vibrant' && <VibrantTheme data={portfolioData} />}
            {theme === 'professional' && <ProfessionalTheme data={portfolioData} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState } from 'react';
import { DOSSIER } from '../data/dossier';
import { 
  Building2, 
  GraduationCap, 
  MapPin, 
  Layers, 
  Globe2, 
  CheckCircle,
  Download,
  FileText
} from 'lucide-react';

export const ProvenanceTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'provenance' | 'education' | 'languages'>('provenance');
  const [filterType, setFilterType] = useState<string>('All');

  const filteredExperiences = filterType === 'All'
    ? DOSSIER.experiences
    : DOSSIER.experiences.filter((exp) => exp.type === filterType);

  return (
    <section className="relative py-20 px-4 max-w-7xl mx-auto z-10" id="provenance">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/40 border border-sky-800/40 mb-3">
          <Layers className="w-3.5 h-3.5" />
          Multi-Node Institutional Pedigree
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-platinum-gradient tracking-tight mb-4">
          Concurrent Provenance & Credentials
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
          Concurrent timeline of doctoral research appointments, institutional fellowships, foundation model engineering, and formal postgraduate education.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl glass-panel mt-6 border border-slate-800">
          <button
            onClick={() => setActiveTab('provenance')}
            className={`px-5 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all duration-200 ${
              activeTab === 'provenance'
                ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Research Appointments & Industry</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`px-5 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all duration-200 ${
              activeTab === 'education'
                ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Doctoral & Postgraduate Credentials</span>
          </button>

          <button
            onClick={() => setActiveTab('languages')}
            className={`px-5 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all duration-200 ${
              activeTab === 'languages'
                ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>Linguistic & Cultural Proficiencies</span>
          </button>
        </div>

        {/* CV PDF Download Banner */}
        <div className="mt-4">
          <a
            href="/samad_saifi_polymath_cv.pdf"
            download="Samad_Saifi_Polymath_CV.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-sky-400 text-sky-300 hover:text-white text-xs font-mono transition-all shadow-md hover:scale-105"
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Download Official CV Dossier (PDF)</span>
            <Download className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Tab 1: Concurrent Research & Industry Provenance */}
      {activeTab === 'provenance' && (
        <div className="space-y-6">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <span className="text-xs font-mono text-slate-500 uppercase">
              CONCURRENT APPOINTMENTS (2018 - PRESENT)
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Doctoral / Research', 'Industry Foundation', 'Faculty', 'Open Source'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    filterType === t
                      ? 'bg-sky-950 border border-sky-400 text-sky-300'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="relative border-l border-slate-800 ml-4 md:ml-8 pl-6 md:pl-10 space-y-8">
            {filteredExperiences.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Node Dot */}
                <div
                  className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 bg-slate-950 transition-transform group-hover:scale-125 ${
                    exp.isCurrent ? 'border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]' : 'border-slate-600'
                  }`}
                >
                  {exp.isCurrent && (
                    <span className="absolute inset-0.5 rounded-full bg-sky-400 animate-ping opacity-75" />
                  )}
                </div>

                {/* Card Container */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-sky-400 tracking-wider">
                      {exp.period}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase border ${exp.badgeColor}`}>
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium text-white mb-1">
                    {exp.role}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4 font-mono">
                    <span className="text-slate-200 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-sky-400" />
                      {exp.organization}
                    </span>
                    {exp.division && (
                      <>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400">{exp.division}</span>
                      </>
                    )}
                    <span className="text-slate-600">·</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-2 text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold shrink-0 mt-0.5">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Doctoral & Postgraduate Credentials (Excluding IGNOU completely) */}
      {activeTab === 'education' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DOSSIER.education.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 md:p-8 rounded-2xl border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-950/70 border border-sky-800/60 text-sky-300">
                    {item.status}
                  </span>
                  <span className="text-slate-400">{item.period}</span>
                </div>

                <h3 className="text-lg md:text-xl font-medium text-white mb-1.5">
                  {item.degree}
                </h3>

                <p className="text-xs font-mono text-sky-400 mb-1">
                  {item.institution}
                </p>

                {item.division && (
                  <p className="text-xs text-slate-400 mb-4">{item.division}</p>
                )}

                <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>VERIFIED SCHOLASTIC RECORD</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Conferred / Active
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Linguistic & Cultural Proficiencies */}
      {activeTab === 'languages' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOSSIER.languages.map((lang, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-sky-400/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-light text-white">{lang.name}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                  {lang.code.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-mono leading-relaxed mb-4">
                {lang.proficiency}
              </p>

              {lang.name === 'Sumerian' && (
                <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-800/40 text-[11px] text-sky-200 font-mono">
                  ★ Rare archaic philology & cuneiform translation proficiency.
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Affiliations Badge Strip */}
      <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-around gap-6 text-xs font-mono text-slate-500">
        <span className="text-slate-400">INSTITUTIONAL & PROFESSIONAL MEMBERSHIPS:</span>
        <span className="text-slate-300 hover:text-white transition-colors">STANFORD HAI RESEARCH COMMUNITY</span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-300 hover:text-white transition-colors">IEEE COMPUTER & ROBOTICS SOCIETIES</span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-300 hover:text-white transition-colors">AISES SCHOLARLY NETWORK</span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-300 hover:text-white transition-colors">ISRO IIRS SPACE ALUMNI</span>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { DOSSIER } from '../data/dossier';
import { 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  GitBranch,
  BookOpen
} from 'lucide-react';

interface Props {
  onOpenPublication?: (pubId: string) => void;
}

export const DomainIntersectionMatrix: React.FC<Props> = ({ onOpenPublication }) => {
  const [selectedIntersectionId, setSelectedIntersectionId] = useState<string>('ai-aero');
  const [filterTag, setFilterTag] = useState<string>('All');

  const filterOptions = [
    'All',
    'AI Alignment',
    'Aerospace Autonomy',
    'Foundation Models',
    'Distributed Systems',
    'Cryptography',
    'Operating Systems',
  ];

  const activeIntersection = DOSSIER.intersections.find(
    (item) => item.id === selectedIntersectionId
  ) || DOSSIER.intersections[0];

  const filteredIntersections = filterTag === 'All'
    ? DOSSIER.intersections
    : DOSSIER.intersections.filter((item) =>
        item.domains.some((d) => d.toLowerCase().includes(filterTag.toLowerCase()))
      );

  return (
    <section className="relative py-20 px-4 max-w-7xl mx-auto z-10" id="intersections">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/40 border border-sky-800/40 mb-3">
          <GitBranch className="w-3.5 h-3.5" />
          Non-Linear Knowledge Synthesis
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-platinum-gradient tracking-tight mb-4">
          Interdisciplinary Intersection Matrix
        </h2>
        <p className="text-slate-400 max-w-3xl mx-auto text-sm md:text-base font-light leading-relaxed">
          Polymathic synthesis occurs at the frontiers where disparate technical disciplines intersect. Explore verified architectures bridging deep foundation models, aerospace telemetry, trustless cryptography, and low-level kernel mechanics.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {filterOptions.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                filterTag === tag
                  ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Selection Matrix + Detailed Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Intersection Node Selectors */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase text-slate-500 tracking-wider mb-2 flex items-center justify-between">
            <span>SYNTHESIS DOMAIN VECTORS</span>
            <span className="text-sky-400 font-bold">{filteredIntersections.length} NODES</span>
          </div>

          {filteredIntersections.map((node) => {
            const isSelected = node.id === activeIntersection.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedIntersectionId(node.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 relative border ${
                  isSelected
                    ? 'glass-panel-glow border-sky-400/60 ring-1 ring-sky-400/40 bg-sky-950/20 translate-x-1'
                    : 'glass-panel border-slate-800/80 hover:border-slate-700 hover:translate-x-1'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-sky-400 to-blue-600 rounded-r" />
                )}

                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-slate-800/80 text-sky-300 border border-slate-700">
                      {node.domains[0]}
                    </span>
                    <span className="text-slate-600 text-xs">×</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-slate-800/80 text-sky-300 border border-slate-700">
                      {node.domains[1]}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-emerald-400">
                    {node.metric}
                  </span>
                </div>

                <h3 className="text-base font-medium text-white mb-1.5 flex items-center justify-between">
                  <span>{node.title}</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? 'text-sky-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 font-light">
                  {node.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Synthesis Blueprint Canvas */}
        <div className="lg:col-span-7 glass-panel-glow p-6 md:p-8 rounded-2xl border border-sky-500/25 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-5 mb-6">
            <div>
              <span className="text-xs font-mono text-sky-400 tracking-widest uppercase block mb-1">
                SYSTEM SYNTHESIS BLUEPRINT
              </span>
              <h3 className="text-2xl md:text-3xl font-light text-white">
                {activeIntersection.title}
              </h3>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-sky-950/60 border border-sky-500/40 text-xs font-mono text-sky-300">
              {activeIntersection.metric}
            </div>
          </div>

          {/* Subtitle & Deep Synthesis Narrative */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-sky-200 mb-2 font-mono">
              Theoretical Foundation & Empirical Synthesis:
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-light bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
              {activeIntersection.synthesis}
            </p>
          </div>

          {/* Systems Architecture Specs */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              Verified Architectural Components
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeIntersection.systemArchitecture.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span className="font-light">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Artifacts & Publications */}
          <div className="pt-4 border-t border-slate-800/80">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              Connected Provenance & Artifacts
            </h4>
            <div className="space-y-2">
              {activeIntersection.keyArtifacts.map((artifact, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between group hover:border-slate-700 transition-colors"
                >
                  <span className="font-mono text-sky-300/90">{artifact}</span>
                  {artifact.startsWith('Paper:') ? (
                    <a
                      href="#publications-archive"
                      onClick={() => {
                        if (onOpenPublication && activeIntersection.relatedPublicationIds[0]) {
                          onOpenPublication(activeIntersection.relatedPublicationIds[0]);
                        }
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-sky-400 hover:text-white"
                    >
                      <span>View Paper</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Verified Repo</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { DOSSIER } from '../data/dossier';
import type { Publication } from '../data/dossier';
import confetti from 'canvas-confetti';
import { 
  Search, 
  BookOpen, 
  Copy, 
  Check, 
  Quote,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Props {
  highlightId?: string | null;
}

export const PublicationsDrawer: React.FC<Props> = ({ highlightId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [activeBibtexModal, setActiveBibtexModal] = useState<Publication | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyBibtex = (pub: Publication) => {
    navigator.clipboard.writeText(pub.bibtex);
    setCopiedId(pub.id);

    // Celebratory confetti burst
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#7dd3fc', '#ffffff', '#0284c7'],
    });

    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const domains = ['All', 'AI Alignment', 'Distributed Systems', 'Zero-Knowledge', 'Aerospace'];

  const filteredPubs = DOSSIER.publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain =
      selectedDomain === 'All' || pub.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <section className="relative py-20 px-4 max-w-7xl mx-auto z-10" id="publications-archive">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/40 border border-sky-800/40 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Peer-Reviewed Archival Record
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-platinum-gradient tracking-tight">
            Scholarly Publications
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl">
            Formal technical manuscripts, conference proceedings, and foundational preprints with integrated Microdata and verified BibTeX citations.
          </p>
        </div>

        {/* Live Search & Filter Controls */}
        <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search manuscripts, abstracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
            />
          </div>

          {/* Domain Category Filter */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-sky-400"
          >
            {domains.map((d) => (
              <option key={d} value={d}>
                Domain: {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Publications Listing */}
      <div className="space-y-6">
        {filteredPubs.map((pub) => {
          const isExpanded = !!expandedAbstracts[pub.id];
          const isTargeted = highlightId === pub.id;

          return (
            <article
              key={pub.id}
              itemScope
              itemType="https://schema.org/ScholarlyArticle"
              className={`p-6 md:p-8 rounded-2xl transition-all duration-300 ${
                isTargeted
                  ? 'glass-panel-glow border-sky-400 ring-2 ring-sky-400/30'
                  : 'glass-panel border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Top Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-950/70 border border-sky-800/60 text-sky-300">
                    {pub.domain}
                  </span>
                  <span className="text-slate-500">YEAR:</span>
                  <span className="text-slate-300 font-bold" itemProp="datePublished">
                    {pub.year}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                  {pub.citations && (
                    <span className="text-emerald-400">
                      ★ {pub.citations} Citations
                    </span>
                  )}
                  {pub.arxiv && (
                    <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                      {pub.arxiv}
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3
                itemProp="headline"
                className="text-xl md:text-2xl font-light text-white mb-2 leading-snug hover:text-sky-300 transition-colors cursor-pointer"
                onClick={() => toggleAbstract(pub.id)}
              >
                {pub.title}
              </h3>

              {/* Authors & Institutional Venue */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4">
                <span className="text-slate-300 font-medium" itemProp="author">
                  {pub.authors.join(', ')}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-sky-300 font-mono italic" itemProp="publisher">
                  {pub.venue}
                </span>
                {pub.doi && (
                  <>
                    <span className="text-slate-600">·</span>
                    <span className="font-mono text-slate-500">DOI: {pub.doi}</span>
                  </>
                )}
              </div>

              {/* Abstract Body (Expandable) */}
              <div className="mb-4">
                <p
                  itemProp="abstract"
                  className={`text-xs md:text-sm text-slate-300 font-light leading-relaxed transition-all ${
                    isExpanded ? 'block' : 'line-clamp-2 text-slate-400'
                  }`}
                >
                  {pub.abstract}
                </p>
                <button
                  onClick={() => toggleAbstract(pub.id)}
                  className="mt-2 text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <span>Collapse Abstract</span>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Read Extended Abstract & Formulation</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyBibtex(pub)}
                    className="px-3.5 py-1.5 rounded-lg bg-sky-950/70 border border-sky-800/60 text-sky-300 hover:bg-sky-900/60 hover:text-white flex items-center gap-2 transition-all"
                  >
                    {copiedId === pub.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">BibTeX Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy BibTeX</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveBibtexModal(pub)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Quote className="w-3.5 h-3.5" />
                    <span>View Citation</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500">STANFORD RESEARCH REPOSITORY</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* BibTeX Modal Drawer */}
      {activeBibtexModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel-glow p-6 md:p-8 rounded-2xl max-w-2xl w-full border border-sky-500/40 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Quote className="w-4 h-4 text-sky-400" />
                <h4 className="text-base font-mono text-white">BIBTEX CITATION RECORD</h4>
              </div>
              <button
                onClick={() => setActiveBibtexModal(null)}
                className="text-slate-400 hover:text-white text-lg font-mono"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 font-mono mb-3">
              Standardized BibTeX format for LaTeX compilation and reference managers:
            </p>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-200 overflow-x-auto leading-relaxed select-all">
              {activeBibtexModal.bibtex}
            </pre>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={() => handleCopyBibtex(activeBibtexModal)}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-mono text-xs flex items-center gap-2 shadow-lg"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy to Clipboard
              </button>
              <button
                onClick={() => setActiveBibtexModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import React from 'react';
import { DOSSIER } from '../data/dossier';
import { ShieldCheck, ExternalLink, ArrowUp, Cat, Heart } from 'lucide-react';

interface Props {
  onOpenAdvisory: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenAdvisory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#02050e] pt-16 pb-12 px-4 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span className="text-white font-medium text-sm tracking-wide">
                Samad Saifi <span className="text-sky-300 font-mono text-xs font-normal">pɒlimaθ ✨</span>
              </span>
            </div>
            <p className="text-slate-400 font-light text-xs max-w-md leading-relaxed">
              Synthesizing foundational breakthroughs across Artificial Intelligence, Autonomous Aerospace, Decentralized Cryptography, and Low-Level Firmware Architecture.
            </p>
            <div className="text-[11px] text-slate-500 space-y-1">
              <p>Institutional Nodes: Stanford University · Stanford HAI · University of Cambridge</p>
              <p>Operational Coordinate: San Jose, California, United States</p>
            </div>

            {/* Cat Tribute Pill: ASJ And maanu */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-slate-800 hover:border-amber-400/50 transition-all text-xs text-slate-300 shadow-md group">
                <Cat className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-white tracking-wide">ASJ And maanu</span>
                <span className="text-amber-300 text-sm">🐱🐾😻✨</span>
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Jump */}
          <div className="space-y-2">
            <span className="text-white font-medium uppercase tracking-wider text-[11px] block mb-1">
              ARCHIVAL SECTIONS
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#emblems" className="hover:text-sky-300 transition-colors">Discipline Emblems</a></li>
              <li><a href="#antigravity-sandbox" className="hover:text-sky-300 transition-colors">Antigravity Physics Lab</a></li>
              <li><a href="#neural-brain" className="hover:text-sky-300 transition-colors">Neural Synaptic Brain</a></li>
              <li><a href="#interactive-simulators" className="hover:text-sky-300 transition-colors">Research Simulators</a></li>
              <li><a href="#intersections" className="hover:text-sky-300 transition-colors">Domain Synthesis Matrix</a></li>
              <li><a href="#publications-archive" className="hover:text-sky-300 transition-colors">Scholarly Publications</a></li>
              <li><a href="#provenance" className="hover:text-sky-300 transition-colors">Branching Provenance</a></li>
              <li><a href="#terminal-cli" className="hover:text-sky-300 transition-colors">Interactive CLI Terminal</a></li>
            </ul>
          </div>

          {/* Column 3: Institutional Security & Privacy */}
          <div className="space-y-3">
            <span className="text-white font-medium uppercase tracking-wider text-[11px] block mb-1">
              INSTITUTIONAL INTEGRITY
            </span>
            <p className="text-[11px] text-slate-400 font-light">
              Advisory inquiries dispatched through verifiable cryptographic protocols. Personal email addresses strictly protected.
            </p>
            <button
              onClick={onOpenAdvisory}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-400 text-sky-300 hover:text-white flex items-center gap-2 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Advisory & PGP Portal</span>
            </button>
            <div className="text-[10px] text-slate-500 font-mono">
              PGP Fingerprint: {DOSSIER.pgpKey.keyId}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <span>© {new Date().getFullYear()} Samad Saifi. All Rights Reserved.</span>
            <span>·</span>
            <div className="inline-flex items-center gap-1.5 text-slate-400">
              <Cat className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300 font-mono font-medium">ASJ And maanu</span>
              <span>🐱🐾✨</span>
            </div>
            <span>·</span>
            <a
              href="https://linkedin.com/in/samadsaifi09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-300 transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <span className="text-slate-500">WCAG AAA Compliant</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Return to Orbit</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

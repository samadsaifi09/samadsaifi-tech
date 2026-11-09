import React, { useState } from 'react';
import { DOSSIER } from '../data/dossier';

interface EmblemProps {
  onSelectDomain?: (domainId: string) => void;
}

export const DisciplineEmblems: React.FC<EmblemProps> = ({ onSelectDomain }) => {
  const [activeEmblem, setActiveEmblem] = useState<string | null>(null);

  const getSvg = (id: string) => {
    switch (id) {
      case 'academic':
        // Royal Crown: Luxury geometric crown with star finials, platinum lines and jewel facets
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor">
            <defs>
              <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <filter id="crownGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Crown Base Band with Gem facets */}
            <path d="M15 72 L85 72 L82 82 L18 82 Z" stroke="url(#crownGrad)" strokeWidth="1.5" fill="rgba(56, 189, 248, 0.08)" />
            <circle cx="28" cy="77" r="2" fill="#7dd3fc" />
            <circle cx="50" cy="77" r="2.5" fill="#ffffff" />
            <circle cx="72" cy="77" r="2" fill="#7dd3fc" />
            {/* Crown Peaks */}
            <path d="M18 72 L12 36 L30 52 L50 20 L70 52 L88 36 L82 72 Z" stroke="url(#crownGrad)" strokeWidth="1.8" fill="rgba(12, 26, 54, 0.4)" strokeLinejoin="round" />
            {/* Central Scepter Diamond */}
            <polygon points="50,15 54,20 50,25 46,20" stroke="#ffffff" strokeWidth="1.2" fill="#7dd3fc" />
            <polygon points="12,32 15,36 12,40 9,36" stroke="#ffffff" strokeWidth="1" fill="#7dd3fc" />
            <polygon points="88,32 91,36 88,40 85,36" stroke="#ffffff" strokeWidth="1" fill="#7dd3fc" />
            {/* Filigree Arch lines */}
            <path d="M30 52 L50 72 L70 52" stroke="rgba(125, 211, 252, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="50" cy="46" r="4" stroke="#ffffff" strokeWidth="1.2" fill="none" />
            <line x1="50" y1="42" x2="50" y2="50" stroke="#7dd3fc" strokeWidth="1" />
            <line x1="46" y1="46" x2="54" y2="46" stroke="#7dd3fc" strokeWidth="1" />
          </svg>
        );

      case 'aerospace':
        // Celestial Astrolabe: Concentric coordinate rings, graduated rete, pointer teeth, orbital ellipse
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor">
            <defs>
              <linearGradient id="astroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            {/* Outer Suspension Ring */}
            <circle cx="50" cy="12" r="6" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="50" cy="12" r="3" stroke="#7dd3fc" strokeWidth="1" />
            {/* Outer Limb with graduation marks */}
            <circle cx="50" cy="54" r="38" stroke="url(#astroGrad)" strokeWidth="2" />
            <circle cx="50" cy="54" r="34" stroke="rgba(125, 211, 252, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
            {/* Eccentric Zodiac/Ecliptic Ring */}
            <ellipse cx="50" cy="50" rx="26" ry="20" transform="rotate(-25 50 50)" stroke="#ffffff" strokeWidth="1.2" fill="rgba(8, 20, 48, 0.3)" />
            {/* Coordinate Crosshairs */}
            <line x1="50" y1="16" x2="50" y2="92" stroke="rgba(248, 250, 252, 0.3)" strokeWidth="1" />
            <line x1="12" y1="54" x2="88" y2="54" stroke="rgba(248, 250, 252, 0.3)" strokeWidth="1" />
            {/* Rete Pointer Stars */}
            <circle cx="34" cy="42" r="1.5" fill="#ffffff" />
            <circle cx="66" cy="45" r="1.5" fill="#ffffff" />
            <circle cx="58" cy="68" r="1.5" fill="#38bdf8" />
            <circle cx="40" cy="64" r="1.5" fill="#7dd3fc" />
            {/* Central Pivot Alidade Pin */}
            <circle cx="50" cy="54" r="4" fill="#030712" stroke="#ffffff" strokeWidth="1.5" />
            <polygon points="50,30 52,54 48,54" fill="#38bdf8" opacity="0.8" />
            <polygon points="50,78 52,54 48,54" fill="#7dd3fc" opacity="0.8" />
          </svg>
        );

      case 'systems':
        // Precision Drafting Compass: Calipers, adjustment spindle, radius measure arc
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor">
            <defs>
              <linearGradient id="compassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            {/* Top Adjustment Handle & Pivot Hinge */}
            <circle cx="50" cy="14" r="5" stroke="#ffffff" strokeWidth="1.5" fill="rgba(12, 26, 54, 0.8)" />
            <circle cx="50" cy="14" r="2" fill="#7dd3fc" />
            <line x1="50" y1="9" x2="50" y2="5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            {/* Compass Legs */}
            <path d="M48 18 L24 85 L22 88" stroke="url(#compassGrad)" strokeWidth="2" strokeLinecap="round" />
            <path d="M52 18 L76 85 L78 88" stroke="url(#compassGrad)" strokeWidth="2" strokeLinecap="round" />
            {/* Left Needle & Right Pencil Lead Points */}
            <circle cx="22" cy="88" r="1.5" fill="#ffffff" />
            <polygon points="78,88 76,84 80,84" fill="#7dd3fc" />
            {/* Central Spindle Screw & Knurled Nut */}
            <line x1="33" y1="46" x2="67" y2="46" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="47" y="42" width="6" height="8" rx="1" fill="#030712" stroke="#7dd3fc" strokeWidth="1.2" />
            {/* Radius Sector Arc */}
            <path d="M30 58 A 35 35 0 0 0 70 58" stroke="rgba(125, 211, 252, 0.5)" strokeWidth="1" strokeDasharray="2 3" />
            {/* Metric scale ticks */}
            <line x1="42" y1="62" x2="42" y2="65" stroke="#ffffff" strokeWidth="1" />
            <line x1="50" y1="63" x2="50" y2="67" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="58" y1="62" x2="58" y2="65" stroke="#ffffff" strokeWidth="1" />
          </svg>
        );

      case 'cryptographic':
        // Diamond Crest: Faceted brilliant-cut diamond, hexagonal security shield, node mesh
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor">
            <defs>
              <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
            {/* Outer Hexagonal Security Boundary */}
            <polygon points="50,8 86,28 86,72 50,92 14,72 14,28" stroke="url(#crestGrad)" strokeWidth="1.6" fill="rgba(5, 11, 24, 0.6)" strokeLinejoin="round" />
            {/* Inner Faceted Diamond Polyhedron */}
            <polygon points="50,22 74,38 50,78 26,38" stroke="#ffffff" strokeWidth="1.4" fill="rgba(12, 26, 54, 0.4)" />
            {/* Diamond Table & Pavilion Facets */}
            <line x1="36" y1="38" x2="64" y2="38" stroke="#7dd3fc" strokeWidth="1.2" />
            <line x1="50" y1="22" x2="36" y2="38" stroke="#ffffff" strokeWidth="1" />
            <line x1="50" y1="22" x2="64" y2="38" stroke="#ffffff" strokeWidth="1" />
            <line x1="36" y1="38" x2="50" y2="78" stroke="#7dd3fc" strokeWidth="1.2" />
            <line x1="64" y1="38" x2="50" y2="78" stroke="#7dd3fc" strokeWidth="1.2" />
            {/* Corner Cryptographic Verification Nodes */}
            <circle cx="50" cy="8" r="2.5" fill="#ffffff" />
            <circle cx="86" cy="28" r="2.5" fill="#38bdf8" />
            <circle cx="86" cy="72" r="2.5" fill="#7dd3fc" />
            <circle cx="50" cy="92" r="2.5" fill="#ffffff" />
            <circle cx="14" cy="72" r="2.5" fill="#38bdf8" />
            <circle cx="14" cy="28" r="2.5" fill="#7dd3fc" />
            {/* Central ZKP Verification Point */}
            <circle cx="50" cy="46" r="3" fill="#ffffff" />
            <circle cx="50" cy="46" r="6" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 2" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative py-16 px-4 max-w-7xl mx-auto z-10" id="emblems">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/40 border border-sky-800/40 mb-3">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
          Quadrilateral Discipline Taxonomy
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-platinum-gradient tracking-tight mb-4">
          Thematic Emblems of Synthesis
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
          Vectorized insignias representing foundational theoretical rigor, flight dynamics, high-throughput systems, and verifiable cryptographic primitives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DOSSIER.emblems.map((emblem) => {
          const isSelected = activeEmblem === emblem.id;
          return (
            <div
              key={emblem.id}
              onClick={() => {
                setActiveEmblem(isSelected ? null : emblem.id);
                if (onSelectDomain) {
                  onSelectDomain(emblem.id);
                }
              }}
              className={`group relative cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                isSelected
                  ? 'glass-panel-glow border-sky-400/60 ring-1 ring-sky-400/30 -translate-y-1'
                  : 'glass-panel hover:border-slate-400/30 hover:-translate-y-1'
              }`}
            >
              {/* Subtle Corner Accents */}
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-slate-500/40 group-hover:border-sky-400 transition-colors" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-slate-500/40 group-hover:border-sky-400 transition-colors" />

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5 p-3 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800 group-hover:border-sky-500/50 transition-all duration-300 shadow-lg">
                  {getSvg(emblem.id)}
                </div>

                <div className="text-[11px] font-mono tracking-widest text-sky-400 uppercase mb-1">
                  {emblem.institution}
                </div>

                <h3 className="text-lg font-medium text-slate-100 group-hover:text-white transition-colors mb-2">
                  {emblem.name}
                </h3>

                <p className="text-xs text-sky-200/70 font-mono italic mb-3">
                  "{emblem.latinMotto}"
                </p>

                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {emblem.description}
                </p>

                <div className="mt-4 pt-3 w-full border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="text-slate-500">DISCIPLINE:</span>
                  <span className="text-sky-300">{emblem.discipline}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

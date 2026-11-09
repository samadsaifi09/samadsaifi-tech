import React, { useState, useEffect } from 'react';
import { ShieldCheck, Terminal, Orbit, Menu, X, Brain, Cpu, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audioEngine';

interface Props {
  onOpenAdvisory: () => void;
  onOpenTerminal: () => void;
}

export const HeaderNav: React.FC<Props> = ({ onOpenAdvisory, onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Institutional Branding */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/30 border border-sky-400/40 flex items-center justify-center group-hover:border-sky-400 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <span className="font-mono text-sm font-bold text-white tracking-tighter">SS</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white tracking-tight text-base group-hover:text-sky-300 transition-colors">
                Samad Saifi <span className="text-sky-300 font-mono text-xs font-normal">pɒlimaθ ✨</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            </div>
            <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              STANFORD · CAMBRIDGE · NASA
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wide text-slate-300">
          <a href="#emblems" className="hover:text-sky-300 transition-colors">
            Discipline Emblems
          </a>
          <a href="#antigravity-sandbox" className="hover:text-sky-300 transition-colors flex items-center gap-1">
            <Orbit className="w-3 h-3 text-sky-400 animate-spin" />
            Antigravity Lab
          </a>
          <a href="#neural-brain" className="hover:text-sky-300 transition-colors flex items-center gap-1">
            <Brain className="w-3 h-3 text-sky-400" />
            Neural Brain
          </a>
          <a href="#interactive-simulators" className="hover:text-sky-300 transition-colors flex items-center gap-1">
            <Cpu className="w-3 h-3 text-emerald-400" />
            Simulators
          </a>
          <a href="#intersections" className="hover:text-sky-300 transition-colors">
            Synthesis Matrix
          </a>
          <a href="#publications-archive" className="hover:text-sky-300 transition-colors">
            Publications
          </a>
          <a href="#provenance" className="hover:text-sky-300 transition-colors">
            Provenance
          </a>
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Direct CV PDF Download */}
          <a
            href="/samad_saifi_polymath_cv.pdf"
            download="Samad_Saifi_Polymath_CV.pdf"
            onClick={() => sound.playBlip(700)}
            className="px-3 py-2 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-sky-400 text-xs font-mono flex items-center gap-1.5 transition-colors"
            title="Download Samad Saifi Polymath CV (PDF)"
          >
            <span className="text-sky-400 font-bold">CV</span>
            <span className="text-[10px] text-slate-400 uppercase">PDF</span>
          </a>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-xl glass-panel transition-colors ${
              isMuted ? 'text-slate-500 hover:text-slate-300' : 'text-emerald-400 border-emerald-500/50'
            }`}
            title="Toggle Procedural Synthesizer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              sound.playBlip(750);
              onOpenTerminal();
            }}
            className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-sky-400 transition-colors"
            title="Open CLI Terminal"
          >
            <Terminal className="w-4 h-4 text-sky-400" />
          </button>

          {/* Advisory / PGP */}
          <button
            onClick={() => {
              sound.playBlip(650);
              onOpenAdvisory();
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500/20 to-blue-600/30 border border-sky-400/50 hover:border-sky-300 text-sky-200 hover:text-white text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all hover:scale-105"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Advisory & PGP</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl glass-panel text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-3 text-sm font-mono">
            <a
              href="#emblems"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-sky-300"
            >
              Discipline Emblems
            </a>
            <a
              href="#antigravity-sandbox"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-sky-300 flex items-center gap-2"
            >
              <Orbit className="w-4 h-4 text-sky-400" />
              Antigravity Physics Lab
            </a>
            <a
              href="#neural-brain"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-sky-300 flex items-center gap-2"
            >
              <Brain className="w-4 h-4 text-sky-400" />
              Neural Synaptic Brain
            </a>
            <a
              href="#interactive-simulators"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-sky-300 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              Live Research Simulators
            </a>
            <a
              href="#intersections"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-sky-300"
            >
              Domain Intersection Matrix
            </a>
            <a
              href="#publications-archive"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-sky-300"
            >
              Publications Archive
            </a>
            <a
              href="#provenance"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-sky-300"
            >
              Provenance & Timeline
            </a>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="/samad_saifi_polymath_cv.pdf"
              download="Samad_Saifi_Polymath_CV.pdf"
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sky-300 font-mono text-xs flex items-center justify-center gap-2"
            >
              <span>Download Polymath CV (PDF)</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdvisory();
              }}
              className="w-full py-2.5 rounded-xl bg-sky-500 text-white font-mono text-xs flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Institutional Advisory / PGP</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

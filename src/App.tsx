import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { ThreeConstellation } from './components/ThreeConstellation';
import { DisciplineEmblems } from './components/DisciplineEmblems';
import { AntigravityPhysicsCanvas } from './components/AntigravityPhysicsCanvas';
import { NeuralSynapseGraph } from './components/NeuralSynapseGraph';
import { InteractiveSimulators } from './components/InteractiveSimulators';
import { DomainIntersectionMatrix } from './components/DomainIntersectionMatrix';
import { PublicationsDrawer } from './components/PublicationsDrawer';
import { ProvenanceTimeline } from './components/ProvenanceTimeline';
import { TerminalCLI } from './components/TerminalCLI';
import { AdvisoryModal } from './components/AdvisoryModal';
import { ParticleCursor } from './components/ParticleCursor';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { sound } from './utils/audioEngine';

export const App: React.FC = () => {
  const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);
  const [highlightPubId, setHighlightPubId] = useState<string | null>(null);

  // Guarantee page starts at top on initial load
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // Global hotkeys
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        sound.toggleMute();
      } else if (e.key === 't' || e.key === 'T') {
        handleScrollToTerminal();
      } else if (e.key === 'a' || e.key === 'A') {
        const el = document.getElementById('antigravity-sandbox');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'b' || e.key === 'B') {
        const el = document.getElementById('neural-brain');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'Escape') {
        setIsAdvisoryModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleOpenPublication = (pubId: string) => {
    sound.playBlip(720);
    setHighlightPubId(pubId);
    const pubElement = document.getElementById('publications-archive');
    if (pubElement) {
      pubElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTerminal = () => {
    sound.playBlip(800);
    const el = document.getElementById('terminal-cli');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-sky-500/30 selection:text-white font-sans antialiased overflow-x-hidden">
        {/* Dynamic Celestial Particle Spark Reticle Cursor */}
        <ParticleCursor />

        {/* Header Navigation */}
        <HeaderNav
          onOpenAdvisory={() => setIsAdvisoryModalOpen(true)}
          onOpenTerminal={handleScrollToTerminal}
        />

        <main>
          {/* 1. 3D WebGL Multi-Manifold Constellation Hero Canvas */}
          <ThreeConstellation />

          {/* 2. Vector Emblems of Discipline Synthesis */}
          <DisciplineEmblems />

          {/* 3. Antigravity Physics Simulation Canvas (Google Antigravity mode) */}
          <AntigravityPhysicsCanvas />

          {/* 4. Interactive Neural Synaptic Brain Map */}
          <NeuralSynapseGraph />

          {/* 5. Live Research Laboratories & Simulators (zk-SNARK & Aerospace ADCS) */}
          <InteractiveSimulators />

          {/* 6. Non-Linear Interdisciplinary Domain Intersection Matrix */}
          <DomainIntersectionMatrix onOpenPublication={handleOpenPublication} />

          {/* 7. Peer-Reviewed Publications & Technical Archive */}
          <PublicationsDrawer highlightId={highlightPubId} />

          {/* 8. Concurrent Branching Provenance & Academic Credentials */}
          <ProvenanceTimeline />

          {/* 9. Retro-Futuristic CLI Terminal */}
          <TerminalCLI
            onOpenAdvisoryModal={() => setIsAdvisoryModalOpen(true)}
          />
        </main>

        {/* Institutional Advisory & Verifiable PGP Modal Drawer */}
        <AdvisoryModal
          isOpen={isAdvisoryModalOpen}
          onClose={() => setIsAdvisoryModalOpen(false)}
        />

        {/* Prestige Footer with Cat Symbol & ASJ and Maanu tribute */}
        <Footer onOpenAdvisory={() => setIsAdvisoryModalOpen(true)} />
      </div>
    </ErrorBoundary>
  );
};

export default App;

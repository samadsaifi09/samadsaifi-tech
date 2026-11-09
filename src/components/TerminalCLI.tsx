import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, Trash2, HelpCircle } from 'lucide-react';
import { DOSSIER } from '../data/dossier';
import { sound } from '../utils/audioEngine';

interface Props {
  onTriggerPhysics?: (mode: 'zero-g' | 'black-hole' | 'earth') => void;
  onOpenAdvisoryModal?: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  time: string;
}

export const TerminalCLI: React.FC<Props> = ({ onTriggerPhysics, onOpenAdvisoryModal }) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'welcome-0',
      command: 'sys.init --verbose',
      time: '16:25:37',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-sky-400 font-bold">
            POLYMATH CORE TERMINAL OS v5.2 // STANFORD HAI & CAMBRIDGE ARCHIVE
          </p>
          <p className="text-slate-400 text-xs">
            Type <span className="text-sky-300 font-mono font-bold">help</span> to view available operations, or try <span className="text-sky-300 font-mono font-bold">whoami</span>, <span className="text-sky-300 font-mono font-bold">domains</span>, <span className="text-sky-300 font-mono font-bold">publications</span>, <span className="text-sky-300 font-mono font-bold">antigravity pull</span>.
          </p>
        </div>
      ),
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;
    sound.playBlip(780, 0.05);

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const now = new Date().toTimeString().split(' ')[0];

    let outputNode: React.ReactNode;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-sky-400 font-bold">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-slate-300">
              <div><strong className="text-sky-300 font-mono">whoami</strong> - Executive polymath identity & appointments</div>
              <div><strong className="text-sky-300 font-mono">domains</strong> - Core technical pillars & specializations</div>
              <div><strong className="text-sky-300 font-mono">skills</strong> - Detailed stack (CS224N, ADCS, ZKP, AOSP)</div>
              <div><strong className="text-sky-300 font-mono">affiliations</strong> - Concurrent academic & research tenure</div>
              <div><strong className="text-sky-300 font-mono">publications</strong> - Indexed papers & BibTeX citations</div>
              <div><strong className="text-sky-300 font-mono">cv</strong> - Download official Polymath CV (PDF)</div>
              <div><strong className="text-sky-300 font-mono">antigravity &lt;on|off|pull&gt;</strong> - Kinetic physics engine control</div>
              <div><strong className="text-sky-300 font-mono">contact</strong> - Institutional advisory & PGP verification</div>
              <div><strong className="text-sky-300 font-mono">clear</strong> - Flush the terminal buffer</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-sky-400 font-bold">IDENTITY DOSSIER: SAMAD SAIFI [pɒlimaθ ✨]</p>
            <p className="text-white font-medium">{DOSSIER.profile.title}</p>
            <p className="text-slate-400">Institutional Base: {DOSSIER.profile.affiliation}</p>
            <p className="text-slate-400">Operational Base: {DOSSIER.profile.location}</p>
            <p className="text-slate-300 font-light mt-1">{DOSSIER.profile.bio}</p>
          </div>
        );
        break;

      case 'domains':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-sky-400 font-bold">CORE POLYMATH PILLARS:</p>
            {DOSSIER.pillars.map((pillar, i) => (
              <div key={i} className="border-l-2 border-sky-500/50 pl-3">
                <span className="text-white font-medium">{pillar.category}</span>
                <span className="text-slate-500 text-[10px] ml-2">({pillar.leadRole})</span>
                <p className="text-slate-400 text-[11px] mt-0.5">{pillar.technologies.join(' · ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-sky-400 font-bold">SPECIALIZED TECHNICAL RIGOR:</p>
            <div className="space-y-1">
              <p><strong className="text-sky-300">AI / Foundation:</strong> CS224N Deep NLP, BPE pipelines, Decoder layer tuning, Kinematic RLHF</p>
              <p><strong className="text-sky-300">Aerospace:</strong> Satellite ADCS, LEO/GEO mechanics, Flight control loops, ISRO remote sensing</p>
              <p><strong className="text-sky-300">Systems & OS:</strong> AOSP Custom ROMs (Evolution X, PixelOS), Linux kernel EAS, GPU Direct Storage</p>
              <p><strong className="text-sky-300">Cryptography:</strong> zk-SNARKs for verifiable ML, MPC sharding, trustless agent swarms</p>
              <p><strong className="text-sky-300">Languages:</strong> Sumerian (Bilingual Mastery), English, Hindi, Chinese, Japanese, Russian</p>
            </div>
          </div>
        );
        break;

      case 'affiliations':
        outputNode = (
          <div className="space-y-2 text-xs text-slate-300">
            <p className="text-sky-400 font-bold">CONCURRENT PROVENANCE & AFFILIATIONS:</p>
            {DOSSIER.experiences.map((exp, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-sky-400 font-mono">[{exp.period}]</span>
                <span>
                  <strong className="text-white">{exp.role}</strong> — <span className="text-sky-200">{exp.organization}</span>
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'publications':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-sky-400 font-bold">SCHOLARLY PUBLICATIONS ARCHIVE:</p>
            {DOSSIER.publications.map((pub, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <p className="text-white font-medium">{idx + 1}. {pub.title}</p>
                <p className="text-slate-400 text-[11px] mt-0.5">{pub.venue} ({pub.year}) · {pub.doi || pub.arxiv}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'cv':
      case 'pdf':
      case 'resume':
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-sky-400 font-bold">POLYMATH CURRICULUM VITAE (PDF):</p>
            <p className="text-white">Official 3-page comprehensive dossier compiled and verified.</p>
            <div className="pt-1">
              <a
                href="/samad_saifi_polymath_cv.pdf"
                download="Samad_Saifi_Polymath_CV.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 border border-sky-400 text-sky-300 hover:text-white hover:bg-sky-500 transition-colors font-mono font-bold"
              >
                <span>Download samad_saifi_polymath_cv.pdf</span>
                <span>(178 KB) ↓</span>
              </a>
            </div>
            <p className="text-[11px] text-slate-500">File location: public/samad_saifi_polymath_cv.pdf</p>
          </div>
        );
        break;

      case 'antigravity':
        const sub = args[0]?.toLowerCase();
        if (sub === 'on') {
          if (onTriggerPhysics) onTriggerPhysics('zero-g');
          outputNode = <p className="text-emerald-400">Antigravity zero-g mode ENGAGED. Viewport gravity g = 0 m/s².</p>;
        } else if (sub === 'off') {
          if (onTriggerPhysics) onTriggerPhysics('earth');
          outputNode = <p className="text-amber-400">Earth gravity (9.8 m/s²) RESTORED. Elements tumbling to base plane.</p>;
        } else if (sub === 'pull') {
          if (onTriggerPhysics) onTriggerPhysics('black-hole');
          outputNode = <p className="text-sky-400 font-bold">Black hole singularity INITIATED. Newtonian centripetal pull active.</p>;
        } else {
          outputNode = (
            <p className="text-amber-400 text-xs">
              Usage: <code className="text-white">antigravity &lt;on | off | pull&gt;</code>
            </p>
          );
        }
        break;

      case 'contact':
        if (onOpenAdvisoryModal) onOpenAdvisoryModal();
        outputNode = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-sky-400 font-bold">INSTITUTIONAL ADVISORY ROUTING:</p>
            <p className="text-white">Modal drawer opened. Verifiable PGP Fingerprint:</p>
            <pre className="p-2 bg-slate-950 font-mono text-[11px] text-sky-300 rounded border border-slate-800">
              {DOSSIER.pgpKey.fingerprint}
            </pre>
            <p className="text-emerald-400">RSA 4096-bit Verified (Stanford HAI / Institutional Keyring)</p>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        return;

      default:
        outputNode = (
          <p className="text-rose-400 text-xs">
            command not found: {cmd}. Type <span className="text-sky-300 font-mono">help</span> for valid commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        time: now,
        output: outputNode,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKeyboardClick();
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInputVal(history[history.length - 1 - nextIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(history[history.length - 1 - nextIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const valid = ['help', 'whoami', 'domains', 'skills', 'affiliations', 'publications', 'cv', 'pdf', 'antigravity', 'contact', 'clear'];
      const match = valid.find((c) => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <section className="relative py-16 px-4 max-w-7xl mx-auto z-10" id="terminal-cli">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/40 border border-sky-800/40 mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            Direct Kernel Console
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-platinum-gradient tracking-tight">
            Interactive Retro-Futuristic CLI
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-light mt-1">
            Query the polymath knowledge base via a simulated UNIX terminal shell with tab autocompletion and physics triggers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => executeCommand('help')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-300 hover:text-white flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>help</span>
          </button>
          <button
            onClick={() => setLogs([])}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>clear</span>
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Window Box */}
      <div
        className={`glass-panel rounded-2xl border border-sky-950/80 shadow-2xl overflow-hidden font-mono text-xs transition-all duration-300 ${
          isExpanded ? 'h-[650px]' : 'h-[440px]'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Titlebar */}
        <div className="bg-slate-950/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40 inline-block" />
            <span className="text-slate-400 text-[11px] ml-2">guest@polymath-shell: ~ (x86_64-apple-darwin)</span>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>TTY-1 ACTIVE</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div ref={terminalBodyRef} className="p-4 overflow-y-auto h-[calc(100%-80px)] space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-sky-400 font-bold">guest@polymath:~$</span>
                <span className="text-white">{log.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{log.time}</span>
              </div>
              <div className="pl-4 border-l border-slate-800 text-slate-200">
                {log.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex items-center gap-2">
          <span className="text-sky-400 font-bold select-none">guest@polymath:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="w-2 h-4 bg-sky-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

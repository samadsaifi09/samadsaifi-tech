import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../utils/audioEngine';
import { Brain, RotateCcw, Search } from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  category: 'core' | 'pillar' | 'institution' | 'artifact';
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  connections: string[];
  description: string;
}

interface Pulse {
  fromId: string;
  toId: string;
  progress: number;
  speed: number;
  color: string;
}

const RAW_NODES: Omit<GraphNode, 'x' | 'y' | 'vx' | 'vy'>[] = [
  {
    id: 'core',
    label: 'Samad Saifi',
    category: 'core',
    radius: 28,
    color: '#ffffff',
    connections: ['ai', 'aero', 'systems', 'zk', 'stanford', 'cambridge'],
    description: 'Central Polymath Nexus: Interdisciplinary AI Fellow & Systems Architect.',
  },
  // Pillars
  {
    id: 'ai',
    label: 'AI Alignment & Safety',
    category: 'pillar',
    radius: 18,
    color: '#38bdf8',
    connections: ['stanford', 'openai', 'rlhf', 'cs224n', 'pub-embodied'],
    description: 'Kinematic RLHF, human agency, and foundation model safety envelopes.',
  },
  {
    id: 'aero',
    label: 'Aerospace Telemetry',
    category: 'pillar',
    radius: 18,
    color: '#0ea5e9',
    connections: ['nasa', 'isro', 'adcs', 'rlhf'],
    description: 'Autonomous flight control loops, attitude determination, and satellite mechanics.',
  },
  {
    id: 'systems',
    label: 'Distributed Systems & OS',
    category: 'pillar',
    radius: 18,
    color: '#10b981',
    connections: ['nvidia', 'openai', 'aosp', 'bpe', 'mesh'],
    description: 'High-throughput GPU caching, Linux kernel EAS, and AOSP firmware engineering.',
  },
  {
    id: 'zk',
    label: 'Zero-Knowledge Proofs',
    category: 'pillar',
    radius: 18,
    color: '#8b5cf6',
    connections: ['stanford', 'pub-hitl', 'zksnark'],
    description: 'Trustless multi-agent coordination, zk-SNARKs for verifiable ML inference.',
  },
  // Institutions
  {
    id: 'stanford',
    label: 'Stanford HAI & Engineering',
    category: 'institution',
    radius: 16,
    color: '#f43f5e',
    connections: ['cs224n', 'pub-hitl', 'pub-embodied'],
    description: 'Doctoral research fellowship in human-centered AI and agent orchestration.',
  },
  {
    id: 'cambridge',
    label: 'University of Cambridge',
    category: 'institution',
    radius: 16,
    color: '#a855f7',
    connections: ['pub-embodied'],
    description: 'Master of Science (M.Sc.) in Computer Science & distributed algorithms.',
  },
  {
    id: 'nasa',
    label: 'NASA Ames / Flight Systems',
    category: 'institution',
    radius: 16,
    color: '#38bdf8',
    connections: ['adcs'],
    description: 'Autonomous flight systems, trajectory planning, and aerospace telemetry.',
  },
  {
    id: 'openai',
    label: 'OpenAI Foundation Team',
    category: 'institution',
    radius: 16,
    color: '#10b981',
    connections: ['bpe'],
    description: 'Early foundation model engineering, decoder-only transformer layers.',
  },
  {
    id: 'nvidia',
    label: 'NVIDIA GPU Acceleration',
    category: 'institution',
    radius: 16,
    color: '#22c55e',
    connections: ['systems'],
    description: 'Distributed data ingestion, I/O caching, and zero-starvation GPU orchestration.',
  },
  {
    id: 'isro',
    label: 'ISRO (IIRS)',
    category: 'institution',
    radius: 14,
    color: '#06b6d4',
    connections: ['adcs'],
    description: 'Satellite remote sensing, LEO/GEO orbital mechanics, and multispectral telemetry.',
  },
  // Technologies & Artifacts
  {
    id: 'rlhf',
    label: 'Kinematic RLHF',
    category: 'artifact',
    radius: 12,
    color: '#fbbf24',
    connections: ['pub-embodied'],
    description: 'Translating human preference reward models into continuous robotic control.',
  },
  {
    id: 'cs224n',
    label: 'CS224N Deep NLP',
    category: 'artifact',
    radius: 12,
    color: '#7dd3fc',
    connections: [],
    description: 'Stanford doctoral curriculum: transformer architectures and sequence learning.',
  },
  {
    id: 'adcs',
    label: 'Satellite ADCS Loops',
    category: 'artifact',
    radius: 12,
    color: '#38bdf8',
    connections: [],
    description: 'Attitude Determination & Control System Kalman filtering and reaction wheel torques.',
  },
  {
    id: 'bpe',
    label: 'High-Throughput BPE',
    category: 'artifact',
    radius: 12,
    color: '#34d399',
    connections: [],
    description: 'Scalable data tokenization streaming across multi-thousand GPU node clusters.',
  },
  {
    id: 'aosp',
    label: 'AOSP & PixelOS Kernel',
    category: 'artifact',
    radius: 12,
    color: '#14b8a6',
    connections: ['mesh'],
    description: 'Custom Android ROM development, governor frequency tuning, and low-latency IPC.',
  },
  {
    id: 'zksnark',
    label: 'zk-SNARK Circuits',
    category: 'artifact',
    radius: 12,
    color: '#c084fc',
    connections: ['pub-hitl'],
    description: 'Succinct non-interactive zero-knowledge proofs for verifiable model inferences.',
  },
  {
    id: 'mesh',
    label: 'PM-WANI Mesh Nodes',
    category: 'artifact',
    radius: 12,
    color: '#eab308',
    connections: ['pub-hitl'],
    description: 'Decentralized captive wireless mesh network topologies and routing protocols.',
  },
  {
    id: 'pub-hitl',
    label: 'Human-in-the-Loop Mesh Paper',
    category: 'artifact',
    radius: 14,
    color: '#38bdf8',
    connections: [],
    description: 'Stanford HAI published paper on real-time human arbitration layers in multi-cloud mesh.',
  },
  {
    id: 'pub-embodied',
    label: 'Embodied Alignment Paper',
    category: 'artifact',
    radius: 14,
    color: '#f59e0b',
    connections: [],
    description: 'Stanford/Cambridge research extending RLHF to continuous physical control loops.',
  },
];

export const NeuralSynapseGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [synapseCount, setSynapseCount] = useState<number>(0);

  const nodesRef = useRef<GraphNode[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const draggedNodeRef = useRef<GraphNode | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = (canvas.width = container.clientWidth || 900);
    let height = (canvas.height = 560);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize node positions in a radial organic cluster
    const centerX = width / 2;
    const centerY = height / 2;

    const initialNodes: GraphNode[] = RAW_NODES.map((raw, idx) => {
      const angle = (idx / RAW_NODES.length) * Math.PI * 2;
      const dist = raw.category === 'core' ? 0 : raw.category === 'pillar' ? 120 : raw.category === 'institution' ? 200 : 250;
      return {
        ...raw,
        x: centerX + Math.cos(angle) * dist + (Math.random() - 0.5) * 30,
        y: centerY + Math.sin(angle) * dist + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      };
    });

    nodesRef.current = initialNodes;

    // Count edges
    let totalConnections = 0;
    initialNodes.forEach((n) => (totalConnections += n.connections.length));
    setSynapseCount(totalConnections);

    // Initial action potential pulses
    pulsesRef.current = [
      { fromId: 'core', toId: 'ai', progress: 0.1, speed: 0.015, color: '#38bdf8' },
      { fromId: 'ai', toId: 'rlhf', progress: 0.5, speed: 0.012, color: '#fbbf24' },
      { fromId: 'core', toId: 'systems', progress: 0.3, speed: 0.018, color: '#10b981' },
      { fromId: 'systems', toId: 'nvidia', progress: 0.7, speed: 0.014, color: '#22c55e' },
      { fromId: 'core', toId: 'zk', progress: 0.4, speed: 0.016, color: '#8b5cf6' },
      { fromId: 'zk', toId: 'zksnark', progress: 0.2, speed: 0.013, color: '#c084fc' },
      { fromId: 'core', toId: 'aero', progress: 0.6, speed: 0.015, color: '#0ea5e9' },
      { fromId: 'aero', toId: 'nasa', progress: 0.8, speed: 0.014, color: '#38bdf8' },
    ];

    // Mouse drag handlers
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };

      const clicked = nodesRef.current.find((n) => {
        const dx = n.x - x;
        const dy = n.y - y;
        return Math.sqrt(dx * dx + dy * dy) < n.radius + 6;
      });

      if (clicked) {
        draggedNodeRef.current = clicked;
        setSelectedNode(clicked);
        sound.playBlip(750, 0.08);

        // Spawn a pulse from clicked node
        if (clicked.connections.length > 0) {
          const target = clicked.connections[Math.floor(Math.random() * clicked.connections.length)];
          pulsesRef.current.push({
            fromId: clicked.id,
            toId: target,
            progress: 0,
            speed: 0.02,
            color: clicked.color,
          });
        }
      } else {
        setSelectedNode(null);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };

      if (draggedNodeRef.current) {
        draggedNodeRef.current.x = x;
        draggedNodeRef.current.y = y;
        draggedNodeRef.current.vx = 0;
        draggedNodeRef.current.vy = 0;
      }
    };

    const handleMouseUp = () => {
      draggedNodeRef.current = null;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Physics Animation & Neural Synapse Loop
    let animationId: number;

    const render = () => {
      animationId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Draw faint cybernetic coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const nodes = nodesRef.current;
      const nodeMap = new Map<string, GraphNode>();
      nodes.forEach((n) => nodeMap.set(n.id, n));

      // 1. Force-Directed Physics Step
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        if (n1 === draggedNodeRef.current) continue;

        // Gravitational spring toward center
        const dxCenter = centerX - n1.x;
        const dyCenter = centerY - n1.y;
        n1.vx += dxCenter * 0.0006;
        n1.vy += dyCenter * 0.0006;

        // Node-node Coulomb repulsion
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy || 1;
          const dist = Math.sqrt(distSq);

          if (dist < 220) {
            const force = (220 - dist) / 220;
            const fx = (dx / dist) * force * 0.45;
            const fy = (dy / dist) * force * 0.45;

            n1.vx -= fx;
            n1.vy -= fy;
            if (n2 !== draggedNodeRef.current) {
              n2.vx += fx;
              n2.vy += fy;
            }
          }
        }

        // Spring attraction along connections
        n1.connections.forEach((targetId) => {
          const n2 = nodeMap.get(targetId);
          if (!n2) return;
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const targetDist = 110;
          const diff = dist - targetDist;
          const force = diff * 0.003;

          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          n1.vx += fx;
          n1.vy += fy;
          if (n2 !== draggedNodeRef.current) {
            n2.vx -= fx;
            n2.vy -= fy;
          }
        });

        // Damping and position update
        n1.vx *= 0.88;
        n1.vy *= 0.88;
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Boundary containment
        const padding = n1.radius + 15;
        if (n1.x < padding) { n1.x = padding; n1.vx *= -0.5; }
        if (n1.x > width - padding) { n1.x = width - padding; n1.vx *= -0.5; }
        if (n1.y < padding) { n1.y = padding; n1.vy *= -0.5; }
        if (n1.y > height - padding) { n1.y = height - padding; n1.vy *= -0.5; }
      }

      // 2. Render Synaptic Axon Connections
      nodes.forEach((n1) => {
        n1.connections.forEach((targetId) => {
          const n2 = nodeMap.get(targetId);
          if (!n2) return;

          const isConnectedToSelected =
            selectedNode && (selectedNode.id === n1.id || selectedNode.id === n2.id);

          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = isConnectedToSelected
            ? 'rgba(56, 189, 248, 0.7)'
            : 'rgba(125, 211, 252, 0.14)';
          ctx.lineWidth = isConnectedToSelected ? 2 : 1;
          ctx.stroke();
        });
      });

      // 3. Update & Render Firing Action Potentials (Pulses)
      pulsesRef.current = pulsesRef.current
        .map((p) => ({
          ...p,
          progress: p.progress + p.speed,
        }))
        .filter((p) => p.progress <= 1);

      // Randomly spawn continuous background pulses
      if (Math.random() < 0.08 && pulsesRef.current.length < 20) {
        const randomSource = nodes[Math.floor(Math.random() * nodes.length)];
        if (randomSource && randomSource.connections.length > 0) {
          const randomTarget = randomSource.connections[Math.floor(Math.random() * randomSource.connections.length)];
          pulsesRef.current.push({
            fromId: randomSource.id,
            toId: randomTarget,
            progress: 0,
            speed: 0.012 + Math.random() * 0.015,
            color: randomSource.color,
          });
        }
      }

      pulsesRef.current.forEach((p) => {
        const n1 = nodeMap.get(p.fromId);
        const n2 = nodeMap.get(p.toId);
        if (!n1 || !n2) return;

        const pulseX = n1.x + (n2.x - n1.x) * p.progress;
        const pulseY = n1.y + (n2.y - n1.y) * p.progress;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Render Neural Nodes
      nodes.forEach((n) => {
        const isSelected = selectedNode?.id === n.id;
        const isHovered =
          Math.sqrt((n.x - mouseRef.current.x) ** 2 + (n.y - mouseRef.current.y) ** 2) < n.radius + 4;
        const matchesSearch =
          searchQuery && n.label.toLowerCase().includes(searchQuery.toLowerCase());

        // Outer glow
        if (isSelected || isHovered || matchesSearch) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 2;
          ctx.shadowColor = n.color;
          ctx.shadowBlur = 15;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Node fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#ffffff' : 'rgba(12, 26, 54, 0.9)';
        ctx.fill();
        ctx.strokeStyle = n.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node Label
        ctx.fillStyle = isSelected ? '#030712' : '#ffffff';
        ctx.font = '600 9.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.label, n.x, n.y);
      });
    };

    render();

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = 560;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [searchQuery]);

  const resetPositions = () => {
    sound.playLaser();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    nodesRef.current.forEach((n, idx) => {
      const angle = (idx / nodesRef.current.length) * Math.PI * 2;
      const dist = n.category === 'core' ? 0 : 150;
      n.x = centerX + Math.cos(angle) * dist;
      n.y = centerY + Math.sin(angle) * dist;
      n.vx = 0;
      n.vy = 0;
    });
  };

  return (
    <section className="relative py-20 px-4 max-w-7xl mx-auto z-10" id="neural-brain">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/40 border border-sky-800/40 mb-3">
            <Brain className="w-3.5 h-3.5 animate-pulse text-sky-400" />
            Active Polymath Synaptic Map
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-platinum-gradient tracking-tight">
            Neural Synaptic Brain
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl">
            Live biological force-directed graph with real-time axon action potentials. Drag nodes, trigger synaptic pulses, and explore how AI, aerospace, and kernel optimization interconnect.
          </p>
        </div>

        {/* Toolbar & Search */}
        <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search synapses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>

          <button
            onClick={resetPositions}
            className="p-2 rounded-xl glass-panel text-slate-400 hover:text-white hover:border-sky-400 transition-colors"
            title="Reset Synaptic Positions"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Box */}
      <div
        ref={containerRef}
        className="relative w-full h-[560px] rounded-2xl glass-panel-glow border border-sky-950/80 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Floating Selected Node Drawer */}
        {selectedNode && (
          <div className="absolute top-4 right-4 z-20 glass-panel p-4 rounded-xl border border-sky-400/50 max-w-sm text-xs font-mono backdrop-blur-xl animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-sky-400 uppercase tracking-widest">
                SYNAPSE NODE // {selectedNode.category.toUpperCase()}
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <h4 className="text-base font-bold text-white mb-1">
              {selectedNode.label}
            </h4>

            <p className="text-xs text-slate-300 font-light mb-3 leading-relaxed">
              {selectedNode.description}
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>CONNECTED AXONS:</span>
              <span className="text-sky-300 font-bold">{selectedNode.connections.length} SYNAPSES</span>
            </div>
          </div>
        )}

        {/* Live HUD Footer */}
        <div className="absolute bottom-4 left-6 pointer-events-none flex items-center gap-4 text-xs font-mono text-slate-500">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            SYNAPTIC POTENTIALS ACTIVE
          </span>
          <span>·</span>
          <span>{RAW_NODES.length} NEURONS</span>
          <span>·</span>
          <span>{synapseCount} AXON EDGES</span>
        </div>
      </div>
    </section>
  );
};

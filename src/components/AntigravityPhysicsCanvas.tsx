import React, { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js';
import { sound } from '../utils/audioEngine';
import { 
  Orbit, 
  Flame, 
  Grid, 
  Maximize2, 
  Sparkles,
  Target,
  Clock
} from 'lucide-react';

export type PhysicsMode = 'zero-g' | 'repulsion' | 'black-hole' | 'earth' | 'grid-snap';

interface PhysicsTag {
  id: string;
  label: string;
  category: string;
  color: string;
  dotColor: string;
  width: number;
  height: number;
  homeX: number;
  homeY: number;
}

const TAG_DEFINITIONS = [
  { label: 'Stanford HAI Fellow', category: 'Academic', color: '#38bdf8', dotColor: '#ffffff' },
  { label: 'OpenAI GPT Transformer Layers', category: 'Foundation Models', color: '#10b981', dotColor: '#34d399' },
  { label: 'NASA Flight Telemetry & ADCS', category: 'Aerospace', color: '#38bdf8', dotColor: '#7dd3fc' },
  { label: 'NVIDIA Distributed GPU I/O', category: 'Systems', color: '#22c55e', dotColor: '#86efac' },
  { label: 'Cambridge M.Sc. Computer Science', category: 'Doctoral / M.Sc.', color: '#a855f7', dotColor: '#c084fc' },
  { label: 'Zero-Knowledge Proofs (zk-SNARKs)', category: 'Cryptography', color: '#6366f1', dotColor: '#818cf8' },
  { label: 'Stanford CS224N Deep NLP', category: 'Deep Learning', color: '#0ea5e9', dotColor: '#38bdf8' },
  { label: 'AOSP Kernel Tuning & Evolution X', category: 'Low-Level OS', color: '#14b8a6', dotColor: '#2dd4bf' },
  { label: 'Kinematic RLHF Robotic Envelopes', category: 'AI Alignment', color: '#f59e0b', dotColor: '#fbbf24' },
  { label: 'ISRO Satellite Telemetry', category: 'Aerospace', color: '#06b6d4', dotColor: '#67e8f9' },
  { label: 'Stanford AI & Web3 Lab', category: 'Decentralized', color: '#8b5cf6', dotColor: '#a78bfa' },
  { label: 'ASU Assistant Professor', category: 'Faculty', color: '#ec4899', dotColor: '#f472b6' },
  { label: 'PM-WANI Mesh Routing Nodes', category: 'Hardware Mesh', color: '#eab308', dotColor: '#fde047' },
  { label: 'High-Throughput BPE Tokenizer', category: 'NLP Architecture', color: '#3b82f6', dotColor: '#60a5fa' },
  { label: 'Explainable AI (XAI) Interfaces', category: 'Human-in-the-Loop', color: '#06b6d4', dotColor: '#22d3ee' },
  { label: 'Clinical Safety Guardrails', category: 'Stanford HAI', color: '#ef4444', dotColor: '#f87171' },
];

export const AntigravityPhysicsCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentMode, setCurrentMode] = useState<PhysicsMode>('zero-g');
  const [timeScale, setTimeScale] = useState<number>(1.0);
  const shockwavesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; opacity: number }[]>([]);
  const [stats, setStats] = useState({
    activeBodies: TAG_DEFINITIONS.length,
    kineticEnergy: '0.00 J',
    gravityConstant: '0.00 m/s²',
    singularityStatus: 'Dormant',
    projectiles: 0,
  });
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // References to Matter engine instances
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<{ body: Matter.Body; tag: PhysicsTag }[]>([]);
  const boundariesRef = useRef<Matter.Body[]>([]);
  const projectilesRef = useRef<Matter.Body[]>([]);
  const mousePosRef = useRef<{ x: number; y: number; isDown: boolean; isRightDown: boolean }>({ x: 0, y: 0, isDown: false, isRightDown: false });
  const slingshotRef = useRef<{ startX: number; startY: number; currentX: number; currentY: number; active: boolean }>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    active: false,
  });
  const isSpacePressedRef = useRef<boolean>(false);
  const modeRef = useRef<PhysicsMode>('zero-g');
  const timeScaleRef = useRef<number>(1.0);

  modeRef.current = currentMode;
  timeScaleRef.current = timeScale;

  const triggerShockwave = useCallback((x: number, y: number) => {
    shockwavesRef.current = [
      ...shockwavesRef.current.slice(-4),
      { x, y, radius: 10, maxRadius: 280, opacity: 0.9 },
    ];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 900;
    let height = 580;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const { Engine, Bodies, Composite, Body } = Matter;
    const engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0.001 },
    });
    engineRef.current = engine;

    // Boundaries
    const wallThickness = 100;
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - 2, width * 2, wallThickness, {
      isStatic: true,
      restitution: 0.65,
      friction: 0.2,
    });
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, {
      isStatic: true,
      restitution: 0.65,
    });
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
      isStatic: true,
      restitution: 0.65,
    });
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
      isStatic: true,
      restitution: 0.65,
    });

    boundariesRef.current = [ground, ceiling, leftWall, rightWall];
    Composite.add(engine.world, boundariesRef.current);

    // Grid slots calculation
    const cols = width > 768 ? 4 : 2;
    const rows = Math.ceil(TAG_DEFINITIONS.length / cols);
    const colWidth = width / cols;
    const rowHeight = (height - 60) / rows;

    const initializedTags: { body: Matter.Body; tag: PhysicsTag }[] = [];

    TAG_DEFINITIONS.forEach((def, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const homeX = colWidth * col + colWidth / 2;
      const homeY = rowHeight * row + rowHeight / 2 + 30;

      const tagWidth = Math.max(160, Math.min(colWidth - 24, def.label.length * 9 + 40));
      const tagHeight = 44;

      const startX = homeX + (Math.random() - 0.5) * 60;
      const startY = homeY + (Math.random() - 0.5) * 60;

      const body = Bodies.rectangle(startX, startY, tagWidth, tagHeight, {
        restitution: 0.75,
        friction: 0.05,
        frictionAir: 0.012,
        density: 0.001,
        chamfer: { radius: 10 },
      });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 1.5,
        y: (Math.random() - 0.5) * 1.5,
      });

      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);

      const tagObj: PhysicsTag = {
        ...def,
        id: `tag-${index}`,
        width: tagWidth,
        height: tagHeight,
        homeX,
        homeY,
      };

      initializedTags.push({ body, tag: tagObj });
    });

    bodiesRef.current = initializedTags;
    Composite.add(
      engine.world,
      initializedTags.map((item) => item.body)
    );

    // Spawn Projectile helper
    const spawnProjectile = (startX: number, startY: number, vx: number, vy: number) => {
      sound.playLaser();
      const orb = Bodies.circle(startX, startY, 9, {
        restitution: 0.9,
        friction: 0.01,
        frictionAir: 0.005,
        density: 0.003,
      });
      Body.setVelocity(orb, { x: vx, y: vy });
      projectilesRef.current.push(orb);
      Composite.add(engine.world, orb);
    };

    // Pointer handlers
    const updateMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePosRef.current.x = x;
      mousePosRef.current.y = y;

      if (slingshotRef.current.active) {
        slingshotRef.current.currentX = x;
        slingshotRef.current.currentY = y;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      updateMousePos(e);
      const { x, y } = mousePosRef.current;

      // Check if right click or shift click for Slingshot launcher
      if (e.button === 2 || e.shiftKey) {
        slingshotRef.current = {
          startX: x,
          startY: y,
          currentX: x,
          currentY: y,
          active: true,
        };
        sound.playBlip(900, 0.04);
        return;
      }

      mousePosRef.current.isDown = true;
      triggerShockwave(x, y);

      // Check badge click
      const clicked = initializedTags.find((item) => {
        const dx = Math.abs(item.body.position.x - x);
        const dy = Math.abs(item.body.position.y - y);
        return dx < item.tag.width / 2 && dy < item.tag.height / 2;
      });

      if (clicked) {
        setSelectedTag(clicked.tag.label);
        sound.playBlip(720, 0.06);
      } else {
        setSelectedTag(null);
      }

      if (modeRef.current === 'repulsion') {
        sound.playShockwave();
        applyRepulsion(x, y, 20);
      } else {
        sound.playSingularity(true);
      }
    };

    const handleMouseUp = () => {
      if (slingshotRef.current.active) {
        const { startX, startY, currentX, currentY } = slingshotRef.current;
        const dx = startX - currentX;
        const dy = startY - currentY;
        const speedMultiplier = 0.18;
        spawnProjectile(startX, startY, dx * speedMultiplier, dy * speedMultiplier);
        slingshotRef.current.active = false;
      }

      mousePosRef.current.isDown = false;
      sound.playSingularity(false);
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // prevent default right-click context menu to allow slingshot
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePressedRef.current = true;
        sound.playSingularity(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePressedRef.current = false;
        sound.playSingularity(false);
      }
    };

    canvas.addEventListener('mousemove', updateMousePos);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const applyRepulsion = (sourceX: number, sourceY: number, strength: number) => {
      initializedTags.forEach(({ body }) => {
        const dx = body.position.x - sourceX;
        const dy = body.position.y - sourceY;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        if (dist < 340 && dist > 1) {
          const forceMag = (strength * (340 - dist)) / (340 * body.mass * 75);
          Body.applyForce(body, body.position, {
            x: (dx / dist) * forceMag,
            y: (dy / dist) * forceMag,
          });
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
        }
      });
    };

    // Render & Physics Loop
    let animationId: number;
    let shockwaveList: { x: number; y: number; radius: number; maxRadius: number; opacity: number }[] = [];

    const renderLoop = () => {
      animationId = requestAnimationFrame(renderLoop);

      const mode = modeRef.current;
      const scale = timeScaleRef.current;
      const { x: mx, y: my, isDown } = mousePosRef.current;
      const isBlackHoleActive = mode === 'black-hole' || isDown || isSpacePressedRef.current;

      if (mode === 'earth') {
        engine.gravity.y = 1.0;
        engine.gravity.x = 0;
      } else {
        engine.gravity.y = 0;
        engine.gravity.x = 0;
      }

      let totalEnergy = 0;

      // Update badges
      initializedTags.forEach(({ body, tag }) => {
        const speedSq = body.velocity.x * body.velocity.x + body.velocity.y * body.velocity.y;
        totalEnergy += 0.5 * body.mass * speedSq;

        // Grid Snap Mode
        if (mode === 'grid-snap') {
          const dx = tag.homeX - body.position.x;
          const dy = tag.homeY - body.position.y;
          const springK = 0.0035;
          const dampingC = 0.08;
          const fx = dx * springK - body.velocity.x * dampingC;
          const fy = dy * springK - body.velocity.y * dampingC;

          Body.applyForce(body, body.position, { x: fx, y: fy });
          Body.setAngle(body, body.angle * 0.92);
          Body.setAngularVelocity(body, body.angularVelocity * 0.85);
        }

        // Black Hole Singularity
        if (isBlackHoleActive && mx > 0 && my > 0 && mx < width && my < height) {
          const dx = mx - body.position.x;
          const dy = my - body.position.y;
          const distSq = Math.max(dx * dx + dy * dy, 400);
          const dist = Math.sqrt(distSq);

          const G = 1900;
          const forceMagnitude = (G * body.mass) / distSq;

          const normalX = dx / dist;
          const normalY = dy / dist;
          const tangentX = -normalY * 0.4;
          const tangentY = normalX * 0.4;

          Body.applyForce(body, body.position, {
            x: (normalX + tangentX) * forceMagnitude * 0.0008,
            y: (normalY + tangentY) * forceMagnitude * 0.0008,
          });

          Body.setAngularVelocity(body, body.angularVelocity + 0.003);
        }

        // Repulsion
        if (mode === 'repulsion' && mx > 0 && my > 0) {
          const dx = body.position.x - mx;
          const dy = body.position.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 1) {
            const push = (180 - dist) / 180;
            Body.applyForce(body, body.position, {
              x: (dx / dist) * push * 0.004,
              y: (dy / dist) * push * 0.004,
            });
          }
        }
      });

      // Update Engine with timeScale
      Engine.update(engine, (1000 / 60) * scale);

      // Canvas Rendering
      ctx.clearRect(0, 0, width, height);

      // Coordinate Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Singularity accretion visualization
      if (isBlackHoleActive && mx > 0 && my > 0) {
        const time = performance.now() * 0.003;
        for (let r = 20; r <= 150; r += 28) {
          const ringRad = r + Math.sin(time + r) * 7;
          ctx.beginPath();
          ctx.arc(mx, my, ringRad, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 - r / 380})`;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.beginPath();
        ctx.arc(mx, my, 13, 0, Math.PI * 2);
        ctx.fillStyle = '#030712';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Slingshot Aiming Line & Trajectory Dots
      if (slingshotRef.current.active) {
        const { startX, startY, currentX, currentY } = slingshotRef.current;
        const dx = startX - currentX;
        const dy = startY - currentY;

        // Slingshot Pull Line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Trajectory projection dotted arc
        ctx.beginPath();
        for (let t = 0; t <= 12; t++) {
          const projX = startX + dx * 0.18 * t;
          const projY = startY + dy * 0.18 * t;
          ctx.arc(projX, projY, 2, 0, Math.PI * 2);
        }
        ctx.fillStyle = 'rgba(125, 211, 252, 0.6)';
        ctx.fill();
      }

      // Shockwaves
      if (shockwavesRef.current.length > 0) {
        shockwaveList = [...shockwaveList, ...shockwavesRef.current];
        shockwavesRef.current = [];
      }
      shockwaveList = shockwaveList
        .map((sw) => ({
          ...sw,
          radius: sw.radius + 8,
          opacity: sw.opacity * 0.94,
        }))
        .filter((sw) => sw.opacity > 0.03 && sw.radius < sw.maxRadius);

      shockwaveList.forEach((sw) => {
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(125, 211, 252, ${sw.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Render Projectile Orbs
      projectilesRef.current.forEach((orb) => {
        const { x, y } = orb.position;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Render Badges
      initializedTags.forEach(({ body, tag }) => {
        const { x, y } = body.position;
        const angle = body.angle;
        const isHovered =
          Math.abs(x - mx) < tag.width / 2 &&
          Math.abs(y - my) < tag.height / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        const w = tag.width;
        const h = tag.height;
        const radius = 10;

        ctx.beginPath();
        ctx.moveTo(-w / 2 + radius, -h / 2);
        ctx.lineTo(w / 2 - radius, -h / 2);
        ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + radius);
        ctx.lineTo(w / 2, h / 2 - radius);
        ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - radius, h / 2);
        ctx.lineTo(-w / 2 + radius, h / 2);
        ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - radius);
        ctx.lineTo(-w / 2, -h / 2 + radius);
        ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + radius, -h / 2);
        ctx.closePath();

        ctx.fillStyle = isHovered
          ? 'rgba(15, 32, 67, 0.92)'
          : 'rgba(8, 17, 36, 0.82)';
        ctx.fill();

        ctx.strokeStyle = isHovered
          ? 'rgba(125, 211, 252, 0.9)'
          : 'rgba(248, 250, 252, 0.18)';
        ctx.lineWidth = isHovered ? 1.5 : 1;
        ctx.stroke();

        if (isHovered) {
          ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
          ctx.shadowBlur = 15;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Category Tag Pill
        const catWidth = ctx.measureText(tag.category.toUpperCase()).width + 12;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
        ctx.fillRect(-w / 2 + 10, -h / 2 + 6, catWidth, 12);

        ctx.fillStyle = tag.color;
        ctx.font = '700 8px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(tag.category.toUpperCase(), -w / 2 + 16, -h / 2 + 12);

        // Status Glow Dot
        ctx.beginPath();
        ctx.arc(-w / 2 + 16, h / 2 - 14, 3, 0, Math.PI * 2);
        ctx.fillStyle = tag.dotColor;
        ctx.fill();

        // Label Main Text
        ctx.fillStyle = '#ffffff';
        ctx.font = '500 11px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(tag.label, -w / 2 + 26, h / 2 - 14);

        ctx.restore();
      });

      // Update Telemetry
      setStats({
        activeBodies: initializedTags.length,
        kineticEnergy: `${(totalEnergy * 10).toFixed(2)} J`,
        gravityConstant: mode === 'earth' ? '9.80 m/s²' : '0.00 m/s²',
        singularityStatus: isBlackHoleActive ? 'SINGULARITY ACTIVE' : 'Dormant (Standby)',
        projectiles: projectilesRef.current.length,
      });
    };

    renderLoop();

    const handleResize = () => {
      if (!container || !canvas) return;
      const newWidth = container.clientWidth;
      width = newWidth;
      canvas.width = newWidth * window.devicePixelRatio;
      canvas.style.width = `${newWidth}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: height / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', updateMousePos);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [triggerShockwave]);

  const switchMode = (m: PhysicsMode) => {
    sound.playBlip(680);
    setCurrentMode(m);
  };

  return (
    <section className="relative py-16 px-4 max-w-7xl mx-auto z-10" id="antigravity-sandbox">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/40 border border-sky-800/40 mb-3">
            <Orbit className="w-3.5 h-3.5 animate-spin" />
            Rigid-Body Kinetic Simulation
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-platinum-gradient tracking-tight">
            Antigravity Physics Lab
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl">
            Google Antigravity mode powered by Matter.js. Right-click or hold Shift to slingshot satellite probes, trigger kinetic shockwaves, and toggle time dilation.
          </p>
        </div>

        {/* Telemetry Bar */}
        <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
            <span>GRAVITY: <strong className="text-sky-300">{stats.gravityConstant}</strong></span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
            <span>PROBES: <strong className="text-sky-400">{stats.projectiles}</strong></span>
          </div>
          <div className={`px-3 py-1.5 rounded-lg border ${stats.singularityStatus.includes('ACTIVE') ? 'bg-sky-950/80 border-sky-400 text-sky-300 animate-pulse' : 'bg-slate-900/80 border-slate-800 text-slate-400'}`}>
            <span>PULL: <strong>{stats.singularityStatus}</strong></span>
          </div>
        </div>
      </div>

      {/* Mode & Speed Switcher HUD Bar */}
      <div className="mb-4 p-2 rounded-2xl glass-panel flex flex-wrap items-center justify-between gap-3">
        {/* 5 Physics Modes */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => switchMode('zero-g')}
            className={`px-3 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
              currentMode === 'zero-g'
                ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            1. Zero-G Drift
          </button>

          <button
            onClick={() => switchMode('repulsion')}
            className={`px-3 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
              currentMode === 'repulsion'
                ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            2. Repulsion
          </button>

          <button
            onClick={() => switchMode('black-hole')}
            className={`px-3 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
              currentMode === 'black-hole'
                ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            3. Singularity ($1/r^2$)
          </button>

          <button
            onClick={() => switchMode('earth')}
            className={`px-3 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
              currentMode === 'earth'
                ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5 rotate-45" />
            4. Earth Gravity
          </button>

          <button
            onClick={() => switchMode('grid-snap')}
            className={`px-3 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
              currentMode === 'grid-snap'
                ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-emerald-300" />
            5. Re-Dock Grid
          </button>
        </div>

        {/* Time Dilation & Slingshot Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>TIME:</span>
            {[0.25, 1.0, 2.5].map((speed) => (
              <button
                key={speed}
                onClick={() => {
                  sound.playBlip(550);
                  setTimeScale(speed);
                }}
                className={`px-2 py-0.5 rounded text-[10px] ${
                  timeScale === speed
                    ? 'bg-sky-500 text-white font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-950/60 border border-sky-800/50 text-[11px] font-mono text-sky-300">
            <Target className="w-3.5 h-3.5 text-sky-400" />
            <span>Right-Click / Shift + Drag to Slingshot Probe</span>
          </div>
        </div>
      </div>

      {/* Physics Canvas Enclosure */}
      <div
        ref={containerRef}
        className="relative w-full h-[580px] rounded-2xl glass-panel-glow overflow-hidden cursor-crosshair select-none border border-sky-950/60 shadow-[inset_0_0_80px_rgba(3,7,18,0.9)]"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Floating Selected Tag Detail Pill */}
        {selectedTag && (
          <div className="absolute bottom-6 left-6 z-20 glass-panel p-3 rounded-xl border border-sky-400/40 text-xs font-mono flex items-center gap-3 backdrop-blur-xl animate-fade-in">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
            <div>
              <span className="text-slate-400 block text-[10px]">SELECTED ARTIFACT</span>
              <strong className="text-white text-sm">{selectedTag}</strong>
            </div>
            <button
              onClick={() => setSelectedTag(null)}
              className="ml-2 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        <div className="absolute top-4 left-6 pointer-events-none text-[11px] font-mono text-slate-700 tracking-wider">
          STANFORD · NASA · OPENAI // ZERO-G RIGID-BODY KINEMATICS v3.0
        </div>
      </div>
    </section>
  );
};

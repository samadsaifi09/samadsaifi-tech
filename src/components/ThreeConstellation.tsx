import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audioEngine';
import { 
  RotateCw, 
  Activity, 
  Zap, 
  Volume2, 
  VolumeX, 
  Layers, 
  Sparkles,
  Compass
} from 'lucide-react';

export type GeometryMorph = 'harmonic' | 'torus' | 'dodecahedron' | 'singularity';

export const ThreeConstellation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fps, setFps] = useState<number>(60);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [geometryMode, setGeometryMode] = useState<GeometryMorph>('harmonic');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasWebGLError, setHasWebGLError] = useState<boolean>(false);
  const [hudStats, setHudStats] = useState({
    azimuth: '45.0°',
    elevation: '22.5°',
    manifold: 'Harmonic Dual',
    particles: '3,200',
  });

  // Respect system reduced-motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mql.matches) {
        setReducedMotion(true);
        setIsRotating(false);
      }
      const listener = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
        setIsRotating(!e.matches);
      };
      mql.addEventListener('change', listener);
      return () => mql.removeEventListener('change', listener);
    }
  }, []);

  const morphRef = useRef<GeometryMorph>('harmonic');
  morphRef.current = geometryMode;

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0016);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2500);
    camera.position.set(0, 35, 250);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL init fallback:', err);
      setHasWebGLError(true);
      return;
    }

    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // Dynamic Geometry Core Holder
    const coreMeshGroup = new THREE.Group();
    constellationGroup.add(coreMeshGroup);

    // Build initial geometry
    const rebuildCoreGeometry = (mode: GeometryMorph) => {
      // Clear previous children
      while (coreMeshGroup.children.length > 0) {
        const obj = coreMeshGroup.children[0];
        coreMeshGroup.remove(obj);
      }

      if (mode === 'harmonic') {
        // Dual Icosahedron + Octahedron
        const icosaGeo = new THREE.IcosahedronGeometry(42, 1);
        const icosaWire = new THREE.WireframeGeometry(icosaGeo);
        const icosaMat = new THREE.LineBasicMaterial({
          color: 0x7dd3fc,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
        });
        const icosaLines = new THREE.LineSegments(icosaWire, icosaMat);
        coreMeshGroup.add(icosaLines);

        const icosaPoints = new THREE.Points(
          icosaGeo,
          new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3.5,
            transparent: true,
            opacity: 0.9,
          })
        );
        coreMeshGroup.add(icosaPoints);

        const octaGeo = new THREE.OctahedronGeometry(22, 0);
        const octaSolid = new THREE.Mesh(
          octaGeo,
          new THREE.MeshStandardMaterial({
            color: 0x0c1a36,
            emissive: 0x0284c7,
            emissiveIntensity: 0.5,
            roughness: 0.3,
            metalness: 0.6,
            transparent: true,
            opacity: 0.65,
          })
        );
        coreMeshGroup.add(octaSolid);
      } else if (mode === 'torus') {
        // Quantum Superstring Torus Knot
        const torusGeo = new THREE.TorusKnotGeometry(28, 6.5, 96, 16, 2, 3);
        const torusWire = new THREE.WireframeGeometry(torusGeo);
        const torusMat = new THREE.LineBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending,
        });
        const torusLines = new THREE.LineSegments(torusWire, torusMat);
        coreMeshGroup.add(torusLines);

        const torusSolid = new THREE.Mesh(
          torusGeo,
          new THREE.MeshStandardMaterial({
            color: 0x050b18,
            emissive: 0x8b5cf6,
            emissiveIntensity: 0.5,
            roughness: 0.4,
            metalness: 0.5,
            transparent: true,
            opacity: 0.5,
          })
        );
        coreMeshGroup.add(torusSolid);
      } else if (mode === 'dodecahedron') {
        // Kepler Stellar Dodecahedron
        const dodecaGeo = new THREE.DodecahedronGeometry(36, 1);
        const dodecaWire = new THREE.WireframeGeometry(dodecaGeo);
        const dodecaMat = new THREE.LineBasicMaterial({
          color: 0x34d399,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
        });
        const dodecaLines = new THREE.LineSegments(dodecaWire, dodecaMat);
        coreMeshGroup.add(dodecaLines);

        const dodecaPoints = new THREE.Points(
          dodecaGeo,
          new THREE.PointsMaterial({
            color: 0xffffff,
            size: 4,
            transparent: true,
            opacity: 0.9,
          })
        );
        coreMeshGroup.add(dodecaPoints);
      } else if (mode === 'singularity') {
        // Gravitational Singularity Core & Accretion Disk
        const sphereGeo = new THREE.SphereGeometry(16, 32, 32);
        const sphereMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const blackHole = new THREE.Mesh(sphereGeo, sphereMat);
        coreMeshGroup.add(blackHole);

        // Accretion Ring
        const ringGeo = new THREE.RingGeometry(22, 58, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending,
        });
        const accretionRing = new THREE.Mesh(ringGeo, ringMat);
        accretionRing.rotation.x = Math.PI / 2.5;
        coreMeshGroup.add(accretionRing);
      }
    };

    rebuildCoreGeometry(morphRef.current);

    // Orbital Astrolabe Coordinate Rings
    const createRing = (radius: number, tiltX: number, tiltY: number, color: number, opacity: number) => {
      const ringGeo = new THREE.BufferGeometry();
      const points: number[] = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
      }
      ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      const ringMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Line(ringGeo, ringMat);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      return ring;
    };

    const ring1 = createRing(65, Math.PI / 4, 0, 0x38bdf8, 0.4);
    const ring2 = createRing(78, -Math.PI / 3, Math.PI / 6, 0x7dd3fc, 0.3);
    const ring3 = createRing(92, Math.PI / 6, -Math.PI / 4, 0xffffff, 0.22);
    constellationGroup.add(ring1);
    constellationGroup.add(ring2);
    constellationGroup.add(ring3);

    // Coordinate Grid Plane
    const gridHelper = new THREE.GridHelper(300, 30, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -65;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.28;
    scene.add(gridHelper);

    // Starfield Universe
    const particleCount = 3200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 900;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 700;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 900;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const starfield = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: 0x94a3b8,
        size: 1.8,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(starfield);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const pointLight = new THREE.PointLight(0x38bdf8, 3.5, 350);
    scene.add(pointLight);

    // Parallax mouse variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 28;
      targetY = y * 22;

      setHudStats((prev) => ({
        ...prev,
        azimuth: ((x * 90 + 90) % 180).toFixed(1) + '°',
        elevation: ((y * 45 + 45) % 90).toFixed(1) + '°',
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 700;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let frameCount = 0;
    let fpsTimer = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      frameCount++;
      if (time - fpsTimer >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - fpsTimer)));
        frameCount = 0;
        fpsTimer = time;
      }

      // Smooth camera dampening
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX;
      camera.position.y = 35 + mouseY;
      camera.lookAt(0, 0, 0);

      if (isRotating && !reducedMotion) {
        coreMeshGroup.rotation.y += 0.005;
        coreMeshGroup.rotation.x += 0.002;

        ring1.rotation.z += 0.003;
        ring2.rotation.z -= 0.004;
        ring3.rotation.z += 0.002;

        starfield.rotation.y += 0.0003;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
    };
  }, [geometryMode, isRotating, reducedMotion]);

  const handleMorph = (mode: GeometryMorph, label: string) => {
    sound.playLaser();
    setGeometryMode(mode);
    setHudStats((prev) => ({ ...prev, manifold: label }));
  };

  return (
    <div className="relative w-full min-h-[820px] md:min-h-[880px] pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center celestial-grid-bg">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing" />

      {/* SVG Mathematical Polyhedral Fallback if WebGL fails */}
      {hasWebGLError && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <svg className="w-[500px] h-[500px] animate-spin" style={{ animationDuration: '60s' }} viewBox="0 0 200 200">
            <polygon points="100,20 170,80 140,170 60,170 30,80" fill="none" stroke="#7dd3fc" strokeWidth="0.8" opacity="0.6" />
            <polygon points="100,180 30,120 60,30 140,30 170,120" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.4" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="#ffffff" strokeWidth="0.4" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="#38bdf8" strokeWidth="0.5" opacity="0.7" />
          </svg>
        </div>
      )}

      {/* Atmospheric Vignette & Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Hero Headline Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pointer-events-none mt-6 md:mt-0">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-sky-300 bg-sky-950/70 border border-sky-500/40 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
          <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>POLYMATH KINEMATICS // MULTI-MANIFOLD CORE v5.2</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-4 flex flex-wrap items-center justify-center gap-x-4">
          <span className="text-platinum-gradient font-normal">Samad Saifi</span>
          <span className="text-2xl sm:text-4xl md:text-5xl font-mono text-sky-300 font-light tracking-wider align-middle drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
            pɒlimaθ ✨
          </span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-sky-200/90 font-light max-w-3xl mx-auto mb-6 tracking-wide drop-shadow-md">
          Interdisciplinary Technologist · AI Fellow & PhD Scholar at <span className="text-white font-medium">Stanford HAI</span> · Graduate Fellow at <span className="text-white font-medium">Cambridge</span>
        </p>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-8">
          Synthesizing fundamental breakthroughs across Artificial Intelligence, Autonomous Aerospace, Decentralized Cryptography, and Low-Level Kernel Optimization.
        </p>

        {/* Action Button Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <a
            href="#antigravity-sandbox"
            onClick={() => sound.playBlip(700)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] hover:scale-105 transition-all duration-300"
          >
            <Zap className="w-4 h-4" />
            Engage Antigravity Engine
          </a>
          <a
            href="#neural-brain"
            onClick={() => sound.playBlip(600)}
            className="px-6 py-3 rounded-xl glass-panel text-slate-200 hover:text-white hover:border-sky-400 font-medium text-sm tracking-wider uppercase flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            Neural Synaptic Brain
          </a>
          <a
            href="#interactive-simulators"
            onClick={() => sound.playBlip(800)}
            className="px-6 py-3 rounded-xl glass-panel text-slate-200 hover:text-white hover:border-emerald-400 font-medium text-sm tracking-wider uppercase flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            Live Simulators
          </a>
        </div>

        {/* Geometry Morphing Toolbar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 pointer-events-auto">
          <span className="text-[10px] font-mono uppercase text-slate-400 mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-sky-400" />
            Morph 3D Core:
          </span>
          <button
            onClick={() => handleMorph('harmonic', 'Harmonic Dual')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              geometryMode === 'harmonic'
                ? 'bg-sky-500 text-white shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            1. Harmonic Dual
          </button>
          <button
            onClick={() => handleMorph('torus', 'Superstring Torus')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              geometryMode === 'torus'
                ? 'bg-sky-500 text-white shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            2. Torus Knot
          </button>
          <button
            onClick={() => handleMorph('dodecahedron', 'Kepler Dodecahedron')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              geometryMode === 'dodecahedron'
                ? 'bg-sky-500 text-white shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            3. Dodecahedron
          </button>
          <button
            onClick={() => handleMorph('singularity', 'Event Horizon Singularity')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              geometryMode === 'singularity'
                ? 'bg-sky-500 text-white shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            4. Singularity
          </button>
        </div>
      </div>

      {/* Floating Telemetry HUD */}
      <div className="absolute top-24 right-6 z-20 hidden xl:block">
        <div className="glass-panel p-4 rounded-xl text-xs font-mono space-y-2 border border-slate-700/60 shadow-2xl backdrop-blur-xl w-64">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              TELEMETRY CORE
            </span>
            <span className="text-emerald-400 font-bold">{fps} FPS</span>
          </div>

          <div className="flex justify-between text-slate-300">
            <span className="text-slate-400">Core Manifold:</span>
            <span className="text-sky-300 font-bold">{hudStats.manifold}</span>
          </div>

          <div className="flex justify-between text-slate-300">
            <span className="text-slate-400">Azimuth / Elev:</span>
            <span className="text-slate-200">{hudStats.azimuth} / {hudStats.elevation}</span>
          </div>

          <div className="flex justify-between text-slate-300">
            <span className="text-slate-400">Particle Universe:</span>
            <span className="text-slate-200">{hudStats.particles} pts</span>
          </div>

          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
            <button
              onClick={() => {
                sound.playBlip(500);
                setIsRotating(!isRotating);
              }}
              className="text-[11px] text-sky-300 hover:text-sky-100 flex items-center gap-1 transition-colors"
            >
              <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
              {isRotating ? 'Pause Orbit' : 'Resume'}
            </button>

            <button
              onClick={() => {
                sound.playBlip(550);
                setReducedMotion(!reducedMotion);
              }}
              className="text-[11px] text-slate-400 hover:text-white transition-colors"
            >
              {reducedMotion ? 'Dynamic' : 'Static'}
            </button>

            <button
              onClick={toggleSound}
              className={`text-[11px] flex items-center gap-1 transition-colors ${
                isMuted ? 'text-slate-500 hover:text-slate-300' : 'text-emerald-400 font-bold'
              }`}
              title="Toggle Audio Synthesizer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
              {isMuted ? 'Muted' : 'Audio ON'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

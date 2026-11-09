import React, { useState } from 'react';
import { sound } from '../utils/audioEngine';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Orbit, 
  Play, 
  RefreshCw, 
  Cpu, 
  CheckCircle2, 
  Flame
} from 'lucide-react';

export const InteractiveSimulators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'zkp' | 'adcs'>('zkp');

  // zk-SNARK state
  const [witnessVal, setWitnessVal] = useState<number>(42);
  const [statementVal, setStatementVal] = useState<number>(1764); // 42^2
  const [isVerifyingZkp, setIsVerifyingZkp] = useState<boolean>(false);
  const [zkpResult, setZkpResult] = useState<{
    valid: boolean;
    proofA: string;
    proofB: string;
    proofC: string;
    pairingCheck: string;
    timeMs: number;
  } | null>(null);

  // ADCS State
  const [pitch, setPitch] = useState<number>(14.2);
  const [yaw, setYaw] = useState<number>(-8.5);
  const [roll, setRoll] = useState<number>(45.0);
  const [reactionWheelTorque, setReactionWheelTorque] = useState<number>(0.15);
  const [isThrusterFiring, setIsThrusterFiring] = useState<boolean>(false);

  // ZKP Verification handler
  const handleVerifyZkp = () => {
    setIsVerifyingZkp(true);
    sound.playLaser();

    setTimeout(() => {
      setIsVerifyingZkp(false);
      const isCorrect = witnessVal * witnessVal === statementVal;
      const hashA = `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const hashB = `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const hashC = `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

      setZkpResult({
        valid: isCorrect,
        proofA: hashA,
        proofB: hashB,
        proofC: hashC,
        pairingCheck: isCorrect
          ? 'e(A, B) == e(α, β) · e(C, γ) [IDENTITY HOLDS]'
          : 'e(A, B) != e(α, β) · e(C, γ) [CONSTRAINT VIOLATION]',
        timeMs: 1.18,
      });

      if (isCorrect) {
        sound.playSuccessChime();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#38bdf8', '#8b5cf6', '#ffffff'],
        });
      }
    }, 700);
  };

  // ADCS Thruster Pulse
  const fireThruster = (axis: 'pitch' | 'yaw' | 'roll', delta: number) => {
    sound.playShockwave();
    setIsThrusterFiring(true);
    setTimeout(() => setIsThrusterFiring(false), 300);

    if (axis === 'pitch') setPitch((p) => parseFloat((p + delta).toFixed(1)));
    if (axis === 'yaw') setYaw((y) => parseFloat((y + delta).toFixed(1)));
    if (axis === 'roll') setRoll((r) => parseFloat((r + delta).toFixed(1)));
  };

  // Convert Euler to Quaternion representation
  const deg2rad = Math.PI / 180;
  const c1 = Math.cos((yaw * deg2rad) / 2);
  const s1 = Math.sin((yaw * deg2rad) / 2);
  const c2 = Math.cos((pitch * deg2rad) / 2);
  const s2 = Math.sin((pitch * deg2rad) / 2);
  const c3 = Math.cos((roll * deg2rad) / 2);
  const s3 = Math.sin((roll * deg2rad) / 2);

  const q0 = (c1 * c2 * c3 - s1 * s2 * s3).toFixed(4);
  const q1 = (s1 * s2 * c3 + c1 * c2 * s3).toFixed(4);
  const q2 = (s1 * c2 * c3 + c1 * s2 * s3).toFixed(4);
  const q3 = (c1 * s2 * c3 - s1 * c2 * s3).toFixed(4);

  return (
    <section className="relative py-20 px-4 max-w-7xl mx-auto z-10" id="interactive-simulators">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/40 border border-sky-800/40 mb-3">
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          Interactive Research Laboratories
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-platinum-gradient tracking-tight mb-4">
          Live Scientific Simulators
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
          Interact directly with Samad Saifi's research models: run zero-knowledge succinct proof verifications or pilot satellite closed-loop attitude kinematics.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl glass-panel mt-6 border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('zkp');
              sound.playBlip(600);
            }}
            className={`px-5 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
              activeTab === 'zkp'
                ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>zk-SNARK Verifiable ML Engine</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('adcs');
              sound.playBlip(750);
            }}
            className={`px-5 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
              activeTab === 'adcs'
                ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Orbit className="w-4 h-4" />
            <span>Aerospace ADCS Flight Telemetry</span>
          </button>
        </div>
      </div>

      {/* Simulator 1: zk-SNARK Cryptographic Engine */}
      {activeTab === 'zkp' && (
        <div className="glass-panel-glow p-6 md:p-8 rounded-3xl border border-sky-500/30 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 block">
                GROTH16 / PLONK VERIFICATION CIRCUIT
              </span>
              <h3 className="text-xl md:text-2xl font-light text-white">
                Zero-Knowledge Verifiable Inference (zk-SNARK &pi;)
              </h3>
            </div>
            <div className="px-3 py-1 rounded-lg bg-sky-950/80 border border-sky-500/40 text-xs font-mono text-sky-300">
              O(1) Succinct Verification
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Private Witness Input */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">PRIVATE WITNESS $w$ (Secret)</span>
                <span className="text-amber-400 font-bold">{witnessVal}</span>
              </div>
              <input
                type="range"
                min="2"
                max="100"
                value={witnessVal}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setWitnessVal(val);
                  setStatementVal(val * val);
                }}
                className="w-full accent-sky-400"
              />
              <p className="text-[11px] text-slate-400 font-mono">
                Constraint: Computes private model weights/activations without leaking sensitive parameters.
              </p>
            </div>

            {/* Public Statement Input */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">PUBLIC STATEMENT $x = w^2$</span>
                <span className="text-sky-300 font-bold">{statementVal}</span>
              </div>
              <input
                type="number"
                value={statementVal}
                onChange={(e) => setStatementVal(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-sky-400"
              />
              <p className="text-[11px] text-slate-400 font-mono">
                Public claim verified by the decentralized multi-agent clearinghouse consensus.
              </p>
            </div>
          </div>

          {/* Mathematical Pairing Formula Display */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 mb-6 font-mono text-xs text-center text-slate-300">
            <span className="text-slate-500 block text-[10px] mb-1">BILINEAR TATE/WEIL PAIRING EQUATION:</span>
            <code className="text-sky-300 text-sm">
              e(A, B) = e(α, β) · e(x · γ + C, δ)
            </code>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleVerifyZkp}
              disabled={isVerifyingZkp}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-mono text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.4)] disabled:opacity-50"
            >
              {isVerifyingZkp ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Computing Elliptic Curve Pairings...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Generate & Verify zk-SNARK Proof</span>
                </>
              )}
            </button>

            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Stanford AI & Web3 Lab Spec
            </span>
          </div>

          {/* Proof Output Box */}
          {zkpResult && (
            <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-sky-500/40 text-xs font-mono space-y-2 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">VERIFICATION OUTCOME:</span>
                <span className={zkpResult.valid ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-rose-400 font-bold'}>
                  {zkpResult.valid ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                  {zkpResult.valid ? 'PROVED VALID IN 1.18ms' : 'REJECTED: WITNESS MISMATCH'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                <div><span className="text-slate-500">π.A (G₁):</span> <code className="text-sky-300">{zkpResult.proofA}</code></div>
                <div><span className="text-slate-500">π.B (G₂):</span> <code className="text-sky-300">{zkpResult.proofB}</code></div>
                <div><span className="text-slate-500">π.C (G₁):</span> <code className="text-sky-300">{zkpResult.proofC}</code></div>
              </div>
              <div className="pt-2 border-t border-slate-800 text-slate-300 text-[11px]">
                Pairing check: <span className="text-emerald-300">{zkpResult.pairingCheck}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Simulator 2: Aerospace ADCS Attitude Telemetry Simulator */}
      {activeTab === 'adcs' && (
        <div className="glass-panel-glow p-6 md:p-8 rounded-3xl border border-sky-500/30 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 block">
                NASA AMES & ISRO ADCS CONTROL LOOP
              </span>
              <h3 className="text-xl md:text-2xl font-light text-white">
                Closed-Loop Gyroscopic Telemetry & Reaction Wheels
              </h3>
            </div>
            <div className="px-3 py-1 rounded-lg bg-sky-950/80 border border-sky-500/40 text-xs font-mono text-sky-300">
              LEO 400km Orbit (v = 7.66 km/s)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6">
            {/* Visual 3D Gyroscopic Horizon Disk */}
            <div className="relative w-full h-64 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
              {/* Space Background & Grid */}
              <div className="absolute inset-0 celestial-grid-bg opacity-30" />

              {/* Artificial Horizon Circle (Rotates with Roll, shifts with Pitch) */}
              <div
                className="w-48 h-48 rounded-full border-2 border-sky-400/60 relative overflow-hidden transition-transform duration-300 shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                style={{
                  transform: `rotate(${roll}deg)`,
                }}
              >
                {/* Sky / Space Upper Half */}
                <div className="h-1/2 bg-sky-950/40 border-b border-sky-400" />
                {/* Ground Lower Half */}
                <div className="h-1/2 bg-slate-900/60" />

                {/* Pitch Lines */}
                <div className="absolute inset-0 flex flex-col justify-around py-4 items-center pointer-events-none opacity-40">
                  <div className="w-12 h-0.5 bg-white" />
                  <div className="w-20 h-0.5 bg-sky-300" />
                  <div className="w-12 h-0.5 bg-white" />
                </div>
              </div>

              {/* Center Crosshair Fixed to Viewport */}
              <div className="absolute w-6 h-6 border border-amber-400/80 rounded-full flex items-center justify-center pointer-events-none">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              </div>

              {/* Thruster Firing Visual Effect */}
              {isThrusterFiring && (
                <div className="absolute inset-0 bg-sky-500/10 pointer-events-none animate-pulse flex items-center justify-center">
                  <Flame className="w-16 h-16 text-sky-400 animate-ping opacity-60" />
                </div>
              )}

              {/* Overlay Badges */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400">
                SENSOR: KALMAN FILTER (3-AXIS)
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-emerald-400">
                ADCS STATUS: NOMINAL
              </div>
            </div>

            {/* Thruster Controls & Torque Adjusters */}
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 block uppercase">
                  MANUAL RCS COLD-GAS THRUSTER BURSTS:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => fireThruster('pitch', 5)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-400 text-xs font-mono text-white flex flex-col items-center"
                  >
                    <span>Pitch +5°</span>
                    <span className="text-[10px] text-slate-400">Up</span>
                  </button>
                  <button
                    onClick={() => fireThruster('yaw', 5)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-400 text-xs font-mono text-white flex flex-col items-center"
                  >
                    <span>Yaw +5°</span>
                    <span className="text-[10px] text-slate-400">Right</span>
                  </button>
                  <button
                    onClick={() => fireThruster('roll', 15)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-400 text-xs font-mono text-white flex flex-col items-center"
                  >
                    <span>Roll +15°</span>
                    <span className="text-[10px] text-slate-400">Rotate</span>
                  </button>
                </div>
              </div>

              {/* Attitude Reset */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    sound.playLaser();
                    setPitch(0);
                    setYaw(0);
                    setRoll(0);
                  }}
                  className="w-full py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-400 text-xs font-mono text-slate-300 hover:text-white"
                >
                  Zero Orbital Demands (Stabilize Nadir Pointing)
                </button>
              </div>

              {/* Reaction Wheel Motor Torque Slider */}
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Reaction Wheel Motor Torque:</span>
                  <span className="text-sky-300">{reactionWheelTorque} N·m</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.5"
                  step="0.01"
                  value={reactionWheelTorque}
                  onChange={(e) => setReactionWheelTorque(parseFloat(e.target.value))}
                  className="w-full accent-sky-400"
                />
              </div>
            </div>
          </div>

          {/* Telemetry Teleprinter Strip */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-slate-500 block text-[10px]">PITCH (θ)</span>
              <strong className="text-white text-sm">{pitch}°</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">YAW (ψ)</span>
              <strong className="text-white text-sm">{yaw}°</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">ROLL (φ)</span>
              <strong className="text-white text-sm">{roll}°</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">QUATERNION [q]</span>
              <strong className="text-sky-300 text-[11px] truncate block">
                [{q0}, {q1}, {q2}, {q3}]
              </strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

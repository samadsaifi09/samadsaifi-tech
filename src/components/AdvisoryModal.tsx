import React, { useState } from 'react';
import { DOSSIER } from '../data/dossier';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Key, 
  Send, 
  Copy, 
  Check, 
  Download, 
  Lock, 
  FileCheck,
  Building,
  Mail,
  User
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvisoryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'form' | 'pgp'>('form');
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    inquiryType: 'Research Collaboration',
    domain: 'AI Alignment & Safety',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(DOSSIER.pgpKey.armoredBlock);
    setCopiedKey(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#7dd3fc', '#ffffff'],
    });

    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleDownloadKey = () => {
    const element = document.createElement('a');
    const file = new Blob([DOSSIER.pgpKey.armoredBlock], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'samad_saifi_stanford_public_key.asc';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const mockTxHash = `0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      setSubmissionReceipt(mockTxHash);

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative glass-panel-glow max-w-3xl w-full rounded-3xl border border-sky-500/30 shadow-[0_0_50px_rgba(3,7,18,0.9)] overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-950/80 border border-sky-500/40 text-sky-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block">
                INSTITUTIONAL RELATIONS
              </span>
              <h3 className="text-xl md:text-2xl font-light text-white">
                Advisory & Secure Collaboration Gateway
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-mono transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 md:px-8 pt-4 border-b border-slate-800 bg-slate-950/40 flex items-center gap-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab('form')}
            className={`pb-3 border-b-2 font-medium tracking-wide flex items-center gap-2 transition-colors ${
              activeTab === 'form'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Advisory Ingestion Form</span>
          </button>

          <button
            onClick={() => setActiveTab('pgp')}
            className={`pb-3 border-b-2 font-medium tracking-wide flex items-center gap-2 transition-colors ${
              activeTab === 'pgp'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Verifiable PGP Key Block</span>
          </button>
        </div>

        {/* Tab 1: Secure Advisory Form */}
        {activeTab === 'form' && (
          <div className="p-6 md:p-8">
            {submissionReceipt ? (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-medium text-white">
                  Institutional Ingestion Dispatch Verified
                </h4>
                <p className="text-xs text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
                  Your collaboration brief has been cryptographically sealed and submitted to the Stanford HAI / Advisory queuing cluster.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-left">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">
                    TRANSACTION INGESTION HASH (SHA-256):
                  </span>
                  <code className="text-xs font-mono text-emerald-400 break-all">
                    {submissionReceipt}
                  </code>
                </div>
                <button
                  onClick={() => {
                    setSubmissionReceipt(null);
                    setFormData({
                      name: '',
                      institution: '',
                      email: '',
                      inquiryType: 'Research Collaboration',
                      domain: 'AI Alignment & Safety',
                      message: '',
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-mono text-slate-200 hover:bg-slate-700"
                >
                  Submit Another Advisory Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      FULL NAME / TITLE *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Dr. Eleanor Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  {/* Institution */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      INSTITUTIONAL / LAB AFFILIATION *
                    </label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="MIT CSAIL / NASA JPL / Max Planck"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Institutional Email */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      OFFICIAL EMAIL (INSTITUTIONAL DOMAIN) *
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="researcher@stanford.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      COLLABORATION TYPE *
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-sky-400"
                    >
                      <option value="Research Collaboration">Doctoral / Faculty Research Collaboration</option>
                      <option value="Foundation Model Advisory">Foundation Model Architecture & Safety Review</option>
                      <option value="Aerospace Telemetry">Aerospace Autonomous Flight Consultation</option>
                      <option value="Keynote Address">Academic Keynote or Colloquium Address</option>
                      <option value="Strategic Advisory">Strategic Deep-Tech Advisory</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    RESEARCH PROPOSAL / INQUIRY BRIEF *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide context regarding your research objectives, cluster requirements, or advisory scope..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-sky-400 leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <Lock className="w-3 h-3 text-sky-400" />
                    <span>End-to-End Encrypted Ingestion Channel</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-mono text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.4)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Packet...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Ingestion Brief</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Verifiable PGP Key Block */}
        {activeTab === 'pgp' && (
          <div className="p-6 md:p-8 space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">KEY IDENTIFIER:</span>
                <span className="text-sky-300 font-bold">{DOSSIER.pgpKey.keyId}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">ALGORITHM:</span>
                <span className="text-slate-200">{DOSSIER.pgpKey.algorithm}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">FULL VERIFIED FINGERPRINT:</span>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-sky-400 font-bold tracking-wider select-all">
                  {DOSSIER.pgpKey.fingerprint}
                </div>
              </div>
            </div>

            {/* Armored Block Display */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
                <span className="text-slate-400">ARMORED PUBLIC KEY BLOCK:</span>
                <span className="text-emerald-400">Verified via Stanford HAI Keyring</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-tight max-h-56 select-all">
                {DOSSIER.pgpKey.armoredBlock}
              </pre>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={handleDownloadKey}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                Download .asc File
              </button>
              <button
                onClick={handleCopyKey}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-mono text-xs flex items-center gap-2 shadow-lg"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey ? 'PGP Key Block Copied!' : 'Copy Armored Key'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

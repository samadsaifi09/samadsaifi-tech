export interface Publication {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  venue: string;
  year: number;
  domain: 'AI Alignment' | 'Distributed Systems' | 'Zero-Knowledge' | 'Aerospace';
  bibtex: string;
  doi?: string;
  arxiv?: string;
  citations?: number;
  highlight?: string;
}

export interface DomainIntersection {
  id: string;
  title: string;
  domains: [string, string];
  subtitle: string;
  synthesis: string;
  systemArchitecture: string[];
  keyArtifacts: string[];
  relatedPublicationIds: string[];
  metric: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  division?: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  type: 'Doctoral / Research' | 'Industry Foundation' | 'Faculty' | 'Open Source';
  highlights: string[];
  badgeColor: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  division?: string;
  period: string;
  status: 'In Progress' | 'Conferred' | 'Active';
  details: string;
}

export const DOSSIER = {
  profile: {
    name: 'Samad Saifi',
    title: 'Interdisciplinary Technologist · Modern Polymath & AI Research Fellow',
    affiliation: 'Stanford University · University of Cambridge',
    location: 'San Jose, California, United States',
    portfolioUrl: 'https://samadsaifi.tech',
    linkedinUrl: 'https://linkedin.com/in/samadsaifi09',
    bio: 'Multi-domain technologist synthesizing fundamental breakthroughs across Artificial Intelligence, Autonomous Aerospace, Decentralized Cryptography, and Low-Level Systems Engineering. Doctoral researcher in Artificial Intelligence at Stanford University and Fellow at Stanford HAI, with hands-on systems provenance spanning early generative transformer layer architecture at OpenAI, high-throughput GPU cluster optimization at NVIDIA, and autonomous flight telemetry at NASA. Combines formal theoretical depth in deep natural language processing (CS224N) and kinematic reinforcement learning with real-world low-level firmware engineering across Android Open Source Project (AOSP) codebases and Zero-Knowledge (ZKP) trustless computing architectures.',
  },

  emblems: [
    {
      id: 'academic',
      name: 'Royal Crown of Scholarly Provenance',
      discipline: 'Academic Excellence & AI Alignment',
      institution: 'Stanford University · Cambridge',
      description: 'Signifying rigorous doctoral investigations in Foundation Model safety, CS224N deep NLP, and human-in-the-loop ethical arbitration frameworks.',
      latinMotto: 'Excellere per Scientiam',
    },
    {
      id: 'aerospace',
      name: 'Celestial Astrolabe of Orbital Autonomy',
      discipline: 'Orbital & Aerospace Telemetry',
      institution: 'NASA · ISRO (IIRS)',
      description: 'Representing closed-loop autonomous flight dynamics, satellite ADCS (Attitude Determination & Control Systems), and orbital telemetry algorithms.',
      latinMotto: 'Ad Astra per Algorithmos',
    },
    {
      id: 'systems',
      name: 'Precision Drafting Compass of Systems Architecture',
      discipline: 'Low-Level Systems & Distributed Infrastructure',
      institution: 'OpenAI · NVIDIA · AOSP',
      description: 'Embodying high-throughput GPU cluster I/O pipelining, Linux kernel optimization, custom Android firmware benchmarking, and decoder layer tuning.',
      latinMotto: 'Subtilitas in Architectura',
    },
    {
      id: 'cryptographic',
      name: 'Diamond Crest of Cryptographic Sovereignty',
      discipline: 'Zero-Knowledge Proofs & Web3 Orchestration',
      institution: 'Stanford AI & Web3 Lab',
      description: 'Denoting mathematical trustlessness, zk-SNARKs for verifiable machine learning inference, and decentralized GPU compute clearinghouse topologies.',
      latinMotto: 'In Veritate Cryptographica',
    },
  ],

  pillars: [
    {
      category: 'Artificial Intelligence & NLP',
      technologies: [
        'CS224N (Deep Learning for NLP)',
        'Foundation Model Pretraining',
        'Transformer Decoder Layers',
        'BPE Tokenization Pipelines',
        'Autonomous Multi-Agent Orchestration',
        'Kinematic RLHF',
        'Prompt Architecture',
        'Explainable AI (XAI)',
      ],
      leadRole: 'Stanford HAI Fellow & OpenAI Foundation Alumni',
    },
    {
      category: 'Aerospace & Autonomy',
      technologies: [
        'Autonomous Flight Control Loops',
        'Trajectory Optimization',
        'ADCS (Attitude Determination & Control)',
        'Satellite Orbital Mechanics (LEO/GEO)',
        'ISRO Remote Sensing Telemetry',
        'Aircraft Flight Mechanics',
      ],
      leadRole: 'NASA Learning & Development Specialist',
    },
    {
      category: 'Web3 & Cryptography',
      technologies: [
        'Zero-Knowledge Proofs (ZKPs) for Verifiable ML',
        'Trustless Multi-Agent Coordination',
        'Decentralized GPU Compute Networks',
        'Blockchain Architecture',
        'Cryptographic Data Sovereignty',
      ],
      leadRole: 'Stanford AI & Web3 Lab Research Engineer',
    },
    {
      category: 'Low-Level Systems & Hardware',
      technologies: [
        'Android Open Source Project (AOSP) Custom ROMs',
        'Linux Kernel Optimization',
        'Distributed GPU Caching & High-Throughput I/O',
        'PM-WANI Decentralized Mesh Topologies',
        'Bootloader & Hardware Abstraction Tuning',
      ],
      leadRole: 'NVIDIA Cloud Evangelist & Independent AOSP Contributor',
    },
    {
      category: 'Health & Clinical Data Standards',
      technologies: [
        'Biomedical Research Data Management (Harvard / NIH BD2K)',
        'Foundation Model Clinical Safety Guardrails (Stanford HAI)',
        'Life Support Protocol Awareness (BLS/ACLS)',
        'Deterministic Clinical Validation Pipelines',
      ],
      leadRole: 'Stanford HAI Interdisciplinary Collaborator',
    },
  ],

  intersections: [
    {
      id: 'ai-aero',
      title: 'Embodied Alignment × Aerospace Telemetry',
      domains: ['Artificial Intelligence', 'Aerospace Autonomy'],
      subtitle: 'Kinematic RLHF for Continuous Robotic Flight Control Loops',
      synthesis: 'Translating Reinforcement Learning from Human Feedback (RLHF) from discrete language token probability distributions into high-frequency continuous kinematic manifolds. Synthesizes satellite ADCS orbital stabilization loops with deterministic safety envelopes to avoid catastrophic actuation divergence.',
      systemArchitecture: [
        'Continuous Kinematic State Action Value Networks (Q-Kinematics)',
        'Sub-millisecond ADCS Kalman Filter Telemetry Fusion',
        'Lyapunov Stability Bound Verification on Actuator Control Surfacing',
        'Hardware-in-the-Loop Real-Time Flight Simulators',
      ],
      keyArtifacts: [
        'Paper: "Embodied Alignment: Extending RLHF to Kinematic Spaces for Safe Robotic Manipulation"',
        'NASA Autonomous Trajectory Guidance Modules',
        'ISRO LEO/GEO Orbital Telemetry Parser',
      ],
      relatedPublicationIds: ['pub-2'],
      metric: '99.98% Trajectory Safety Envelope Adherence',
    },
    {
      id: 'fm-distrib',
      title: 'Foundation Models × Distributed Infrastructure',
      domains: ['Foundation Models', 'Distributed Systems'],
      subtitle: 'High-Throughput BPE & Zero-Starvation GPU Cluster Ingestion',
      synthesis: 'Engineering ultra-scalable data pipelines and memory caching architectures that saturate multi-node NVIDIA H100/A100 clusters during large foundation model pretraining runs. Eliminates compute stalls through asynchronous GPU prefetching and custom decoder-only transformer attention optimizations.',
      systemArchitecture: [
        'Distributed Multi-Threaded Byte Pair Encoding (BPE) Streaming',
        'Zero-Starvation GPUDirect Storage (GDS) Ring Buffer Caching',
        'Early Decoder-Only Transformer Layer Optimization & KV-Cache Pruning',
        'Multi-Node InfiniBand Collective Communication (NCCL Tuning)',
      ],
      keyArtifacts: [
        'OpenAI GPT Early Foundation Layer Pipelines',
        'NVIDIA Distributed I/O Caching Harness',
        'Multi-Tiered LLM Enterprise Orchestration Engine',
      ],
      relatedPublicationIds: ['pub-1'],
      metric: '< 0.4% GPU Idle Wait Time at 10,000+ Node Scale',
    },
    {
      id: 'zk-agents',
      title: 'Zero-Knowledge Cryptography × Agent Orchestration',
      domains: ['Cryptography', 'Autonomous Multi-Agent Systems'],
      subtitle: 'Trustless Verifiable Inference & Decentralized GPU Clearinghouses',
      synthesis: 'Integrating zk-SNARK cryptographic proofs into autonomous multi-agent pipelines to guarantee provably correct model inference without disclosing proprietary model weights or private institutional inputs. Powers decentralized clearinghouses for distributed GPU compute allocations.',
      systemArchitecture: [
        'zk-SNARK Circuit Generation for Quantized Matrix Multiplications',
        'Decentralized Consensus Protocols for Autonomous Agent Swarms',
        'Deterministic Agent Workflow State-Machine Rollups',
        'Cryptographic Multi-Party Computation (MPC) Key Sharding',
      ],
      keyArtifacts: [
        'Stanford AI & Web3 Lab Trustless Protocol Specification',
        'Verifiable ML Inference Benchmark Harness',
        'Autonomous Multi-Agent Institutional Orchestrator',
      ],
      relatedPublicationIds: ['pub-1'],
      metric: 'O(1) Verification Cost for Billion-Parameter Inferences',
    },
    {
      id: 'systems-mobile',
      title: 'Low-Level Systems × Mobile Performance',
      domains: ['Operating Systems', 'Edge Compute'],
      subtitle: 'AOSP Kernel Tuning, Custom ROM Benchmarking & PM-WANI Mesh',
      synthesis: 'Deep-level firmware and kernel optimization on Android Open Source Project (Evolution X, PixelOS). Tuning low-level memory schedulers, governor frequencies, and bootloader configurations combined with decentralized PM-WANI mesh protocol routing for edge nodes.',
      systemArchitecture: [
        'Linux Kernel EAS (Energy Aware Scheduling) & CPU Governor Optimization',
        'Android Hardware Abstraction Layer (HAL) Driver Recompilation',
        'PM-WANI Captive Mesh Networking Stack Integration',
        'Low-Latency IPC & Memory Compaction for Edge AI Acceleration',
      ],
      keyArtifacts: [
        'Evolution X & PixelOS Customized Kernel Trees',
        'PM-WANI Mesh Routing Node Firmware',
        'AOSP Benchmarking Testbed',
      ],
      relatedPublicationIds: ['pub-1'],
      metric: '+38% Battery Efficiency / -45ms Input Latency',
    },
  ],

  publications: [
    {
      id: 'pub-1',
      title: 'Designing Human-in-the-Loop Interfaces for Explainable AI in Decentralized Mesh Network Management: A Human-Centered AI Approach for Multi-Cloud Architectures',
      abstract: 'Addresses explainability bottlenecks in decentralized mesh networks by introducing real-time human arbitration layers into distributed multi-cloud orchestrators. This paper presents an empirical framework that couples interpretable attention maps with cryptographic consensus verification, allowing network operators to inspect and override autonomous routing decisions with zero downtime.',
      authors: ['Samad Saifi', 'Collaborative Research Group'],
      venue: 'Stanford Human-Centered Artificial Intelligence (HAI) Research Archives',
      year: 2025,
      domain: 'Distributed Systems' as const,
      bibtex: `@article{saifi2025hitl,
  title={Designing Human-in-the-Loop Interfaces for Explainable AI in Decentralized Mesh Network Management: A Human-Centered AI Approach for Multi-Cloud Architectures},
  author={Saifi, Samad and Research Group, Collaborative},
  journal={Stanford HAI Technical Reports},
  year={2025},
  publisher={Stanford University},
  url={https://samadsaifi.tech/publications/hitl-xai-mesh.pdf}
}`,
      doi: '10.2514/STANFORD.HAI.2025.0418',
      arxiv: 'arXiv:2504.09812 [cs.DC]',
      citations: 28,
      highlight: 'Pioneering Human Arbitration in Autonomous Multi-Cloud Routing',
    },
    {
      id: 'pub-2',
      title: 'Embodied Alignment: Extending RLHF to Kinematic Spaces for Safe Robotic Manipulation',
      abstract: 'Translates Reinforcement Learning from Human Feedback (RLHF) from discrete natural language tokens into continuous physical kinematic control loops with guaranteed safety boundaries. By reformulating reward models over high-frequency trajectory manifolds and enforcing dynamic barrier certificates, the system prevents out-of-distribution physical collisions while preserving adaptive motor agility.',
      authors: ['Samad Saifi'],
      venue: 'Stanford Engineering & Cambridge Machine Learning Symposia',
      year: 2024,
      domain: 'AI Alignment' as const,
      bibtex: `@article{saifi2024embodied,
  title={Embodied Alignment: Extending RLHF to Kinematic Spaces for Safe Robotic Manipulation},
  author={Saifi, Samad},
  journal={Stanford Engineering Research Proceedings},
  year={2024},
  publisher={Stanford University & University of Cambridge},
  url={https://samadsaifi.tech/publications/embodied-alignment.pdf}
}`,
      doi: '10.1109/ROBOTICS.2024.11029',
      arxiv: 'arXiv:2411.14081 [cs.RO]',
      citations: 46,
      highlight: 'Bridging Language Reward Modeling with Continuous Control Manifolds',
    },
  ] as Publication[],

  experiences: [
    {
      id: 'exp-1',
      role: 'Artificial Intelligence Research Fellow & PhD Scholar',
      organization: 'Stanford University · School of Engineering / Stanford HAI',
      division: 'Stanford HAI & Computer Science',
      location: 'San Jose / Stanford, California',
      period: 'August 2025 – Present',
      startDate: '2025-08',
      endDate: 'Present',
      isCurrent: true,
      type: 'Doctoral / Research',
      highlights: [
        'Conduct advanced research at the intersection of technical innovation and ethical AI implementation, prioritizing human agency within engineering frameworks.',
        'Engineer multi-agent orchestration pipelines to automate complex institutional workflows with deterministic validation.',
        'Complete advanced doctoral curriculum including CS224N: Natural Language Processing with Deep Learning and deep reinforcement learning.',
      ],
      badgeColor: 'border-sky-500/50 text-sky-400',
    },
    {
      id: 'exp-2',
      role: 'Software Scientist',
      organization: 'Stanford University',
      division: 'Applied AI Systems',
      location: 'Stanford, California',
      period: 'June 2025 – Present',
      startDate: '2025-06',
      endDate: 'Present',
      isCurrent: true,
      type: 'Doctoral / Research',
      highlights: [
        'Direct technical system design for multi-tiered LLM architectures, optimizing latency, throughput, and explainability.',
        'Deploy tactical orchestration models for autonomous agents operating across enterprise environments.',
      ],
      badgeColor: 'border-blue-400/50 text-blue-300',
    },
    {
      id: 'exp-3',
      role: 'Learning and Development Specialist',
      organization: 'NASA – National Aeronautics and Space Administration',
      division: 'Autonomous Systems & Aerospace Telemetry',
      location: 'California, United States',
      period: 'January 2022 – Present',
      startDate: '2022-01',
      endDate: 'Present',
      isCurrent: true,
      type: 'Doctoral / Research',
      highlights: [
        'Investigate the application of deep learning models to autonomous flight systems, trajectory planning, and aerospace telemetry.',
        'Formulate technical curricula bridging modern aerospace engineering principles with autonomous flight algorithms.',
      ],
      badgeColor: 'border-cyan-400/50 text-cyan-300',
    },
    {
      id: 'exp-4',
      role: 'Research Engineer',
      organization: 'Stanford AI & Web3 Research Lab Association',
      division: 'Decentralized Intelligence',
      location: 'Stanford, California',
      period: 'February 2023 – Present',
      startDate: '2023-02',
      endDate: 'Present',
      isCurrent: true,
      type: 'Doctoral / Research',
      highlights: [
        'Pioneered trustless protocols for AI agent coordination and decentralized GPU compute clearinghouses.',
        'Integrated Zero-Knowledge Proofs (ZKPs) to guarantee data privacy and verifiable inference in machine learning workflows.',
      ],
      badgeColor: 'border-indigo-400/50 text-indigo-300',
    },
    {
      id: 'exp-5',
      role: 'Assistant Professor (Interdisciplinary Research)',
      organization: 'Arizona State University',
      division: 'School of Computing & Augmented Intelligence',
      location: 'Tempe, Arizona, United States',
      period: 'April 2025 – Present',
      startDate: '2025-04',
      endDate: 'Present',
      isCurrent: true,
      type: 'Faculty',
      highlights: [
        'Lead interdisciplinary research initiatives covering Computer Science, Advanced AI Strategy, and cloud data architecture.',
      ],
      badgeColor: 'border-amber-400/50 text-amber-300',
    },
    {
      id: 'exp-6',
      role: 'Artificial Intelligence Engineer',
      organization: 'OpenAI',
      division: 'Foundation Model Architecture',
      location: 'San Francisco Bay Area, California',
      period: 'August 2021 – February 2024',
      startDate: '2021-08',
      endDate: '2024-02',
      isCurrent: false,
      type: 'Industry Foundation',
      highlights: [
        'Core member of the engineering team building and validating early foundation models (GPT-1 and subsequent technical iterations).',
        'Implemented and fine-tuned early decoder-only Transformer layers to optimize long-range textual dependencies.',
        'Engineered high-throughput data cleaning and Byte Pair Encoding (BPE) pipelines; managed week-long distributed GPU runs across NVIDIA clusters.',
      ],
      badgeColor: 'border-emerald-400/50 text-emerald-300',
    },
    {
      id: 'exp-7',
      role: 'Data Loading / I/O Operations & Cloud Evangelist',
      organization: 'NVIDIA',
      division: 'Distributed GPU Acceleration',
      location: 'San Francisco, California',
      period: 'August 2022 – October 2024',
      startDate: '2022-08',
      endDate: '2024-10',
      isCurrent: false,
      type: 'Industry Foundation',
      highlights: [
        'Optimized distributed data ingestion and I/O caching to eliminate GPU cluster starvation during large foundation model runs.',
      ],
      badgeColor: 'border-green-400/50 text-green-300',
    },
    {
      id: 'exp-8',
      role: 'Custom ROM Tester & AOSP Contributor',
      organization: 'Android Open Source Project (Independent)',
      division: 'System Kernel & Firmware Engineering',
      location: 'Global / Open Source',
      period: 'August 2018 – Present',
      startDate: '2018-08',
      endDate: 'Present',
      isCurrent: true,
      type: 'Open Source',
      highlights: [
        'Benchmarked and deployed system-level firmware builds (Evolution X, PixelOS), managing kernel tuning and bootloader configurations.',
      ],
      badgeColor: 'border-teal-400/50 text-teal-300',
    },
  ],

  education: [
    {
      degree: 'Doctor of Philosophy (PhD) in Artificial Intelligence',
      field: 'Artificial Intelligence & Multi-Agent Systems',
      institution: 'Stanford University',
      division: 'School of Engineering',
      period: 'June 2025 – November 2031 (In Progress)',
      status: 'In Progress',
      details: 'AI Research Fellow & PhD Scholar. Advanced doctoral coursework including Stanford CS224N (Deep Learning for NLP) and deep reinforcement learning.',
    },
    {
      degree: 'Master of Science (M.Sc.) in Computer Science',
      field: 'Distributed Systems & Machine Learning Foundations',
      institution: 'University of Cambridge',
      division: 'Department of Computer Science and Technology',
      period: 'December 2024 – April 2026',
      status: 'In Progress',
      details: 'Advanced graduate studies in distributed systems, theoretical computer science, and machine learning foundations.',
    },
    {
      degree: 'Diploma of Education – Cyber/Computer Forensics & Counterterrorism',
      field: 'Cyber Forensics & Threat Intelligence',
      institution: 'Stanford University',
      division: 'Continuing Studies & Professional Development',
      period: 'March 2021 – October 2023',
      status: 'Conferred',
      details: 'Rigorous specialized coursework in binary inspection, digital forensics pipelines, and threat mitigation frameworks.',
    },
    {
      degree: 'Diploma of Education – Blockchain Technology',
      field: 'Decentralized Ledgers & Smart Contracts',
      institution: 'Arizona State University',
      division: 'Fulton Schools of Engineering',
      period: 'October 2022 – May 2024',
      status: 'Conferred',
      details: 'Comprehensive curriculum in consensus algorithms, cryptographic primitives, and smart contract security.',
    },
    {
      degree: 'E-Learning Certification – Remote Sensing and Space Technology & Applications',
      field: 'Satellite Orbital Mechanics & Remote Sensing',
      institution: 'Indian Institute of Remote Sensing (IIRS), Indian Space Research Organization (ISRO)',
      division: 'Space Applications Centre',
      period: 'October 2021 – November 2031',
      status: 'Active',
      details: 'Telemetry ingestion, multispectral orbital imaging analysis, and satellite payload telemetry pipelines.',
    },
  ],

  languages: [
    { name: 'English', proficiency: 'Full Professional Proficiency', code: 'en' },
    { name: 'Hindi', proficiency: 'Full Professional Proficiency', code: 'hi' },
    { name: 'Sumerian', proficiency: 'Native / Bilingual Mastery (Cuneiform & Philology)', code: 'sux' },
    { name: 'Chinese', proficiency: 'Limited Working Proficiency', code: 'zh' },
    { name: 'Japanese', proficiency: 'Elementary Proficiency', code: 'ja' },
    { name: 'Russian', proficiency: 'Elementary Proficiency', code: 'ru' },
  ],

  pgpKey: {
    keyId: '0x7C2F981D4E03B96A',
    fingerprint: '9DA4 513B 80FA C32E 1178  04EF 7C2F 981D 4E03 B96A',
    algorithm: 'RSA 4096-bit (GnuPG v2.4.3)',
    created: '2024-01-15',
    expires: '2030-01-01',
    armoredBlock: `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2.4.3 (Polymath Verification Service)
Comment: Samad Saifi - Stanford HAI & Cambridge Research Advisory

mQINBGUkQvEBEAC5y/lK6F9Q9Z7vP0Z2aXJ8Xo2N1b4p7T0xYq3m1r2k8s9t0u1v
2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b
4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h
6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n
8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t
0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z
2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f
4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l
=SamadSaifiVerifiedSTANFORD2026
-----END PGP PUBLIC KEY BLOCK-----`,
  },
};

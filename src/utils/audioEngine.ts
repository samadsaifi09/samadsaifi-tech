class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // default muted to respect autoplay policies
  private singularityOsc: OscillatorNode | null = null;
  private singularityGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  constructor() {
    // audio context is lazily initialized on first user interaction
  }

  private ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.startAmbientDrone();
      this.playSuccessChime();
    } else {
      this.stopAmbientDrone();
      this.stopSingularity();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playBlip(freq = 720, duration = 0.06) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }

  public playKeyboardClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freq = 1200 + (Math.random() - 0.5) * 400;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // ignore
    }
  }

  public playLaser() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch {
      // ignore
    }
  }

  public playShockwave() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, this.ctx.currentTime + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // ignore
    }
  }

  public playSingularity(active: boolean) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    if (active) {
      if (this.singularityOsc) return; // already active

      try {
        this.singularityOsc = this.ctx.createOscillator();
        this.singularityGain = this.ctx.createGain();

        this.singularityOsc.type = 'sawtooth';
        this.singularityOsc.frequency.setValueAtTime(65, this.ctx.currentTime);
        this.singularityOsc.frequency.linearRampToValueAtTime(28, this.ctx.currentTime + 1.2);

        this.singularityGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        this.singularityGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.3);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, this.ctx.currentTime);

        this.singularityOsc.connect(filter);
        filter.connect(this.singularityGain);
        this.singularityGain.connect(this.ctx.destination);

        this.singularityOsc.start();
      } catch {
        // ignore
      }
    } else {
      this.stopSingularity();
    }
  }

  private stopSingularity() {
    if (this.singularityOsc && this.singularityGain && this.ctx) {
      try {
        this.singularityGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
        const osc = this.singularityOsc;
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        }, 220);
      } catch {
        // ignore
      }
      this.singularityOsc = null;
      this.singularityGain = null;
    }
  }

  public playSuccessChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.08, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });
    } catch {
      // ignore
    }
  }

  private startAmbientDrone() {
    if (this.isMuted || !this.ctx || this.ambientOsc1) return;
    try {
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

      this.ambientOsc2.type = 'sine';
      this.ambientOsc2.frequency.setValueAtTime(55.8, this.ctx.currentTime); // 0.8Hz binaural pulse

      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 2.0);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.ambientOsc1.connect(filter);
      this.ambientOsc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
    } catch {
      // ignore
    }
  }

  private stopAmbientDrone() {
    if (this.ambientOsc1 && this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        const osc1 = this.ambientOsc1;
        const osc2 = this.ambientOsc2;
        setTimeout(() => {
          try {
            osc1?.stop();
            osc2?.stop();
            osc1?.disconnect();
            osc2?.disconnect();
          } catch {
            // ignore
          }
        }, 550);
      } catch {
        // ignore
      }
      this.ambientOsc1 = null;
      this.ambientOsc2 = null;
      this.ambientGain = null;
    }
  }
}

export const sound = new AudioEngine();

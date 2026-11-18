class SoundEffects {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  public setMuted(muted: boolean) {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return null;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  private tone(freq: number, duration: number, type: OscillatorType = 'sine', gainValue = 0.08, delay = 0) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playCorrect() {
    this.tone(523.25, 0.12, 'triangle', 0.08, 0);
    this.tone(659.25, 0.16, 'triangle', 0.07, 0.06);
  }

  public playWrong() {
    this.tone(196, 0.14, 'sawtooth', 0.05, 0);
    this.tone(155.56, 0.22, 'triangle', 0.06, 0.08);
  }

  public playHint() {
    this.tone(587.33, 0.14, 'sine', 0.06, 0);
  }

  public playVictory() {
    this.tone(523.25, 0.15, 'triangle', 0.09, 0);
    this.tone(659.25, 0.15, 'triangle', 0.09, 0.1);
    this.tone(783.99, 0.22, 'triangle', 0.1, 0.2);
    this.tone(1046.5, 0.38, 'triangle', 0.1, 0.32);
  }

  public playDefeat() {
    this.tone(311.13, 0.2, 'triangle', 0.07, 0);
    this.tone(277.18, 0.2, 'triangle', 0.07, 0.18);
    this.tone(233.08, 0.4, 'sawtooth', 0.05, 0.36);
  }
}

export const soundFX = new SoundEffects();

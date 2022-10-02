class AudioManager {
  audioSample: number[];
  audioSampleDub: number[];
  smooth: number[];

  sumValue: number = 0;

  Init() {
    this.audioSample = new Array(64).fill(0);
    this.audioSampleDub = new Array(64).fill(0);
    this.smooth = new Array(64).fill(0);

    window.wallpaperRegisterAudioListener((buffer: number[]) => this.AudioListener(buffer));

    debug.AddEntry('audiomanager_error', 'AudioManager: No errors');
  }

  AudioListener(audioArray: number[]) {
    try {
      const { normalEqu, normalizeReposiveness, frequenciesCount, audioScale } = app.props;

      if (normalEqu) {
        for (let i = 63; i >= 0; i--) {
          if (i == 0)
            this.smooth[i] = (audioArray[i] + audioArray[i + 1]) * 0.5;
          else if (i == 63)
            this.smooth[i] = (audioArray[i - 1] + audioArray[i]) * 0.5;
          else
            this.smooth[i] = (audioArray[i - 1] + 2 * audioArray[i] + audioArray[i + 1]) * 0.25;
        }
      } else {
        for (let i = 0; i < 64; i++)
          this.smooth[i] = audioArray[i];
      }

      for (let i = 63; i >= 0; i--) {
        this.audioSampleDub[i] = this.smooth[i] * normalizeReposiveness + this.audioSampleDub[i] * (1 - normalizeReposiveness)
        this.audioSample[i] = this.audioSampleDub[i];
        this.audioSample[i] *= audioScale;
      }

      let sum = 0;
      for (let i = 0; i < frequenciesCount; i++)
        sum += this.audioSample[i];
      this.sumValue = sum / frequenciesCount;
    } catch (e) {
      debug.UpdateEntry('audiomanager_error', `AudioManager::Error: ${e}`);
    }
  }
}
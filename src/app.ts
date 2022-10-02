class App {
  audioManager: AudioManager;
  props: WallpaperProperties;
  eyes: Eyes;

  Init() {
    try {
      this.audioManager = new AudioManager();
      this.props = new WallpaperProperties();
      this.eyes = new Eyes();

      this.audioManager.Init();
      this.props.Init();
      this.eyes.Init();

      debug.AddEntry('app_init', 'No errors on init!');
    } catch (e) {
      debug.AddEntry('app_init', `${e}`);
    }

    debug.AddEntry('--mouth', '0');

    this.Update();
  }

  Update() {
    window.requestAnimationFrame(() => this.Update());

    const root = document.documentElement;
    const val = this.audioManager.sumValue > 1 ? 1 : this.audioManager.sumValue;
    root.style.setProperty('--mouth', `${val}`);

    // Debug mouth value
    debug.UpdateEntry('--mouth', `--mouth: ${val}`);
    debug.MoveEntryToTheEnd('--mouth');
  }
}
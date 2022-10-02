class Eyes {
  frameCount: number = 7;
  currentFrame: number = 0;
  divElement: HTMLDivElement;
  img: HTMLImageElement;

  Init() {
    this.divElement = document.getElementById('eyes') as HTMLDivElement;
    this.TimerDelay();
  }

  TimerDelay() {
    const { eyesDelay } = app.props;
    setTimeout(() => this.TimerDelay(), eyesDelay);

    this.currentFrame = 0;
    this.Update();
  }

  Update() {
    if (this.currentFrame === this.frameCount) {
      this.divElement.style.display = 'none';
      return;
    }

    const { eyesFramerate } = app.props;

    this.divElement.style.backgroundImage = `url(./img/eyes${this.currentFrame}.png)`;
    if (this.currentFrame === 0)
      this.divElement.style.display = 'block';
    this.currentFrame++;
    setTimeout(() => this.Update(), 1000 / eyesFramerate);
  }
}
class WallpaperProperties {
  showDebug: boolean = false;

  normalEqu: boolean = true;
  normalizeReposiveness: number = 0.5;
  audioScale: number = 1.0;
  frequenciesCount: number = 4;

  eyesDelay: number = 3000;
  eyesFramerate: number = 10;

  Init() {
    window.wallpaperPropertyListener = {
      applyUserProperties: (properties) => this.ApplyUserProperties(properties)
    }
  }

  CheckParameter(properties: any, name: string, propId: string): boolean {
    if (!debug.EntryExist(propId))
      debug.AddEntry(propId, `props::${name}: undefined`);

    const def = this[name];
    if (def === undefined) {
      debug.UpdateEntry(propId, `props::${name} Error: !NOT_EXIST_IN_CLASS!`);
      return false;
    }

    return properties[name] !== undefined;
  }

  CheckSlider(properties: any, name: string, use100: boolean = false): boolean {
    const propId = `props_slider_${name}`;
    if (!this.CheckParameter(properties, name, propId))
      return false;

    const { value } = properties[name];
    this[name] = value * (use100 ? 0.01 : 1);
    debug.UpdateEntry(propId, `props(number)::${name}: ${this[name]}`);

    return true;
  }

  CheckBoolean(properties: any, name: string): boolean {
    const propId = `props_bool_${name}`;
    if (!this.CheckParameter(properties, name, propId))
      return false;

    const { value } = properties[name];
    this[name] = value;
    debug.UpdateEntry(propId, `props(boolean)::${name}: ${this[name]}`);

    return true;
  }

  ApplyUserProperties(properties) {
    if (!properties)
      return;

    if (this.CheckBoolean(properties, 'showDebug'))
      debug.element.style.display = this.showDebug ? 'block' : 'none';

    ['normalEqu']
      .forEach(bool => this.CheckBoolean(properties, bool));

    ['normalizeReposiveness',
      'audioScale']
      .forEach(slider100 => this.CheckSlider(properties, slider100, true));

    ['frequenciesCount',
      'eyesDelay',
      'eyesFramerate']
      .forEach(slider => this.CheckSlider(properties, slider));
  }


}
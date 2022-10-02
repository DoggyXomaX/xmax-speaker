class EntryID {
  id: string;
  value: string;
  constructor(id: string, value: string) {
    this.id = id;
    this.value = value;
  }
}

class Debugger {
  buffer: EntryID[];
  element: HTMLDivElement;
  Init() {
    this.buffer = new Array<EntryID>();

    this.element = document.getElementById('debug') as HTMLDivElement;

    this.AddEntry('debug_init', 'Debug initialized!');
  }

  AddEntry(id: string, value: string) {
    this.buffer.push(new EntryID(id, value));

    this.Update();
  }

  RemoveEntryByIndex(index: number): EntryID {
    if (index < 0 || index >= this.buffer.length)
      return new EntryID('', `Index ${index} not found`);

    const entry = this.buffer.splice(index, 1)[0]
    this.Update();

    return entry;
  }

  RemoveEntryById(id: string) {
    return this.RemoveEntryByIndex(
      this.buffer.findIndex(entry => entry.id === id)
    );
  }

  UpdateEntry(id: string, newValue: string) {
    const entryIndex = this.buffer.findIndex(entry => entry.id === id);
    if (entryIndex === -1)
      return;
    this.buffer[entryIndex].value = newValue;
    this.Update();
  }

  MoveEntryToTheEnd(id: string) {
    const entryIndex = this.buffer.findIndex(entry => entry.id === id);
    if (entryIndex === -1)
      return;
    const splicedEntry = this.buffer.splice(entryIndex, 1)[0];
    this.buffer.push(splicedEntry);
    this.Update();
  }

  EntryExist(id: string): boolean {
    return this.buffer.some(entry => entry.id === id);
  }

  Clear() {
    this.buffer = new Array<EntryID>();
    this.Update();
  }

  Update() {
    const buf = this.buffer.map(entry => entry.value);
    this.element.innerHTML = buf.join('<br>');
  }
}
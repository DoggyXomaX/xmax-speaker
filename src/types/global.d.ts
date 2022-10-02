export { }; // needed to make TypeScript happy

type AudioBufferFunc = (buffer: number[]) => void;

declare global {
  interface Window {
    wallpaperPropertyListener: {
      applyUserProperties: (properties: any) => void;
    }
    wallpaperRegisterAudioListener: (callback: AudioBufferFunc) => void;
  }
}
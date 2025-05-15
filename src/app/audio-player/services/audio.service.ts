import { effect, Injectable, signal } from '@angular/core';
import { Song } from '../types/song';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public playing = signal<boolean>(false);
  public repeat = signal<boolean>(false);
  public random = signal<boolean>(false);

  public selectedSong = signal<Song | null>(null);

  public indexDBStoreName = 'songs';
  public allSongs: Song[] = [];

  private audio = new Audio();

  isPlaying = this.playing.asReadonly();
  isRandom = this.random.asReadonly();

  constructor() {
    // Effect to update audio.loop when repeat changes
    effect(() => {
      this.audio.loop = this.repeat();
    });

    // Listen for the 'ended' event to play the next song
    this.audio.addEventListener('ended', () => {
      this.next();
    });
  }

  selectSong(song: Song): void {
    this.selectedSong.set(song);
    this.audio.src = URL.createObjectURL(song.file);
  }

  play(): void {
    this.audio.play();
    this.playing.set(true);
  }

  pause(): void {
    this.audio.pause();
    this.playing.set(false);
  }

  next(): void {
    if (this.allSongs.length === 0) return;

    let currentSongIndex = this.allSongs.findIndex(song => song.id === this.selectedSong()?.id);
    if (this.isRandom()) {
      // TODO: crear array nueva de canciones con orden aleatorio en vez de usar Math.random ya que puede dar la misma cancion y es mejor luego para el previous()
      currentSongIndex = Math.floor(Math.random() * this.allSongs.length);
    } else {
      currentSongIndex = (currentSongIndex + 1) % this.allSongs.length;
    }

    this.selectSong(this.allSongs[currentSongIndex]);
    this.play();
  }

  toggleRandom(): void {
    this.random.set(!this.random());
  }
}

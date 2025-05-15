import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../services/audio.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-controls',
  imports: [MatButtonModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss'
})
export class ControlsComponent {
  isPlaying = false;

  constructor(public audioService: AudioService) { }

  togglePlay(): void {
    if (this.audioService.isPlaying()) {
      this.audioService.pause();
    } else {
      this.audioService.play();
    }
    this.isPlaying = this.audioService.isPlaying();

  }

  nextSong(): void {
    this.audioService.next();
  }
  previousSong(): void {
    console.log('Previous song');
    // Implement logic to play the previous song
  }

  toggleRandom(): void {
    this.audioService.toggleRandom();
  }
  toggleRepeat(): void {
    this.audioService.repeat.set(!this.audioService.repeat());
  }

}

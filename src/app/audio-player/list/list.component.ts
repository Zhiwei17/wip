import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AudioService } from '../services/audio.service';
import { Song } from '../types/song';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-list',
  imports: [MatListModule, MatIconModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  constructor(public audioService: AudioService) { }

  @Input() songs: Song[] = [];

  ngOnInit(): void {
    console.log('Songs:', this.songs);
  }

  clickSong(song: Song): void {
    console.log('Selected song:', song);
    this.audioService.selectSong(song);  
    this.audioService.play();
  }


}

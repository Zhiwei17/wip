import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexedDbService } from '../../storage/indexed-db.service';
import { AudioService } from '../services/audio.service';
import { ControlsComponent } from '../controls/controls.component';
import { ListComponent } from '../list/list.component';
import { Song } from '../types/song';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-player',
  imports: [ControlsComponent, ListComponent, CommonModule, MatIconModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  constructor(
    private dbService: IndexedDbService,
    public audioService: AudioService
  ) { }

  ngOnInit(): void {
    this.dbService.init(this.audioService.indexDBStoreName).then(() => {
      console.log('IndexedDB initialized');
      this.dbService.listAll<Song>(this.audioService.indexDBStoreName).then(records => {
        this.audioService.allSongs = records;
        console.log('All records:', this.audioService.allSongs);
      });
    }).catch(error => {
      console.error('Error initializing IndexedDB:', error);
    });
 
  }

  onFileUploaded(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {
      for (const file of files) {
        console.log('Selected file:', file.name);
        console.log('Selected file:', file);
        this.dbService.save(this.audioService.indexDBStoreName, { name: file.name, file }).then(id => {
          console.log('File saved with ID:', id);
          this.dbService.listAll<Song>(this.audioService.indexDBStoreName).then(records => {
            
            this.audioService.allSongs = records;
            const record = records.find((record) => {
              return record.id === id;
            });

            console.log('Record found:', record);
          });
        });
      }

    }
  }

  refreshPage(): void {
    window.location.reload();
  }
  
}

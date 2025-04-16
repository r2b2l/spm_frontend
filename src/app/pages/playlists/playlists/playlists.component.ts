import { Component, OnInit } from '@angular/core';
import { SimpleTableComponent } from '../../shared/simple-table/simple-table.component';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { TablePlaceholderComponent } from '../../placeholders/table-placeholder/table-placeholder.component';
import { Router } from '@angular/router';

// Todo: Create a PlaylistModel interface
interface PlaylistModel {
  platform: string;
  name: string;
  tracksNumber: number;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
    selector: 'app-playlists',
    imports: [SimpleTableComponent, TablePlaceholderComponent],
    templateUrl: './playlists.component.html',
    styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent implements OnInit {

  isLoading: boolean = false;
  playlists: Array<any> = [];

  columns: { key: keyof PlaylistModel; label: string }[] = [
    { key: 'platform', label: 'Plateforme' },
    { key: 'name', label: 'Playlist' },
    { key: 'tracksNumber', label: 'Nombre de morceaux' },
    { key: 'createdAt', label: 'Ajouté le' },
    { key: 'updatedAt', label: 'Dernière mise à jour' }
  ];

  constructor(private playlistService: PlaylistService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    // Fetch all playlists
    this.getPlaylists();
  }

  /**
   * Initialise loading state and playlists array
   */
  loadPlaylists(): void {
    this.isLoading = true;
    this.playlists = [];
  }

  /**
   * Set loading state to false
   */
  DoneLoadPlaylists(): void {
    this.isLoading = false;
  }

  /**
   * Fetch all playlists from the database
   */
  getPlaylists(): void {
    this.loadPlaylists();
    this.playlistService.getPlaylists().subscribe((data: any) => {
      data.forEach((playlist: any) => {
        playlist.platform = playlist.platform.name;
        
        // display dates to clearer format
        playlist.createdAt = new Date(playlist.createdAt).toLocaleDateString();
        playlist.updatedAt = new Date(playlist.updatedAt).toLocaleDateString();

        // Todo : If name is 'Spotify', replace with a Spotify logo
        // if (playlist.platform === 'Spotify') {
          // playlist.platform = '<img src="assets/spotify.png" alt="Spotify" />';
        // }
      });


      // order the playlists by date descending
      data.sort((a: any, b: any) => {
        return b.tracksNumber - a.tracksNumber;
      });
      this.playlists = data;
      this.DoneLoadPlaylists();
    });
  }

  /**
   * Handle row action
   * @param row The row object
   */
  onRowAction(row: any) {
    // console.log('Navigate to: /playlists/' + row.id);
    this.router.navigate(['/playlists/', row.id]);
  }
}

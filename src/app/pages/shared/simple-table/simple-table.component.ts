import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-simple-table',
    imports: [FormsModule],
    templateUrl: './simple-table.component.html',
    styleUrl: './simple-table.component.scss'
})
export class SimpleTableComponent<T extends { [key: string]: any }> {
  @Input() columns: ReadonlyArray<{ key: keyof T; label: string }> = [];
  @Input() data: T[] = [];
  @Input() rowsPerPage = 5;
  @Input() actionLabel = ''; // Libellé du bouton d'action
  @Output() actionClicked = new EventEmitter<T>(); // Événement pour envoyer les données

  sortedColumn: keyof T | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;

  /**
   * Renvoie les données triées selon la colonne et le sens de tri actuels.
   * Si aucune colonne n'est triée, renvoie les données paginées.
   * @returns Les données triées
   */
  get sortedData(): T[] {
    if (!this.sortedColumn) return this.paginatedData;
    return [...this.paginatedData].sort((a, b) => {
      const valA = a[this.sortedColumn!];
      const valB = b[this.sortedColumn!];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return this.sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return this.sortDirection === 'asc' ? +valA - +valB : +valB - +valA;
      }
    });
  }

  /**
   * Renvoie les données paginées selon la page actuelle et le nombre de lignes par page.
   * @returns Les données paginées
   */
  get paginatedData(): T[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.data.slice(start, start + this.rowsPerPage);
  }

  /**
   * Renvoie le nombre total de pages.
   * @returns Le nombre total de pages
   */
  get totalPages(): number {
    return Math.ceil(this.data.length / this.rowsPerPage);
  }

  /**
   * Change la page actuelle.
   * @param page La nouvelle page
   */
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /**
   * Change la colonne de tri et le sens de tri.
   * Si la colonne est déjà triée, inverse le sens de tri.
   * @param column La colonne à trier
   */
  sort(column: keyof T) {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
  }

  /**
   * Émet l'événement d'action sur une ligne.
   * @param row La ligne sur laquelle l'action a été effectuée
   */
  onActionClick(row: T) {
    this.actionClicked.emit(row);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Box } from '../../models/box.model';
import { ApiService } from '../../services/api.service';
import { PanierService } from '../../services/panier.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  boxes: Box[] = [];
  loading: boolean = true;
  error: string = '';
  selectedBox: Box | null = null;
  showFilterModal: boolean = false;
  addedBoxIds = new Set<number>();
  favoriteIds = new Set<number>();
  isLoggedIn: boolean = false;

  allFlavors: string[] = [];
  selectedFlavors = new Set<string>();
  currentSort: 'default' | 'price_asc' | 'price_desc' | 'name' = 'default';
  showFavoritesOnly: boolean = false;
  filterMode: 'OR' | 'AND' = 'OR';

  constructor(
    private apiService: ApiService,
    private panierService: PanierService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadBoxes();
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) this.loadFavorites();
      else this.favoriteIds.clear();
    });
  }

  loadBoxes(): void {
    this.apiService.getBoxes().subscribe({
      next: (boxes) => {
        this.boxes = boxes;
        this.loading = false;
        this.extractFlavors();
      },
      error: (err) => {
        this.error = 'Erreur chargement';
        this.loading = false;
      }
    });
  }

  loadFavorites(): void {
    this.apiService.getFavoriteIds().subscribe(ids => this.favoriteIds = new Set(ids));
  }

  extractFlavors(): void {
    const flavors = new Set<string>();
    this.boxes.forEach(box => {
      if (box.flavors) box.flavors.forEach(f => flavors.add(f));
    });
    this.allFlavors = Array.from(flavors).sort();
  }

  get filteredBoxes(): Box[] {
    let result = [...this.boxes];
    if (this.showFavoritesOnly) result = result.filter(b => this.favoriteIds.has(b.id));
    if (this.selectedFlavors.size > 0) {
      result = result.filter(box => {
        if (!box.flavors) return false;
        if (this.filterMode === 'OR') return box.flavors.some(f => this.selectedFlavors.has(f));
        else {
          const selectedArray = Array.from(this.selectedFlavors);
          return selectedArray.every(f => box.flavors.includes(f));
        }
      });
    }
    switch (this.currentSort) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }

  toggleFilterModal(): void {
    this.showFilterModal = !this.showFilterModal;
    document.body.style.overflow = this.showFilterModal ? 'hidden' : 'auto';
  }

  toggleFlavorFilter(flavor: string): void {
    if (this.selectedFlavors.has(flavor)) this.selectedFlavors.delete(flavor);
    else this.selectedFlavors.add(flavor);
  }

  setFilterMode(mode: 'OR' | 'AND'): void { this.filterMode = mode; }
  setSort(sort: 'default' | 'price_asc' | 'price_desc' | 'name'): void { this.currentSort = sort; }
  
  resetFilters(): void {
    this.selectedFlavors.clear();
    this.currentSort = 'default';
    this.showFavoritesOnly = false;
    this.filterMode = 'OR';
  }

  toggleFavoriteFilter(): void { this.showFavoritesOnly = !this.showFavoritesOnly; }
  
  ajouterAuPanier(box: Box, event?: Event): void {
    if (event) event.stopPropagation();
    this.panierService.ajouterAuPanier(box);
    this.addedBoxIds.add(box.id);
    setTimeout(() => this.addedBoxIds.delete(box.id), 2000);
  }
  isAdded(boxId: number): boolean { return this.addedBoxIds.has(boxId); }

  toggleFavorite(box: Box, event: Event): void {
    event.stopPropagation();
    if (!this.isLoggedIn) {
      this.toastService.show('🔒 Connectez-vous pour ajouter aux favoris', 'error');
      return;
    }
    if (this.favoriteIds.has(box.id)) this.favoriteIds.delete(box.id);
    else this.favoriteIds.add(box.id);
    this.apiService.toggleFavorite(box.id).subscribe({
      error: () => { if (this.favoriteIds.has(box.id)) this.favoriteIds.delete(box.id); else this.favoriteIds.add(box.id); }
    });
  }
  isFavorite(boxId: number): boolean { return this.favoriteIds.has(boxId); }

  openModal(box: Box): void { this.selectedBox = box; document.body.style.overflow = 'hidden'; }
  closeModal(): void { this.selectedBox = null; document.body.style.overflow = 'auto'; }
}
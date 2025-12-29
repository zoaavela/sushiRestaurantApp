import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Box } from '../models/box.model';

export interface ItemPanier {
  box: Box;
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private panier: ItemPanier[] = [];
  private panierSubject = new BehaviorSubject<ItemPanier[]>([]);

  panier$ = this.panierSubject.asObservable();

  ajouterAuPanier(box: Box, quantite: number = 1): void {
    const existingItem = this.panier.find(item => item.box.id === box.id);
    
    if (existingItem) {
      existingItem.quantite += quantite;
    } else {
      this.panier.push({ box, quantite });
    }
    
    this.panierSubject.next([...this.panier]);
  }

  retirerDuPanier(boxId: number): void {
    this.panier = this.panier.filter(item => item.box.id !== boxId);
    this.panierSubject.next([...this.panier]);
  }

  modifierQuantite(boxId: number, quantite: number): void {
    const item = this.panier.find(item => item.box.id === boxId);
    if (item) {
      if (quantite <= 0) {
        this.retirerDuPanier(boxId);
      } else {
        item.quantite = quantite;
        this.panierSubject.next([...this.panier]);
      }
    }
  }

  viderPanier(): void {
    this.panier = [];
    this.panierSubject.next([]);
  }

  getTotal(): number {
    return this.panier.reduce((total, item) => total + (item.box.price * item.quantite), 0);
  }

  getNombreItems(): number {
    return this.panier.reduce((total, item) => total + item.quantite, 0);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PanierService, ItemPanier } from '../../services/panier.service';
import { AuthService } from '../../services/auth.service'; // Ajout

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {
  panier: ItemPanier[] = [];
  total: number = 0;

constructor(
    private panierService: PanierService,
    private router: Router,
    private authService: AuthService // Injection
  ) {}

  ngOnInit(): void {
    this.panierService.panier$.subscribe(panier => {
      this.panier = panier;
      this.total = this.panierService.getTotal();
    });
  }

  modifierQuantite(boxId: number, quantite: number): void {
    this.panierService.modifierQuantite(boxId, quantite);
  }

  retirerItem(boxId: number): void {
    this.panierService.retirerDuPanier(boxId);
  }

  viderPanier(): void {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      this.panierService.viderPanier();
    }
  }

  passerCommande(): void {
    if (this.panier.length > 0) {
        if (this.authService.isLoggedIn()) {
        this.router.navigate(['/commande']);
      } else {
        // Redirection explicite vers le login
        alert("🔒 Vous devez être connecté pour valider votre commande.");
        this.router.navigate(['/login']);
      }
    }
  }
}
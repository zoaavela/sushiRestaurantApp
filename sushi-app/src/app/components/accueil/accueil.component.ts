import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { PanierService } from '../../services/panier.service';
import { ToastService } from '../../services/toast.service';
import { Box } from '../../models/box.model';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  featuredBoxes: Box[] = [];
  contactForm: FormGroup;
  loading: boolean = true;

  // NOUVEAU : Pour gérer l'animation des boutons
  addedBoxIds = new Set<number>();

  constructor(
    private apiService: ApiService,
    private panierService: PanierService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.apiService.getBoxes().subscribe({
      next: (boxes) => {
        this.featuredBoxes = boxes.slice(0, 3);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  // MODIFIÉ : Animation bouton au lieu du Toast
  addToCart(box: Box): void {
    this.panierService.ajouterAuPanier(box);

    // 1. Feedback Visuel sur le bouton
    this.addedBoxIds.add(box.id);

    // 2. Reset après 2 secondes
    setTimeout(() => {
      this.addedBoxIds.delete(box.id);
    }, 2000);
  }

  // Helper pour le HTML
  isAdded(boxId: number): boolean {
    return this.addedBoxIds.has(boxId);
  }

  sendContact(): void {
    if (this.contactForm.valid) {
      this.toastService.show('📩 Message envoyé ! Nous vous répondrons vite.');
      this.contactForm.reset();
    } else {
      this.toastService.show('⚠️ Veuillez remplir correctement le formulaire.', 'error');
    }
  }
}
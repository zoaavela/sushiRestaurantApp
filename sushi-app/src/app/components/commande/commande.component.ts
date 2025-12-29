// DANS src/app/components/commande/commande.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanierService, ItemPanier } from '../../services/panier.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { User } from '../../models/user.model';
import { finalize, take } from 'rxjs/operators';
import { Commande } from '../../models/commande.model';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit {
  commandeForm: FormGroup;
  panier: ItemPanier[] = [];
  currentUser: User | null = null;

  sousTotal: number = 0;
  remiseEtudiant: number = 0;
  remiseVolume: number = 0;
  remisePromo: number = 0;
  totalFinal: number = 0;


  submitting: boolean = false;
  showSuccessModal: boolean = false;
  promoError: string | null = null;
  confirmedOrderInfo: any = null;

  constructor(
    private fb: FormBuilder,
    private panierService: PanierService,
    private apiService: ApiService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.commandeForm = this.createForm();

    this.commandeForm.get('codePromo')?.valueChanges.subscribe(() => {
      this.promoError = null;
      this.calculerTotaux();
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (this.panier.length > 0) this.calculerTotaux();
    });

    // 1. Check initial (Redirection si on arrive avec un panier vide)
    this.panierService.panier$.pipe(take(1)).subscribe(panier => {
      if (panier.length === 0) {
        this.router.navigate(['/menu']);
      }
    });

    // 2. Mise à jour continue (SANS redirection dynamique)
    this.panierService.panier$.subscribe(panier => {
      this.panier = panier;
      this.calculerTotaux();
    });
  }

  calculerTotaux(): void {
    this.sousTotal = this.panierService.getTotal();
    let tempTotal = this.sousTotal;

    if (this.currentUser && this.currentUser.status === 'student') {
      this.remiseEtudiant = tempTotal * 0.10;
      tempTotal -= this.remiseEtudiant;
    } else {
      this.remiseEtudiant = 0;
    }

    if (tempTotal > 50) {
      this.remiseVolume = tempTotal * 0.015;
      tempTotal -= this.remiseVolume;
    } else {
      this.remiseVolume = 0;
    }

    // REMISE PROMO
    const code = this.commandeForm?.get('codePromo')?.value;
    if (code === 'OISHI2026') {
      this.remisePromo = tempTotal * 0.20;
      tempTotal -= this.remisePromo;
    } else {
      this.remisePromo = 0;
    }

    this.remiseEtudiant = Math.round(this.remiseEtudiant * 100) / 100;
    this.remiseVolume = Math.round(this.remiseVolume * 100) / 100;
    this.remisePromo = Math.round(this.remisePromo * 100) / 100;
    this.totalFinal = Math.round(tempTotal * 100) / 100;
  }

  createForm(): FormGroup {
    return this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      adresse: ['', [Validators.required, Validators.minLength(5)]],
      notes: [''],
      codePromo: ['']
    });
  }

  markFormGroupTouched(): void {
    Object.keys(this.commandeForm.controls).forEach(key => {
      this.commandeForm.get(key)?.markAsTouched();
    });
  }

  soumettreCommande(): void {
    if (this.commandeForm.valid && this.panier.length > 0) {
      this.submitting = true;

      const commande: Commande = {
        client: this.commandeForm.value,
        items: this.panier.map(item => ({
          boxId: item.box.id,
          quantite: item.quantite,
          prix: item.box.price,
          boxName: item.box.name
        })),
        total: this.totalFinal,
        statut: 'on_site_payment',
        codePromo: this.commandeForm.get('codePromo')?.value
      };

      this.apiService.creerCommande(commande).subscribe({
        next: (response: { order_id: number }) => {

          // ÉTAPE 1: Mise à jour des statistiques utilisateur (ASYNCHRONE)
          this.authService.fetchUser().pipe(
            finalize(() => {
              this.submitting = false;
            })
          ).subscribe({
            next: () => {
              console.log("Stats rafraîchies dans AuthService.");
            },
            error: (err) => {
              console.error("Erreur de rafraîchissement du profil (mais commande OK):", err);
            }
          });

          // ÉTAPE 2: Affichage de la modale de succès
          this.confirmedOrderInfo = {
            id: response.order_id,
            items: [...this.panier],
            total: this.totalFinal
          };
          this.showSuccessModal = true;
          this.panierService.viderPanier();

        },
        error: (error: any) => {
          this.submitting = false;
          console.error('Erreur commande:', error);
          let msg = error.error?.error || 'Erreur technique. Veuillez réessayer.';

          // Si c'est une erreur liée au code promo (403 ou message spécifique)
          if (error.status === 403 || msg.includes('code promo')) {
            this.promoError = "Ce code promo a déjà été utilisé sur votre compte.";
          } else {
            this.toastService.show(`❌ ${msg}`, 'error');
          }
        }
      });
    } else {
      this.toastService.show('⚠️ Veuillez remplir les champs obligatoires.', 'error');
      this.markFormGroupTouched();
    }
  }

  closeModalAndRedirect(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/']);
  }


}
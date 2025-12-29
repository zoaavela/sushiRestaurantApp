// DANS src/app/components/profil/profil.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  commandes: any[] = [];
  loadingHistory: boolean = true;
  showAllOrders: boolean = false;
  
  showEditModal: boolean = false;
  editForm: FormGroup;
  showSuccessModal: boolean = false; 
  
  private userSubscription!: Subscription; 

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.editForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null],
      ville: [null],
      code_postal: [null],
      password: ['']
    });
  }

  ngOnInit(): void {
    // Abonnement pour afficher les détails du profil
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
        if (user) {
            this.patchFormValues(user);
        }
    });
    
    // LOGIQUE SIMPLE : Charge l'historique au chargement du composant
    this.loadOrdersHistory();
  }

  ngOnDestroy(): void {
      if (this.userSubscription) {
          this.userSubscription.unsubscribe();
      }
  }

  loadOrdersHistory(): void {
    this.loadingHistory = true; 
    this.apiService.getMesCommandes().subscribe({
      next: (data) => {
        this.commandes = data;
        this.loadingHistory = false;
      },
      error: (err) => {
        console.error("Erreur de chargement de l'historique:", err);
        this.loadingHistory = false;
        this.toastService.show("Impossible de charger l'historique des commandes.", 'error');
      }
    });
  }
  
  patchFormValues(user: User): void {
     this.editForm.patchValue({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        age: user.age,
        ville: user.ville,
        code_postal: user.code_postal,
    });
  }

  logout(): void {
    this.authService.logout();
  }

  getStatusLabel(status: string): string {
    const statusMap: any = {
      'paid': 'Payée',
      'on_site_payment': 'Paiement sur place', 
      'pending': 'En attente', 
      'completed': 'Terminée', 
      'cancelled': 'Annulée'
    };
    return statusMap[status] || status;
  }
  
  toggleHistory(): void {
    this.showAllOrders = !this.showAllOrders;
  }
  
  openEditModal(): void {
    if (this.currentUser) {
      this.showEditModal = true;
      document.body.style.overflow = 'hidden';
      this.editForm.patchValue({
        firstname: this.currentUser.firstname,
        lastname: this.currentUser.lastname,
        email: this.currentUser.email,
        age: this.currentUser.age,
        ville: this.currentUser.ville,
        code_postal: this.currentUser.code_postal,
        password: ''
      });
    }
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editForm.reset(); 
    document.body.style.overflow = 'auto'; 
  }
  
  closeSuccessModal(): void {
    this.showSuccessModal = false;
    document.body.style.overflow = 'auto';
  }

  saveProfile(): void {
    if (this.editForm.valid && this.currentUser) {
      const data = this.editForm.value;
      
      if (!data.password) {
        delete data.password;
      }
      data.age = data.age ? Number(data.age) : null;
      data.code_postal = data.code_postal || null; 
      data.ville = data.ville || null; 
      
      this.apiService.updateProfile(data).subscribe({
        next: (response: any) => {
          
          this.closeEditModal(); 
          
          this.currentUser = response.user; 
          this.authService.setUser(response.user); 
          
          this.showSuccessModal = true;
          document.body.style.overflow = 'hidden';
          
          // Recharger l'historique après modification
          this.loadOrdersHistory(); 

        },
        error: (err) => {
          console.error('Erreur de mise à jour:', err);
          this.closeEditModal(); 
          
          let errorMessage = 'Veuillez vérifier vos informations.';
          if (err.error && err.error.error) {
            errorMessage = err.error.error;
          }
          this.toastService.show(`❌ Erreur lors de la mise à jour: ${errorMessage}`, 'error');
        }
      });
    }
  }
}
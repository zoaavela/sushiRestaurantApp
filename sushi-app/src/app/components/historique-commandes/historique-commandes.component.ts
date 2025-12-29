import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-historique-commandes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './historique-commandes.component.html',
  styleUrl: './historique-commandes.component.css'
})
export class HistoriqueCommandesComponent implements OnInit {
  commandes: any[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMesCommandes().subscribe({
      next: (data) => {
        this.commandes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  getStatusLabel(status: string): string {
    const statusMap: any = {
      'paid': 'Payée',
      'en_attente': 'En attente',
      'ready': 'Prête',
      'completed': 'Terminée',
      'cancelled': 'Annulée'
    };
    return statusMap[status] || status;
  }
}
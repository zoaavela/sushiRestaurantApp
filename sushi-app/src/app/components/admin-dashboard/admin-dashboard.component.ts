import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { ApiService } from '../../services/api.service';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  stats: any = null;
  loading = true;

  // --- GRAPHIQUE LIGNE (CA) ---
  public lineChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: { line: { tension: 0.4 } },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888' } },
      x: { grid: { display: false }, ticks: { color: '#888' } }
    },
    plugins: { legend: { display: false } }
  };
  public lineChartType: ChartType = 'line';

  // --- GRAPHIQUE BATONS (SEMAINE) ---
  public barChartData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888', stepSize: 1 } },
      x: { grid: { display: false }, ticks: { color: '#888' } }
    }
  };
  public barChartType: ChartType = 'bar';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAdminStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.setupCharts(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur stats:', err);
        this.loading = false;
      }
    });
  }

  setupCharts(data: any) {
    // 1. Line Chart (Courbe CA)
    const dates = data.charts.revenue_timeline.map((d: any) => d.date);
    const revenues = data.charts.revenue_timeline.map((d: any) => Number(d.daily_ca));

    this.lineChartData = {
      labels: dates,
      datasets: [{
        data: revenues,
        label: 'CA (€)',
        backgroundColor: 'rgba(211, 47, 47, 0.1)',
        borderColor: '#d32f2f', // Rouge
        borderWidth: 2,
        pointBackgroundColor: '#121212',
        pointBorderColor: '#fff',
        pointRadius: 4,
        fill: 'origin',
        tension: 0.4
      }]
    };

    // 2. Bar Chart (Affluence Semaine)
    
    // --- TRADUCTION DES JOURS ICI ---
    const dayTranslation: { [key: string]: string } = {
        'Monday': 'Lundi',
        'Tuesday': 'Mardi',
        'Wednesday': 'Mercredi',
        'Thursday': 'Jeudi',
        'Friday': 'Vendredi',
        'Saturday': 'Samedi',
        'Sunday': 'Dimanche'
    };

    // On applique la traduction sur chaque jour reçu de l'API
    const days = data.charts.weekly_traffic.map((d: any) => dayTranslation[d.day_name] || d.day_name);
    const counts = data.charts.weekly_traffic.map((d: any) => Number(d.count));

    this.barChartData = {
      labels: days,
      datasets: [{
        data: counts,
        label: 'Commandes',
        backgroundColor: '#d32f2f', // Rouge Sushi
        hoverBackgroundColor: '#ffffff', // Blanc au survol
        borderRadius: 4,
        barThickness: 25
      }]
    };
  }
}
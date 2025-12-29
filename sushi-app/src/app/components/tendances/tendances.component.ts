import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-tendances',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tendances.component.html',
  styleUrl: './tendances.component.css'
})
export class TendancesComponent implements OnInit, AfterViewInit {
  stats: any = null;
  loading = true;
  private map: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Correction du bug d'affichage des icônes Leaflet par défaut
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.apiService.getPublicStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
        setTimeout(() => this.initMap(), 100); 
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {}

  private initMap(): void {
    if (!this.stats || !this.stats.map_data) return;

    if (this.map) {
      this.map.remove();
    }

    // 1. Configuration de la carte
    this.map = L.map('map', {
      center: [46.603354, 1.888334],
      zoom: 6,
      minZoom: 5,
      zoomControl: false,
      attributionControl: false
    });

    // 2. Fond de carte "Stadia Alidade Smooth Dark"
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 20
    }).addTo(this.map);

    // 3. Ajout des points
    this.stats.map_data.forEach((cityData: any) => {
      
      // Taille dynamique du cercle
      const rawSize = 20 + (cityData.count * 3);
      const size = Math.min(rawSize, 80); 

      // Icône animée (Pulse)
      const pulseIcon = L.divIcon({
        className: 'custom-marker-container',
        html: `<div class="pulsating-circle" style="width:${size}px; height:${size}px;"></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });

      const marker = L.marker([cityData.lat, cityData.lng], { icon: pulseIcon }).addTo(this.map);

      // ETIQUETTE LISIBLE & INTERACTIVE
      marker.bindTooltip(
        `
        <div class="map-label-content">
          <span class="city-name">${cityData.city}</span>
          <div class="count-wrapper">
            <span class="order-count">${cityData.count}</span>
            <span class="order-sub">Commandes</span>
          </div>
        </div>
        `,
        {
          permanent: true,
          direction: 'center',
          className: 'custom-tooltip',
          offset: [0, 0],
          // C'EST ICI LA MAGIE : Rend l'étiquette sensible à la souris
          interactive: true 
        }
      );
    });
  }
}
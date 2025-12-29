import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Box } from '../models/box.model';
import { Commande } from '../models/commande.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost/API/sushi_box/api';

  constructor(private http: HttpClient) { }

  // Helper pour les headers JSON
  private getJsonHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
  }

  getBoxes(): Observable<Box[]> {
    return this.http.get<any>(`${this.baseUrl}/boxes/index.php`, this.getJsonHeaders()).pipe(
      map(response => {
        // Gestion de la compatibilité : array direct ou objet avec propriété data
        const boxes = Array.isArray(response) ? response : (response.data || []);
        return boxes.map((box: any) => this.adaptBoxData(box));
      })
    );
  }

  getBox(id: number): Observable<Box> {
    return this.http.get<any>(`${this.baseUrl}/boxes/index.php?id=${id}`, this.getJsonHeaders()).pipe(
      map(response => {
        const data = response.data || response;
        return this.adaptBoxData(data);
      })
    );
  }

  // --- MODIFICATION ICI ---
  creerCommande(commande: Commande): Observable<any> {
    // On construit le paquet à envoyer au PHP
    const payload = {
      // 1. La liste des articles (format simplifié pour le PHP)
      items: commande.items.map(item => ({
        boxId: item.boxId,
        quantite: item.quantite
      })),

      // 2. CORRECTION ICI : On ajoute les infos du client (qui contiennent l'adresse)
      client: commande.client,

      // 3. CODE PROMO
      codePromo: commande.codePromo
    };

    return this.http.post(`${this.baseUrl}/orders/create.php`, payload, this.getJsonHeaders());
  }

  private adaptBoxData(boxData: any): Box {
    return {
      id: boxData.id,
      name: boxData.name,
      pieces: boxData.pieces,
      price: Number(boxData.price), // S'assurer que c'est un nombre
      image: boxData.image,
      available: true,
      foods: boxData.foods,
      flavors: boxData.flavors
    };
  }

  getAdminStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/stats.php`, this.getJsonHeaders());
  }

  getMesCommandes(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/orders/my_orders.php`, this.getJsonHeaders()).pipe(
      map(response => {
        return Array.isArray(response) ? response : (response.data || []);
      })
    );
  }

  getPublicStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/public/stats.php`, this.getJsonHeaders());
  }

  toggleFavorite(boxId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/favorites/toggle.php`, { box_id: boxId }, this.getJsonHeaders());
  }

  getFavoriteIds(): Observable<number[]> {
    return this.http.get<any>(`${this.baseUrl}/favorites/ids.php`, this.getJsonHeaders()).pipe(
      map(response => {
        return Array.isArray(response) ? response : (response.data || []);
      })
    );
  }

  updateProfile(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/update_user.php`, userData, this.getJsonHeaders());
  }
}

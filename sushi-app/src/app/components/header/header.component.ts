import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  nombreItems: number = 0;
  currentUser: User | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private panierService: PanierService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.panierService.panier$.subscribe(() => {
      this.nombreItems = this.panierService.getNombreItems();
    });
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  getUserInitials(): string {
    if (this.currentUser?.firstname && this.currentUser?.lastname) {
      return (this.currentUser.firstname.charAt(0) + this.currentUser.lastname.charAt(0)).toUpperCase();
    }
    return 'U';
  }
}
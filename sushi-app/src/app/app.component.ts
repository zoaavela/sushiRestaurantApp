import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
  template: `
    <app-header></app-header>
    
    <app-toast></app-toast>
    
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sushi-app';
}
import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { MenuComponent } from './components/menu/menu.component';
import { PanierComponent } from './components/panier/panier.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RgpdComponent } from './components/rgpd/rgpd.component';
import { CommandeComponent } from './components/commande/commande.component';
import { ProfilComponent } from './components/profil/profil.component';
import { TendancesComponent } from './components/tendances/tendances.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'tendances', component: TendancesComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rgpd', component: RgpdComponent },
  { path: 'commande', component: CommandeComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
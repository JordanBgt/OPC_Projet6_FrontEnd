import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopoComponent } from './topo/topo.component';
import { SpotComponent } from './spot/spot.component';
import { SecteurComponent } from './secteur/secteur.component';
import { VoieComponent } from './voie/voie.component';
import { LongueurComponent } from './longueur/longueur.component';
import { TopoDetailComponent } from './topo-detail/topo-detail.component';
import { SpotDetailComponent } from './spot-detail/spot-detail.component';
import { SecteurDetailComponent } from './secteur-detail/secteur-detail.component';
import { VoieDetailComponent } from './voie-detail/voie-detail.component';
import { LongueurDetailComponent } from './longueur-detail/longueur-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'topos', component: TopoComponent },
  { path: 'topos/:id', component: TopoDetailComponent },
  { path: 'spots', component: SpotComponent },
  { path: 'spots/:id', component: SpotDetailComponent },
  { path: 'secteurs', component: SecteurComponent },
  { path: 'secteurs/:id', component: SecteurDetailComponent },
  { path: 'voies', component: VoieComponent },
  { path: 'voies/:id', component: VoieDetailComponent },
  { path: 'longueurs', component: LongueurComponent },
  { path: 'longueurs/:id', component: LongueurDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

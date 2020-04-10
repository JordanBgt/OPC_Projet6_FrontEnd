import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopoComponent } from './entities/topo/topo.component';
import { SpotComponent } from './entities/spot/spot.component';
import { SecteurComponent } from './entities/secteur/secteur.component';
import { VoieComponent } from './entities/voie/voie.component';
import { LongueurComponent } from './entities/longueur/longueur.component';
import { TopoDetailComponent } from './entities/topo-detail/topo-detail.component';
import { SpotDetailComponent } from './entities/spot-detail/spot-detail.component';
import { SecteurDetailComponent } from './entities/secteur-detail/secteur-detail.component';
import { VoieDetailComponent } from './entities/voie-detail/voie-detail.component';
import { LongueurDetailComponent } from './entities/longueur-detail/longueur-detail.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'topos', component: TopoComponent },
  { path: 'topos/:id', component: TopoDetailComponent},
  { path: 'spots', component: SpotComponent },
  { path: 'spots/:id', component: SpotDetailComponent },
  { path: 'secteurs', component: SecteurComponent },
  { path: 'secteurs/:id', component: SecteurDetailComponent },
  { path: 'voies', component: VoieComponent },
  { path: 'voies/:id', component: VoieDetailComponent },
  { path: 'longueurs', component: LongueurComponent},
  { path: 'longueurs/:id', component: LongueurDetailComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

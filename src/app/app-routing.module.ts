import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopoComponent } from './entities/topo/topo.component';
import { SpotComponent } from './entities/spot/spot.component';
import { SecteurComponent } from './entities/secteur/secteur.component';
import { VoieComponent } from './entities/voie/voie.component';
import { LongueurComponent } from './entities/longueur/longueur.component';


const routes: Routes = [
  { path: 'topos', component: TopoComponent },
  { path: 'spots', component: SpotComponent },
  { path: 'secteurs', component: SecteurComponent },
  { path: 'voies', component: VoieComponent },
  { path: 'longueurs', component: LongueurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

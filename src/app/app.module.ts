import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentaireComponent } from './entities/commentaire/commentaire.component';
import { LongueurComponent } from './entities/longueur/longueur.component';
import { PhotoComponent } from './entities/photo/photo.component';
import { SecteurComponent } from './entities/secteur/secteur.component';
import { SpotComponent } from './entities/spot/spot.component';
import { TopoComponent } from './entities/topo/topo.component';
import { UtilisateurComponent } from './entities/utilisateur/utilisateur.component';
import { VoieComponent } from './entities/voie/voie.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentaireComponent,
    LongueurComponent,
    PhotoComponent,
    SecteurComponent,
    SpotComponent,
    TopoComponent,
    UtilisateurComponent,
    VoieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

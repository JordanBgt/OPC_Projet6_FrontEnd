import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentComponent } from './entities/comment/comment.component';
import { LongueurComponent } from './entities/longueur/longueur.component';
import { PhotoComponent } from './entities/photo/photo.component';
import { SecteurComponent } from './entities/secteur/secteur.component';
import { SpotComponent } from './entities/spot/spot.component';
import { TopoComponent } from './entities/topo/topo.component';
import { UserComponent } from './entities/user/user.component';
import { VoieComponent } from './entities/voie/voie.component';
import { LoginComponent } from './entities/login/login.component';
import { RegisterComponent } from './entities/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    LongueurComponent,
    PhotoComponent,
    SecteurComponent,
    SpotComponent,
    TopoComponent,
    UserComponent,
    VoieComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    NgbCollapseModule,
    NgbNavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

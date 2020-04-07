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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TopoDetailComponent } from './entities/topo-detail/topo-detail.component';
import { SecteurDetailComponent } from './entities/secteur/secteur-detail.component';
import { SpotDetailComponent } from './entities/spot/spot-detail.component';
import { VoieDetailComponent } from './entities/voie/voie-detail.component';
import { LongueurDetailComponent } from './entities/longueur/longueur-detail.component';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TopoUpdateComponent } from './entities/topo-update/topo-update.component';
import { MatExpansionModule } from '@angular/material/expansion';

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
    NavbarComponent,
    TopoDetailComponent,
    SecteurDetailComponent,
    SpotDetailComponent,
    VoieDetailComponent,
    LongueurDetailComponent,
    HomeComponent,
    TopoUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    NgbModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    InfiniteScrollModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

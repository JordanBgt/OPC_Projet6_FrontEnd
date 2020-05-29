import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentComponent } from './comment/comment.component';
import { LongueurComponent } from './longueur/longueur.component';
import { PhotoComponent } from './photo/photo.component';
import { SecteurComponent } from './secteur/secteur.component';
import { SpotComponent } from './spot/spot.component';
import { TopoComponent } from './topo/topo.component';
import { UserComponent } from './user/user.component';
import { VoieComponent } from './voie/voie.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TopoDetailComponent } from './topo-detail/topo-detail.component';
import { SecteurDetailComponent } from './secteur-detail/secteur-detail.component';
import { SpotDetailComponent } from './spot-detail/spot-detail.component';
import { VoieDetailComponent } from './voie-detail/voie-detail.component';
import { LongueurDetailComponent } from './longueur-detail/longueur-detail.component';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TopoUpdateComponent } from './topo-update/topo-update.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SpotUpdateComponent } from './spot-update/spot-update.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NumberToStringPipe } from './shared/number-to-string-pipe';
import { SecteurUpdateComponent } from './secteur-update/secteur-update.component';
import { LongueurUpdateComponent } from './longueur-update/longueur-update.component';
import { VoieUpdateComponent } from './voie-update/voie-update.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { authInterceptorProviders } from './security/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthGuardService } from './security/auth-guard.service';
import { httpErrorInterceptorProviders } from './http-error-interceptor';
import { MaterialFileInputModule } from 'ngx-material-file-input';

registerLocaleData(localeFr, 'fr');

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
    TopoUpdateComponent,
    SpotUpdateComponent,
    NumberToStringPipe,
    SecteurUpdateComponent,
    LongueurUpdateComponent,
    VoieUpdateComponent,
    CommentDialogComponent,
    ProfileComponent
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
    MatExpansionModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MaterialFileInputModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr'},
     authInterceptorProviders,
     AuthGuardService,
     httpErrorInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [CommentDialogComponent]
})
export class AppModule { }

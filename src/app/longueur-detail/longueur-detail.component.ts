import { Component, OnInit } from '@angular/core';
import { ILongueur, Longueur } from '../shared/model/longueur.model';
import { ICotation } from '../shared/model/cotation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CotationService } from '../services/cotation.service';
import { TokenStorageService } from '../security/token-storage.service';
import { isAdmin } from '../shared/auth-utils';
import { HTTP_STATUS_NOCONTENT } from '../../../app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LongueurService } from '../services/longueur.service';
import { IVoieLight } from '../shared/model/voie-light.model';
import { VoieService } from '../services/voie.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-longueur-detail',
  templateUrl: './longueur-detail.component.html',
  styleUrls: ['./longueur-detail.component.scss']
})
export class LongueurDetailComponent implements OnInit {

  longueur: ILongueur;
  longueurId: number;
  cotations: ICotation[];
  update = false;
  user: any;
  isAdmin: boolean;
  voies: IVoieLight[];

  constructor(private longueurService: LongueurService,
              private route: ActivatedRoute,
              private cotationService: CotationService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private snackBar: MatSnackBar,
              private voieService: VoieService) {
    this.cotations = [];
    this.voies = [];
  }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = isAdmin(this.user.roles);
    this.longueurId = +this.route.snapshot.paramMap.get('id');
    this.loadLongueur();
    this.loadCotations();
    this.loadVoies();
  }

  onUpdate() {
    this.update = true;
  }

  onDelete() {
    this.longueurService.deleteLongueur(this.longueurId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Longueur supprimée !', 'Ok', {duration: 5000});
          this.router.navigate(['longueurs']);
        } else {
          this.snackBar.open('Erreur lors de la suppression de la longueur !', 'Ok', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe();
  }

  loadLongueur() {
    this.longueurService.getOneLongueur(this.longueurId).pipe(
      tap((res: ILongueur) => this.longueur = res),
      catchError(error => throwError(error))
    ).subscribe();
  }

  loadCotations() {
    this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe();
  }

  loadVoies() {
    this.voieService.getAllVoies({unpaged: true}).pipe(
      tap((res: any) => res.content.forEach(voie => this.voies.push(voie))),
      catchError(error => throwError(error))
    ).subscribe();
  }

  updateLongueur(longueur: Longueur) {
    this.longueurService.updateLongueur(longueur, this.user.id).pipe(
      tap((res: ILongueur) => {
        this.longueur = res;
        this.update = false;
      }),
      catchError(error => throwError(error))
    ).subscribe();
  }
}

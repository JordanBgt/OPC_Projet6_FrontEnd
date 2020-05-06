import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
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

type EntityResponseType = HttpResponse<ILongueur>;

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
    let status: number;
    this.longueurService.deleteLongueur(this.longueurId).subscribe((res: any) => status = res.status,
      (error => console.error(error)),
      () => {
      if (status === HTTP_STATUS_NOCONTENT) {
        this.snackBar.open('Longueur supprimée !', 'Ok', {duration: 5000});
        this.router.navigate(['longueurs']);
      }
      });
  }

  loadLongueur() {
    this.longueurService.getOneLongueur(this.longueurId)
      .subscribe((res: EntityResponseType) => this.longueur = res.body);
  }

  loadCotations() {
    this.cotationService.getAllCotations()
      .subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body);
  }

  loadVoies() {
    this.voieService.getAllVoies({unpaged: true})
      .subscribe((res: HttpResponse<any>) => this.voies = res.body.content,
        (error => console.error(error)));
  }

  updateLongueur(longueur: Longueur) {
    this.longueurService.updateLongueur(longueur, this.user.id)
      .subscribe((res: EntityResponseType) => this.longueur = res.body,
        (error => console.error(error)),
        () => this.update = false);
  }
}

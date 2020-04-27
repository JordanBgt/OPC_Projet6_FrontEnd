import { Component, OnInit } from '@angular/core';
import { ISecteur, Secteur } from '../shared/model/secteur.model';
import { HttpResponse } from '@angular/common/http';
import { VoieLight } from '../shared/model/voie-light.model';
import { SecteurDetailService } from './secteur-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VoieService } from '../voie/voie.service';
import { TokenStorageService } from '../security/token-storage.service';
import { isAdmin } from '../shared/auth-utils';
import { HTTP_STATUS_NOCONTENT } from '../../../app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';

type EntityResponseType = HttpResponse<ISecteur>;

@Component({
  selector: 'app-secteur-detail',
  templateUrl: './secteur-detail.component.html',
  styleUrls: ['./secteur-detail.component.scss']
})
export class SecteurDetailComponent implements OnInit {

  secteur: ISecteur;
  secteurId: number;
  voies: VoieLight[];
  update = false;
  user: any;
  isAdmin: boolean;

  constructor(private secteurDetailService: SecteurDetailService,
              private route: ActivatedRoute,
              private voieService: VoieService,
              private tokenStorageService: TokenStorageService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = isAdmin(this.user.roles);
    this.secteurId = +this.route.snapshot.paramMap.get('id');
    this.loadSecteur();
    this.loadVoies();
  }

  onUpdate() {
    this.update = true;
  }

  onDelete() {
    let status: number;
    this.secteurDetailService.deleteSecteur(this.secteurId).subscribe((res: any) => status = res.status,
      (error => console.error(error)),
      () => {
      if (status === HTTP_STATUS_NOCONTENT) {
        this.snackBar.open('Secteur supprimé', 'Ok', {duration: 5000});
        this.router.navigate(['secteurs']);
      }
      });
  }

  loadSecteur() {
    this.secteurDetailService.getOneSecteur(this.secteurId)
      .subscribe((res: EntityResponseType) => this.secteur = res.body);
  }

  loadVoies() {
    this.voieService.getAllVoies({unpaged: true})
      .subscribe((res: HttpResponse<any>) => this.voies = res.body.content);
  }

  updateSecteur(secteur: Secteur) {
    this.secteurDetailService.updateSecteur(secteur, this.user.id).subscribe((res: EntityResponseType) => this.secteur = res.body,
      (error => console.error(error)),
      () => this.update = false);
  }

}

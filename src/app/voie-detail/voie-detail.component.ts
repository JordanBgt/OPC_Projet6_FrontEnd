import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { IVoie, Voie } from '../shared/model/voie.model';
import { ICotation } from '../shared/model/cotation.model';
import { LongueurLight } from '../shared/model/longueur-light.model';
import { CotationService } from '../services/cotation.service';
import { LongueurService } from '../services/longueur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../security/token-storage.service';
import { isAdmin } from '../shared/auth-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTP_STATUS_NOCONTENT } from '../../../app.constants';
import { VoieService } from '../services/voie.service';

type EntityResponseType = HttpResponse<IVoie>;

@Component({
  selector: 'app-voie-detail',
  templateUrl: './voie-detail.component.html',
  styleUrls: ['./voie-detail.component.scss']
})
export class VoieDetailComponent implements OnInit {

  voie: IVoie;
  voieId: number;
  cotations: ICotation[];
  longueurs: LongueurLight[];
  update = false;
  user: any;
  isAdmin: boolean;

  constructor(private voieService: VoieService,
              private cotationService: CotationService,
              private longueurService: LongueurService,
              private route: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = isAdmin(this.user.roles);
    this.voieId = +this.route.snapshot.paramMap.get('id');
    this.loadVoie();
    this.loadCotations();
    this.loadLongueurs();
  }

  onUpdate() {
    this.update = true;
  }

  onDelete() {
    let status: number;
    this.voieService.deleteVoie(this.voieId).subscribe((res: any) => status = res.status,
      (error => console.error(error)),
      () => {
      if (status === HTTP_STATUS_NOCONTENT) {
        this.snackBar.open('Voie supprimée', 'Ok', {duration: 5000});
        this.router.navigate(['voies']);
      }
      });
  }

  loadVoie() {
    this.voieService.getOneVoie(this.voieId).subscribe((res: EntityResponseType) => this.voie = res.body);
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body);
  }

  loadLongueurs() {
    this.longueurService.getAllLongueurs({unpaged: true})
      .subscribe((res: HttpResponse<any>) => this.longueurs = res.body.content);
  }

  updateVoie(voie: Voie) {
    this.voieService.updateVoie(voie, this.user.id).subscribe((res: EntityResponseType) => this.voie = res.body,
      (error => console.error(error)),
      () => this.update = false);
  }
}

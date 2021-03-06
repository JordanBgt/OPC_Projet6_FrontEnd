import { Component, OnDestroy, OnInit } from '@angular/core';
import { Topo } from '../shared/model/topo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ICotation } from '../shared/model/cotation.model';
import { CotationService } from '../services/cotation.service';
import { SpotService } from '../services/spot.service';
import { SpotLight } from '../shared/model/spot-light.model';
import { TokenStorageService } from '../security/token-storage.service';
import { isAdmin } from '../shared/auth-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTP_STATUS_NOCONTENT } from '../../../app.constants';
import { TopoService } from '../services/topo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { TopoUser } from '../shared/model/topo-user.model';
import { UserProfileService } from '../services/user-profile.service';

/**
 * Component to manage Topo detail. It displays a page with all information of the requested topo
 */

@Component({
  selector: 'app-topo-detail',
  templateUrl: './topo-detail.component.html',
  styleUrls: ['./topo-detail.component.scss']
})
export class TopoDetailComponent implements OnInit, OnDestroy {

  topo: Topo;
  topoId: number;
  cotations: ICotation[];
  spots: SpotLight[];
  update = false;
  user: any;
  isAdmin: boolean;
  uploadPhotoForm: FormGroup;
  isAuthorized = false;
  isOwnedByUser: boolean;
  subscriptions: Subscription[];

  constructor(private topoService: TopoService,
              private route: ActivatedRoute,
              private cotationService: CotationService,
              private spotService: SpotService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private userProfileService: UserProfileService) {
    this.cotations = [];
    this.spots = [];
    this.subscriptions = [];
  }

  /**
   * When the component is initialized, we check if the user has ROLE_ADMIN, pickup the topo id from the url params
   * and load the needed entities
   */
  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = isAdmin(this.user.roles);
    this.topoId = +this.route.snapshot.paramMap.get('id');
    this.loadTopo();
    this.loadCotations();
    this.loadSpots();
    this.initUploadPhotoForm();
  }

  /**
   * Return true if the user had ROLE_ADMIN or if he is the topo creator
   */
  checkIfAuthorized() {
    this.isAuthorized = this.isAdmin || this.user.id === this.topo.creatorId;
  }

  onUpdate() {
    this.update = true;
  }

  /**
   * Initializes the photo upload form
   */
  initUploadPhotoForm() {
    this.uploadPhotoForm = this.formBuilder.group({
      photo: ''
    });
  }

  /**
   * Method to upload a photo
   */
  onUploadPhoto() {
    const file: File = this.uploadPhotoForm.value.photo.files[0];
    const extension = file.type.slice(file.type.indexOf('/') + 1);
    const filename = `topo${this.topo.id}.${extension}`;
    this.subscriptions.push(this.topoService.uploadPhoto(file, filename, this.topoId, this.topo.creatorId, this.user.id).pipe(
      tap((res: Topo) => {
        this.topo = new Topo(res);
        this.snackBar.open('Photo modifiée !', 'Ok', {duration: 5000});
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to delete a topo. It will redirect the user to topo listing page
   */
  onDelete() {
    this.subscriptions.push(this.topoService.deleteTopo(this.topoId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Topo supprimé !', 'Ok', {duration: 5000});
          this.router.navigate(['topos']);
        } else {
          this.snackBar.open('Erreur lors de la suppression du topo !', 'Ok', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to load the requested topo
   */
  loadTopo() {
    this.subscriptions.push(this.topoService.getOneTopo(this.topoId).pipe(
      tap((res: any) => {
        this.topo = new Topo(res);
        this.checkIfAuthorized();
        this.checkIfUserOwnsTopo();
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all cotations. We need them in the topo update form
   */
  loadCotations() {
    this.subscriptions.push(this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all spots. We need them in the topo update form
   */
  loadSpots() {
    this.subscriptions.push(this.spotService.getAllSpots({unpaged: true}).pipe(
      tap((res: any) => {
        res.content.forEach(spot => this.spots.push(new SpotLight(spot)));
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to update the topo
   * @param topo to update
   */
  updateTopo(topo: Topo) {
    this.subscriptions.push(this.topoService.updateTopo(topo, this.user.id).pipe(
      tap((res: Topo) => {
        this.topo = new Topo(res);
        this.update = false;
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to book a topo
   * @param topoUser the TopoUser which contains information about the topo, its owner and the user who want to book it
   */
  bookTopo(topoUser: TopoUser) {
    topoUser.available = false;
    topoUser.tenant = this.user;
    this.subscriptions.push(this.topoService.bookTopo(this.topoId, topoUser).pipe(
      tap(topoUserUpdated => {
        this.snackBar.open('Topo reservé, en attente de confirmation de la part du propriétaire !',
          'Ok', {duration: 5000});
        const index = this.topo.topoUsers.findIndex(element => element.id === topoUserUpdated.id);
        this.topo.topoUsers[index] = topoUserUpdated;
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method which allows a user to indicate that he owns the topo
   */
  onAddTopoToUser() {
    const topoUser = new TopoUser();
    topoUser.topo = this.topo;
    topoUser.owner = this.user;
    this.subscriptions.push(this.userProfileService.createTopoUser(topoUser).pipe(
      tap(topoUserCreated => {
        this.topo.topoUsers.push(topoUserCreated);
        this.checkIfUserOwnsTopo();
        this.snackBar.open('Topo ajouté à votre liste de topos possédés', 'Ok', {duration: 5000});
      })
    ).subscribe());
  }

  /**
   * Check if the current user owns the topo
   */
  checkIfUserOwnsTopo() {
    this.isOwnedByUser = this.topo.topoUsers.find(topoUser => topoUser.owner.id === this.user.id) !== undefined;
  }

  /**
   * When the component is destroyed, we must unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../security/token-storage.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfile } from '../shared/model/user-profile.model';
import { BookingState } from '../shared/model/booking-state.enum';
import { TopoUser } from '../shared/model/topo-user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userConnected: any;
  isLoggedIn: boolean;
  userProfileObs$: Observable<UserProfile>;
  userProfile: UserProfile;
  bookingState = BookingState;

  constructor(private tokenStorageService: TokenStorageService,
              private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.userConnected = this.tokenStorageService.getUser();
    this.loadUser();
  }

  loadUser() {
    this.userProfileObs$ = this.userProfileService.getUserProfile(this.userConnected.id).pipe(
      tap(res => this.userProfile = res),
      catchError(error => throwError(error))
    );
  }

  updateTopoUser(topoUser: TopoUser, eventValue: BookingState | boolean) {
    if (typeof eventValue === 'boolean') {
      topoUser.available = eventValue;
    } else {
      topoUser.bookingState = eventValue;
    }
    this.userProfileService.updateTopoUser(topoUser).pipe(
      tap(topoUserUpdated => {
        const index = this.userProfile.toposOwned.findIndex(element => element.id === topoUserUpdated.id);
        this.userProfile.toposOwned[index] = topoUserUpdated;
      })
    ).subscribe();
  }

}

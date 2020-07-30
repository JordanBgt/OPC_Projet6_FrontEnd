import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenStorageService } from '../security/token-storage.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, Subscription, throwError } from 'rxjs';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfile } from '../shared/model/user-profile.model';
import { BookingState } from '../shared/model/booking-state.enum';
import { TopoUser } from '../shared/model/topo-user.model';

/**
 * Component to manage UserProfile. It displays information about the current connected user, topos and spots he created,
 * topos he owns and topos he rents
 */

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userConnected: any;
  isLoggedIn: boolean;
  userProfileObs$: Observable<UserProfile>;
  userProfile: UserProfile;
  bookingState = BookingState;
  updateSubscription: Subscription;

  constructor(private tokenStorageService: TokenStorageService,
              private userProfileService: UserProfileService) { }

  /**
   * When the component is initialized, we check if the user is connected and recover his information, and load his
   * UserProfile
   */
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.userConnected = this.tokenStorageService.getUser();
    this.loadUserProfile();
  }

  /**
   * Method to load the user profile
   */
  loadUserProfile() {
    this.userProfileObs$ = this.userProfileService.getUserProfile(this.userConnected.id).pipe(
      tap(res => this.userProfile = res),
      catchError(error => throwError(error))
    );
  }

  /**
   * Method used to update the availability of a topo or update the booking status depending on the type of event
   * returned by the template
   * @param topoUser TopoUser to update
   * @param eventValue value of the event send by the template
   */
  updateTopoUser(topoUser: TopoUser, eventValue: BookingState | boolean) {
    if (typeof eventValue === 'boolean') {
      topoUser.available = eventValue;
    } else {
      topoUser.bookingState = eventValue;
    }
    this.updateSubscription = this.userProfileService.updateTopoUser(topoUser).pipe(
      tap(topoUserUpdated => {
        const index = this.userProfile.toposOwned.findIndex(element => element.id === topoUserUpdated.id);
        this.userProfile.toposOwned[index] = topoUserUpdated;
      })
    ).subscribe();
  }

  /**
   * If there is a subscription, we unsubscribe it when the component is destroyed
   */
  ngOnDestroy(): void {
    if (!!this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

}

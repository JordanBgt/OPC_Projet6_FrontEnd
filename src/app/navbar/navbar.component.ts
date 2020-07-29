import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Component to manage the navbar
 */

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;

  @Input() isLoggedIn: boolean;
  @Output() logoutEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  /**
   * When the user clicks on the disconnect button, the method sends this event to AppComponent which will logout the
   * user
   */
  onLogout() {
    this.logoutEvent.emit(true);
  }
}

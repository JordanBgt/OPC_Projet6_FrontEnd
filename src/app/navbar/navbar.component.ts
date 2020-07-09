import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  onLogout() {
    this.logoutEvent.emit(true);
  }
}

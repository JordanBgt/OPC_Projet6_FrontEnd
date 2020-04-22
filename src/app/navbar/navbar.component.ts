import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenStorageService } from '../security/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isLoggedIn: boolean;
  @Output() logoutEvent = new EventEmitter();

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit() {}

  onLogout() {
    this.logoutEvent.emit(true);
  }
}

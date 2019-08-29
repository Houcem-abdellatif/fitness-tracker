import { Store } from '@ngrx/store';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as fromRoot from './../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  onClose() {
    this.closeSideNav.emit();
  }
}

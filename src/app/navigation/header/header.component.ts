import { AuthService } from './../../auth/auth.service';
import { Store } from '@ngrx/store';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from './../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>;
  @Output() sideNaveToggle = new EventEmitter();

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onToggle() {
    this.sideNaveToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}

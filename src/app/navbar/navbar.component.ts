import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { noop, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import {
  getLoggedUserData,
  isAdmin,
  isEmployee,
  isLoggedIn,
  isLoggedOut,
  isManager,
  selectUserInitials,
} from '../auth/selectors/auth.selectors';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { logout } from '../auth/actions/auth-actions';
import { AuthState } from '../auth/reducers';
import { User } from '../interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { UserCredentialsComponent } from '../shared/user-credentials/user-credentials.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loading = true;

  indigoPink = false;
  deepPurpleAmber = false;
  pinkBlueGrey = false;
  purpleGreen = true;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AuthState>,
    private router: Router,
    private dialog: MatDialog
  ) {
    const theme = localStorage.getItem('diploma-thesis.theme');
    if (theme) this.changeTheme(theme);
    this.userInitials$ = this.store.pipe(select(selectUserInitials));
    this.store
      .pipe(select(getLoggedUserData))
      .pipe(tap((user) => (this.user = user)))
      .subscribe();
  }

  user!: User;

  userInitials$!: Observable<string>;

  changeCredentials() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Update User Credentials',
      user: this.user,
      mode: 'update-credentials',
    };

    this.dialog.open(UserCredentialsComponent, {
      ...dialogConfig,
      disableClose: false,
    });
  }
  changePassword() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Update User Password',
      user: this.user,
      mode: 'update-password',
    };

    this.dialog.open(UserCredentialsComponent, {
      ...dialogConfig,
      disableClose: false,
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  isEmployee$ = this.store.pipe(select(isEmployee));
  isManager$ = this.store.pipe(select(isManager));
  isAdmin$ = this.store.pipe(select(isAdmin));

  changeTheme(themeName: string) {
    const body = document.getElementsByTagName('body')[0];
    switch (themeName) {
      case 'deep-purple-amber-theme': {
        this.deepPurpleAmber = true;
        this.indigoPink = false;
        this.pinkBlueGrey = false;
        this.purpleGreen = false;
        body.classList.remove('indigo-pink-theme');
        body.classList.remove('pink-blue-grey-theme');
        body.classList.add(themeName);
        localStorage.setItem('diploma-thesis.theme', themeName);
        break;
      }
      case 'indigo-pink-theme': {
        this.deepPurpleAmber = false;
        this.indigoPink = true;
        this.pinkBlueGrey = false;
        this.purpleGreen = false;
        body.classList.remove('pink-blue-grey-theme');
        body.classList.remove('deep-purple-amber-theme');
        body.classList.add(themeName);
        localStorage.setItem('diploma-thesis.theme', themeName);
        break;
      }
      case 'pink-blue-grey-theme': {
        this.deepPurpleAmber = false;
        this.indigoPink = false;
        this.pinkBlueGrey = true;
        this.purpleGreen = false;
        body.classList.remove('indigo-pink-theme');
        body.classList.remove('pink-blue-grey-theme');
        body.classList.add(themeName);
        localStorage.setItem('diploma-thesis.theme', themeName);
        break;
      }
      case 'purple-green-theme': {
        this.deepPurpleAmber = false;
        this.indigoPink = false;
        this.pinkBlueGrey = false;
        this.purpleGreen = true;
        body.classList.remove('indigo-pink-theme');
        body.classList.remove('pink-blue-grey-theme');
        body.classList.remove('deep-purple-amber-theme');
        body.classList.add(themeName);
        localStorage.setItem('diploma-thesis.theme', themeName);
        break;
      }
    }
  }

  logout() {
    this.store.dispatch(logout());
  }
}

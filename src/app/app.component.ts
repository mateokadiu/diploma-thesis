import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject,
  interval,
  Observable,
  of,
  ReplaySubject,
  Subject,
  Subscription,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import {
  loggedUser,
  login,
  triggeredOnRefresh,
} from './auth/actions/auth-actions';
import {
  getLoggedUserData,
  isLoggedIn,
  isLoggedOut,
  selectAuthState,
} from './auth/selectors/auth.selectors';
import { User } from './interfaces/user.interface';
import { AppState } from './reducers';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task-connect';

  constructor(private store: Store<AppState>) {}

  interval!: Subscription;
  ngOnInit() {
    const user = localStorage.getItem('diploma-thesis.user');
    const tokens = localStorage.getItem('diploma-thesis.tokens');
    if (user && tokens) {
      this.store.dispatch(
        triggeredOnRefresh({
          tokens: JSON.parse(tokens),
          user: JSON.parse(user),
        })
      );

      const u: User = JSON.parse(user as string);
      const num =
        new Date(
          ((u?.exp as number) - (u?.iat as number)) * 1000
        ).getMinutes() * 60000;

      this.interval = interval(num)
        .pipe(
          tap(() => {
            this.store.dispatch(
              triggeredOnRefresh({
                user: JSON.parse(user as string),
                tokens: JSON.parse(tokens as string),
              })
            );
          })
        )
        .subscribe(console.log);
    }

    this.isLoggedIn$
      .pipe(
        tap((isLogged) => {
          if (!isLogged) {
            this.interval?.unsubscribe();
          }
        })
      )
      .subscribe();
  }

  isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  isLoggedOut$ = this.store.pipe(select(isLoggedOut));
}

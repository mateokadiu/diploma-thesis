import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { login } from './auth/actions/auth-actions';
import { isLoggedIn } from './auth/selectors/auth.selectors';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task-connect';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const user = localStorage.getItem('diploma-thesis.user');
    const token = localStorage.getItem('diploma-thesis.token');
    if (user && token) {
      this.store.dispatch(
        login({ user: JSON.parse(user), token: JSON.parse(token) })
      );
    }
  }

  isLoggedIn$ = this.store.pipe(select(isLoggedIn));
}

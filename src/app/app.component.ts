import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from './auth/actions/auth-actions';
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
    if (user) {
      this.store.dispatch(login({ user: JSON.parse(user) }));
    }
  }
}

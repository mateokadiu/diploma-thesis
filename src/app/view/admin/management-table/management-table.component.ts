import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { delay, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { userId } from 'src/app/auth/selectors/auth.selectors';
import { User } from 'src/app/interfaces/user.interface';
import { AppState } from 'src/app/reducers';
import { UserEntityService } from '../../services/user/user-entity.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-management-table',
  templateUrl: './management-table.component.html',
  styleUrls: ['./management-table.component.scss'],
})
export class ManagementTableComponent implements OnInit {
  constructor(
    private userEntityService: UserEntityService,
    private store: Store<AppState>
  ) {
    store
      .pipe(
        select(userId),
        tap((u) => (this.uId = u))
      )
      .subscribe()
      .unsubscribe();
  }

  uId!: string;

  destroy$: Subject<boolean> = new Subject<boolean>();

  displayedColumns: string[] = [
    'id',
    'email',
    'first-name',
    'last-name',
    'role',
  ];

  nextPage = 0;

  users$!: Observable<User[]>;
  loadUsersPage() {
    this.userEntityService
      .getWithQuery({
        pageNumber: this.nextPage.toString(),
        pageSize: '3',
        _id: this.uId,
      })
      .pipe(
        map((users) => users.filter((u) => u._id !== this.uId)),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.nextPage += 1;
  }

  loading$!: Observable<boolean>;

  searchText!: string;
  ngOnInit(): void {
    this.loading$ = this.userEntityService.loading$.pipe(delay(0));

    this.users$ = this.userEntityService.entities$.pipe(
      tap(() => {
        if (this.nextPage == 0) {
          this.loadUsersPage();
        }
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

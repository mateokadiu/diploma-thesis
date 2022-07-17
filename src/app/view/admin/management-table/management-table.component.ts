import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { delay, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { userId } from 'src/app/auth/selectors/auth.selectors';
import { User } from 'src/app/interfaces/user.interface';
import { AppState } from 'src/app/reducers';
import { UserEntityService } from 'src/app/services/user/user-entity.service';
import { defaultDialogConfig } from 'src/app/shared/default-dialog-config';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

@Component({
  selector: 'app-management-table',
  templateUrl: './management-table.component.html',
  styleUrls: ['./management-table.component.scss'],
})
export class ManagementTableComponent implements OnInit {
  constructor(
    private userEntityService: UserEntityService,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private title: Title,
    private _snackbar: MatSnackBar
  ) {
    title.setTitle('Admin - User Management');

    store
      .pipe(
        select(userId),
        tap((u) => (this.uId = u))
      )
      .subscribe()
      .unsubscribe();
  }

  pageSize: string = '5';

  uId!: string;

  destroy$: Subject<boolean> = new Subject<boolean>();

  displayedColumns: string[] = [
    'id',
    'email',
    'first-name',
    'last-name',
    'role',
    'gender',
    'dateOfBirth',
    'edit',
    'delete',
  ];

  nextPage = 0;

  users$!: Observable<User[]>;
  loadUsersPage() {
    this.userEntityService
      .getWithQuery({
        pageNumber: this.nextPage.toString(),
        pageSize: this.pageSize.toString(),
        _id: this.uId,
      })
      .pipe(
        tap((users) => {
          this.userEntityService.count$.forEach((n) => {
            if (n != 5 && n == users.length) {
              this._snackbar.open('No more users to load!', 'OK');
            }
          });
        }),
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

  updateUser(user: User) {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Update User',
      user,
      mode: 'update',
    };

    this.dialog.open(UpdateModalComponent, {
      ...dialogConfig,
      disableClose: false,
    });
  }

  deleteUser(user: User) {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Delete User',
      user,
      mode: 'delete',
    };

    this.dialog.open(DeleteModalComponent, {
      ...dialogConfig,
      disableClose: false,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

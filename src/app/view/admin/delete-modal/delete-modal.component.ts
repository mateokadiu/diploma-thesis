import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserEntityService } from 'src/app/services/user/user-entity.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  dialogTitle!: string;

  mode!: 'delete';
  user!: User;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialogRef: MatDialogRef<DeleteModalComponent>,
    private userEntityService: UserEntityService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.dialogTitle = data.dialogTitle;
    this.user = data.user;
    this.mode = data.mode;
  }

  onSave() {
    this.userEntityService
      .delete(this.user)
      .pipe(
        catchError((err) => throwError(() => err)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        error: ({ error }) =>
          this._snackBar.open(error.error.message, 'OK', { duration: 2000 }),
        complete: () => {
          this._snackBar.open(
            `User with email '${this.user.email}' was deleted successfully!`,
            'OK',
            { duration: 2000 }
          );
          this.dialogRef.close();
        },
      });
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}

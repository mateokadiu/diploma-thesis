import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user.interface';
import { defaultDialogConfig } from 'src/app/shared/default-dialog-config';
import { UpdateInfoComponent } from '../update-info/update-info.component';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  dialogTitle!: string;

  mode!: 'update';
  user!: User;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.dialogTitle = data.dialogTitle;
    this.user = data.user;
    this.mode = data.mode;
  }

  onUpdate() {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Update User Information',
      user: this.user,
      mode: 'update',
    };

    this.dialog.open(UpdateInfoComponent, {
      ...dialogConfig,
      disableClose: false,
    });
  }

  onPassword() {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Update User Password',
      user: this.user,
      mode: 'password',
    };

    this.dialog.open(UpdateInfoComponent, {
      ...dialogConfig,
      disableClose: false,
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}

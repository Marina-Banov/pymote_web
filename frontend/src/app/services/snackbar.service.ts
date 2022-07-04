import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

import { ErrorDialogComponent } from "../components";

@Injectable({ providedIn: "root" })
export class SnackbarService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  public openDialog(data: any): void {
    this.dialog.open(ErrorDialogComponent, { data });
  }

  public error(message?: string): void {
    if (message === undefined) {
      message = "Something went wrong!";
    }
    this.open(message, "snackbar-error");
  }

  private open(message: string, panelClass: string): void {
    this.snackBar.open(message, "OK", { panelClass });
  }
}

import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

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

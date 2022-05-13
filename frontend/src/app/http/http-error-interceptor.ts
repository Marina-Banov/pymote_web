import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { SnackbarService } from "../services/snackbar.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackBarService: SnackbarService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.snackBarService.error(`${error.status} ${error.statusText}`);
        return EMPTY;
      })
    );
  }
}

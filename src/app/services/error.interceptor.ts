import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { IGNORED_STATUSES } from "@efaps/pos-library";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            if (
              !(
                request.context.has(IGNORED_STATUSES) &&
                request.context.get(IGNORED_STATUSES).includes(error.status)
              )
            ) {
              if (error.status === 401) {
                this.router.navigate(["/login"]);
              } else {
                this.snackBar.open(error.statusText, "close", {
                  duration: 2000,
                });
              }
            }
          }
        },
      }),
    );
  }
}

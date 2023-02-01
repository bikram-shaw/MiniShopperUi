import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from '../shared/snackbar/snackbar.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router:Router,
    private snackbar:SnackbarService,
    private modalService:BsModalService,
    private spinnerService:SpinnerService) {} 
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    const token = this.authService.getAuthToken();

   if (token) {
     // If we have a token, we set it to the header
     request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
     });
  }

  return next.handle(request).pipe(
  	catchError((err) => {
   	 if (err instanceof HttpErrorResponse) {
      this.spinnerService.hide();
      if(err.status===400){
        this.snackbar.open(err.error.message,"Close")
      }
      if (err.status === 403) {
        this.snackbar.open("You are not authorize to access this page.","Close")
      }
       	 if (err.status === 401) {
          this.modalService.hide();
          this.snackbar.open("Session expire","Close")
          localStorage.removeItem('data')
       	 this.router.navigate(['Login']);
     	}
       if (err.status === 500) {
        this.snackbar.open("Internal Server Error.","Close")
     }
     if (err.status === 0){
    this.snackbar.open("Server is down, Try again later !","Close")
      }
 	 }
  	return throwError(err);
	})
   )
  }
}

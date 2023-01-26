import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public router: Router) {}
  canActivate(): boolean {
    var data=JSON.parse(localStorage.getItem('data') as string);

    if (data==null) {
      this.router.navigate(['Login']);
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router) { }

  isLoggedIn(){
    var data=JSON.parse(localStorage.getItem('data') as string);

    if (data!=null) {
      this.router.navigate(['dashboard']);
    }
  }

  getAuthToken(){
    var data=JSON.parse(localStorage.getItem('data') as string);
    if (data!=null) {
      return data.token;
    }
    else{
      return null;
    }
  }

  logout(){
    localStorage.removeItem('data');
    this.router.navigate(['Login']);
  }

  getUserData(){
    var data=JSON.parse(localStorage.getItem('data') as string);
    if (data!=null) {
      return data;
    }
    else{
      return null;
    }
  }
}

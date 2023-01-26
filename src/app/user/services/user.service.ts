import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { LoginModel } from '../models/LoginModel';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
   baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { }

  signup(user:User):Observable<any>{
    return this.http.post(this.baseUrl+"/Users/Signup",user);
  }

  login(login:LoginModel):Observable<any>{
    return this.http.post(this.baseUrl+"/Users/Login",login);
  }

}

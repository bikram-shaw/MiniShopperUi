import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.service';
import { Validator } from 'src/app/common/Validator';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { LoginModel } from '../../models/LoginModel';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  errorMessage:string='';

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private spinnerService:SpinnerService,
    private router:Router,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn();
    this.loginForm = this.fb.group({ 
      userid: [''], 
      password: [''] });
      
      Validator.error.subscribe(error=>{
        this.errorMessage=error;
      })
  
  }

  onSubmitLoginForm() { 
   var loginmodel=new LoginModel(this.loginForm.value.userid.toLowerCase(),this.loginForm.value.password); 
   
   if(!Validator.ValidateEmail(loginmodel.userId)){
     return;
   }

  //  if(!Validator.ValidatePassword(loginmodel.password)){

  //   return;
  //  }
  this.spinnerService.show();
   this.userService.login(loginmodel).subscribe(res=>{
    this.spinnerService.hide();
    localStorage.setItem('data', JSON.stringify(res.data));
    this.router.navigate(['dashboard']);
   })

  }

}

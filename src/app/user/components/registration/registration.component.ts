import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.service';
import { Validator } from 'src/app/common/Validator';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { UserModule } from '../../user.module';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  signupForm: any;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private spinnerService: SpinnerService,
    private snackbar: SnackbarService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn();
    this.signupForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      emailId: [''],
      password: ['']
    });

    Validator.error.subscribe(error => {
      this.errorMessage = error;
    })
  }

  onSubmitSignupForm() {
    var user = new User(
      this.signupForm.value.firstName,
      this.signupForm.value.lastName,
      this.signupForm.value.emailId.toLowerCase(),
      this.signupForm.value.password);

    if (!Validator.ValidateName(user.firstName) || !Validator.ValidateName(user.lastName)) {
      return;
    }
    if (!Validator.ValidateEmail(user.emailId)) {
      return;
    }
    if (!Validator.ValidatePassword(user.password)) {
      return;
    }
    this.spinnerService.show();
    this.userService.signup(user).subscribe(res => {
      this.spinnerService.hide();
      this.snackbar.open(res.message, "close");
      this.router.navigate(['Login']);
      console.log(res);
    }, error => {
      this.spinnerService.hide();
      this.errorMessage = error.error.message;
    })

  }

}

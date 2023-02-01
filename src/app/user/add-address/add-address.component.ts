import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Validator } from 'src/app/common/Validator';
import { SharedService } from 'src/app/shared/shared.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  addressForm: any;
  errorMessage: string='';
  bsModalRef:any;

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private spinnerService:SpinnerService,
    public modalRef: BsModalRef,
    private sharedService:SharedService
  ) {this.bsModalRef=modalRef }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      addressLine1: ['',[Validators.required]],
      street: ['',[Validators.required]],
      city: ['',[Validators.required]],
      state: ['',[Validators.required]],
      pincode: ['',[Validators.required]] 
     });

      Validator.error.subscribe(error=>{
        this.errorMessage=error;
      })
  }

  onSubmitAddressForm(){

    this.spinnerService.show();
    this.userService.addAddress(this.addressForm.value).subscribe(res=>{
      this.spinnerService.hide();
      this.bsModalRef.hide();
      this.sharedService.onClose.next(true);
    })

  }

}

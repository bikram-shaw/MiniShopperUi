import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/shared/shared.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  @Input() order:any;
  orderStatus=["Pending","Fulfilled", "Rejected","Send for Review"];
  selectedStatus:string=''
  constructor( private sharedService:SharedService, 
    private modalService:BsModalService,
    private orderService:OrderService,
    private spinnerService:SpinnerService,
    private snackbar:SnackbarService
    ) { }

  ngOnInit(): void {
    this.selectedStatus=this.order.status;
  }

  updateStatus(){
    this.spinnerService.show();
this.orderService.updateOrderStatus(this.order.orderId,this.selectedStatus).subscribe(res=>{
this.spinnerService.hide();
this.modalService.hide();
this.snackbar.open(res.message,"Ok");
this.sharedService.onClose.next(true);
})
  }
  close(){
    this.sharedService.onClose.next(true);
    this.modalService.hide();
  }

}

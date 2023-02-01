import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/shared/shared.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css']
})
export class DeleteOrderComponent implements OnInit {

  @Input() order:any;
  @Input() bsModalRef:any;

  constructor(
    private modalService:BsModalService,
    private orderService:OrderService,
    private snackbar:SnackbarService,
    private spinnerService:SpinnerService,
    private sharedService:SharedService
    ) { }

  ngOnInit(): void {
  }
  
  cancel(){
    this.modalService.hide();
  }

  deleteOrder(){
   this.spinnerService.show();
   this.orderService.deleteOrder(this.order.orderId).subscribe(res=>{
    this.spinnerService.hide();
    this.modalService.hide();
    this.sharedService.onClose.next(true);
    this.snackbar.open(res.message,"Ok");
   })
  }

}

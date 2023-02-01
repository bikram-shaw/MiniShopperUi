import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/common/auth.service';
import { ViewOrderComponent } from 'src/app/order/view-order/view-order.component';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.css']
})
export class ActionCellRendererComponent implements ICellRendererAngularComp {
  params: any;
  isShopper: boolean=false;
  bsModalRef: any;

  constructor(private authService:AuthService,private modalService: BsModalService,) { }
  agInit(params: ICellRendererParams<any, any>): void {
    this.params=params;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  ngOnInit(): void {
    this.isShopper=this.authService.isShopper();
  }

  onClickEdit(data:any){
   this.params.editOrder(data);
  }

  onClickDelete(){
    this.params.deleteOrder(this.params.data);
  }

  viewOrder(data:any){
    const config = {
      backdrop: true,
      ignoreBackdropClick: true
    };
    const val: any = {
      order: data
    };
    this.bsModalRef = this.modalService.show(
      ViewOrderComponent,
      Object.assign(
        config,
        {},
        { class: 'modal-dialog-centered modal-lg', initialState: val }
      )
    );
  }

}

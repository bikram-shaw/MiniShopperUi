import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/common/auth.service';
import { ActionCellRendererComponent } from 'src/app/shared/action-cell-renderer/action-cell-renderer.component';
import { SharedService } from 'src/app/shared/shared.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { AddOrderComponent } from '../add-order/add-order.component';
import { DeleteOrderComponent } from '../delete-order/delete-order.component';
import { GetOrdersModel } from '../model/GetOrdersModel';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  bsModalRef: any;
  public domLayout: DomLayoutType = 'autoHeight';
  gridApi: any;
  overlayNoRowsTemplate = "<h3>No records found</h3>"
  searchText: string = '';
  orderData:GetOrdersModel[]=[];
  isShopper: boolean = false;

  constructor(
    private modalService: BsModalService,
    private orderService: OrderService,
    private sharedService: SharedService,
    private spinnerService: SpinnerService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.isShopper = this.authService.isShopper();

    this.sharedService.onClose.subscribe(res => {
      if (res) {
        if (this.isShopper) {
          this.fetchShopperOrder();
        }
        else {
          this.fetchCustomersOrder();
        }
      }
    });

    if (this.isShopper) {
      this.fetchShopperOrder();
    }
    else {
      this.fetchCustomersOrder();
    }

  }

  columnDefs: ColDef[] = [
    { field: 'orderId', filter: 'agTextColumnFilter' },
    { field: 'orderName', filter: 'agTextColumnFilter' },
    { field: 'placedDate', filter: 'agTextColumnFilter' },
    {
      field: 'status', filter: 'agTextColumnFilter',
      cellRendererSelector: params => {
        return {
          component: ActionCellRendererComponent,
          params: { value: 'OrderStatus' }
        }
      }
    },
    {
      field: "Action",
      cellRendererSelector: params => {
        return {
          component: ActionCellRendererComponent,
          params: { value: 'Order' }
        }
      },
      cellRendererParams: {
        editOrder: this.editOrder.bind(this),
        deleteOrder: this.deleteOrder.bind(this),
      }
    }
  ];

  fetchCustomersOrder() {
    this.orderService.getAllOrder().subscribe(res => {
      this.spinnerService.hide();
      this.orderData = res.data;
    })
  }


  onGridReady(event: any) {
    this.gridApi = event.api;
    event.api.sizeColumnsToFit();

  }

  editOrder(data: any) {
    const config = {
      backdrop: true,
      ignoreBackdropClick: true
    };
    const val: any = {
      order: data
    };
    this.bsModalRef = this.modalService.show(
      AddOrderComponent,
      Object.assign(
        config,
        {},
        { class: 'modal-dialog-centered modal-lg', initialState: val }
      )
    );
  }

  deleteOrder(data: any) {
    console.log(data)
    const val: any = {
      order: data,
      bsModalRef: this.bsModalRef
    };
    this.bsModalRef = this.modalService.show(
      DeleteOrderComponent,
      Object.assign(
        {},
        { class: 'modal-dialog-centered', initialState: val }
      )
    );
  }

  AddOrder() {

    this.bsModalRef = this.modalService.show(
      AddOrderComponent,
      Object.assign(
        {},
        { class: 'modal-dialog-centered modal-lg', }
      )
    );
  }

  search() {
    this.gridApi.setQuickFilter(this.searchText);
    this.showOverLay();
  }

  clearFilter() {
    this.searchText = '';
    this.search();
    this.gridApi.setFilterModel(null);
    this.showOverLay();
  }

  showOverLay() {
    if (this.gridApi.getDisplayedRowCount() <= 0)
      this.gridApi.showNoRowsOverlay();
    else
      this.gridApi.hideOverlay();
  }

  fetchShopperOrder() {
    this.orderService.getShopperOrders().subscribe(res => {
      this.spinnerService.hide();
      this.orderData = res.data;
    })
  }

}

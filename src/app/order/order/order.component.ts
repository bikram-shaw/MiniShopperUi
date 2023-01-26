import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActionCellRendererComponent } from 'src/app/shared/action-cell-renderer/action-cell-renderer.component';
import { AddOrderComponent } from '../add-order/add-order.component';
import { DeleteOrderComponent } from '../delete-order/delete-order.component';

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

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {

  }

  columnDefs: ColDef[] = [
    { field: 'OrderId', filter: 'agTextColumnFilter'},
    { field: 'OrderName', filter: 'agTextColumnFilter' },
    { field: 'PlacedDate', filter: 'agTextColumnFilter' },
    { field: 'Status', filter: 'agTextColumnFilter' },
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

  rowData = [
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Alu', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Jam', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Kochu', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
    { OrderId: '023252', OrderName: 'Test', PlacedDate: '12/02/2022', Status: 'Pending' },
  ];
  onGridReady(event: any) {
    this.gridApi = event.api;
    event.api.sizeColumnsToFit();

  }

  editOrder(data: any) {
    const val: any = {
      order: data
    };
    this.bsModalRef = this.modalService.show(
      AddOrderComponent,
      Object.assign(
        {},
        { class: 'modal-dialog-centered modal-lg', initialState: val }
      )
    );
  }

  deleteOrder(data: any) {
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
        { class: 'modal-dialog-centered modal-lg' }
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

}

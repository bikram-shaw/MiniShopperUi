import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.css']
})
export class ActionCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  constructor() { }
  agInit(params: ICellRendererParams<any, any>): void {
    this.params=params;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  onClickEdit(){
   this.params.editOrder(this.params.data);
  }

  onClickDelete(){
    this.params.deleteOrder(this.params.data);
  }

}

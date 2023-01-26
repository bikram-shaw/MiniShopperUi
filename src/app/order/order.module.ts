import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AddOrderComponent } from './add-order/add-order.component';
@NgModule({
  declarations: [
    OrderComponent,
    DeleteOrderComponent,
    AddOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    AgGridModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class OrderModule { }

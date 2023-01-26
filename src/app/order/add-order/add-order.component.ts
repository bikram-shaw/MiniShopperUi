import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Validator } from 'src/app/common/Validator';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  addItemForm: any;
  errorMessage: string='';
  modalRf: BsModalService;
  itemList:any=[];
  updateBtn:boolean=false;
  orderName:string='';
  @Input() order:any;
  editedItemId: any;

  constructor(
    private fb: FormBuilder,
    private modalService:BsModalService,
    private orderService:OrderService
    ) {
    this.modalRf=modalService;
   }

  ngOnInit(): void {
    Validator.error.subscribe(error=>{
      this.errorMessage=error;
    })

    this.addItemForm = this.fb.group({
      itemName: [''],
      quantity: [''],
      price: [''],
       });

  if(this.order!=null){
    this.orderName=this.order.OrderName;
    this.initiateOrder(this.order.OrderId);
  }
  }

  onSubmitItemOrderForm(){
    var item=this.addItemForm.value;
    
    if(!Validator.ValidatePrice("Quantity",item.quantity)){
      return;
    }
    if(!Validator.ValidatePrice("Price",item.price)){
      return;
    }
    if(item.itemName == null || item.itemName.length<1 ){
      item.itemName="Item "+(this.itemList.length);
    }
    this.itemList.push(item);
    this.addItemForm.reset();
  }

  onClickDelete(index:number){
   this.itemList.splice(index, 1);
  }
  saveOrder(){
    if(this.orderName.length<=0){
      this.errorMessage="Order Name is required!"
      return;
    }
    else{
      this.errorMessage='';
    }
    var data={'orderName':this.orderName,'items':this.itemList};
    this.orderService.addOrder(data).subscribe(res=>{
      
    })
  }

  initiateOrder(OrderId:number){
    var res=[{"itemName":"Item 0","quantity":"2","price":"2"},{"itemName":"Item 1","quantity":"3","price":"3"},{"itemName":"Item 2","quantity":"4","price":"5"},{"itemName":"Item 3","quantity":"6","price":"7"}]
    this.itemList=res;
  this.orderService.getOrderItems(OrderId).subscribe(res=>{
    res=[{"itemName":"Item 0","quantity":"2","price":"2"},{"itemName":"Item 1","quantity":"3","price":"3"},{"itemName":"Item 2","quantity":"4","price":"5"},{"itemName":"Item 3","quantity":"6","price":"7"}]
    this.itemList=res;
  })
  }

  onClickEdit(item:any,index:any){
    this.editedItemId=item.id;
    this.addItemForm = this.fb.group({
      itemName: [item.itemName],
      quantity: [item.quantity],
      price: [item.price],
       });
       this.updateBtn=true;
  }

  updateItem(){

  }
  
}

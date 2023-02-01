import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Validator } from 'src/app/common/Validator';
import { SharedService } from 'src/app/shared/shared.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { AddAddressComponent } from 'src/app/user/add-address/add-address.component';
import { UserService } from 'src/app/user/services/user.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  addItemForm: any;
  errorMessage: string = '';
  modalRf: BsModalService;
  itemList: any = [];
  updateBtn: boolean = false;
  orderName: string = '';
  @Input() order: any;
  editedItemId: any;
  existingItems: any;
  deletedItems: number[] = [];
  editedItemIndex: any;
  modalTitle = "Create New Order";
  bsModalRef: any;
  addresses: any = [];
  selectedAddress: number = 0;
  addError: string = '';

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private orderService: OrderService,
    private snackbar: SnackbarService,
    private spinnerService: SpinnerService,
    private sharedService: SharedService,
    private userService: UserService
  ) {
    this.modalRf = modalService;
  }

  ngOnInit(): void {


    this.sharedService.onClose.subscribe(res => {
      if (res) {
        this.getAllAddress();
      }
    })

    Validator.error.subscribe(error => {
      this.errorMessage = error;
    })

    this.addItemForm = this.fb.group({
      itemName: [''],
      quantity: [''],
      price: [''],
    });

    if (this.order != null) {
      this.modalTitle = "Update Order";
      this.selectedAddress = this.order.addressId;
      this.orderName = this.order.orderName;
      this.existingItems = this.order.items;
      this.itemList = this.order.items
    }
    this.getAllAddress();
  }

  onSubmitItemOrderForm() {
    var item = this.addItemForm.value;

    if (!Validator.ValidatePrice("Quantity", item.quantity)) {
      return;
    }
    if (!Validator.ValidatePrice("Price", item.price)) {
      return;
    }
    if (item.itemName == null || item.itemName.length < 1) {
      item.itemName = "Item " + (this.itemList.length);
    }
    this.itemList.push(item);
    this.addItemForm.reset();
  }

  onClickDelete(index: number) {
    if (this.order != null && this.existingItems.length >= index) {
      this.deletedItems.push(this.existingItems[index].itemId);
    }

    this.itemList.splice(index, 1);
  }
  saveOrder() {
    if (this.orderName.length <= 0) {
      this.errorMessage = "Order Name is required."
      return;
    }
    else if (this.itemList.length <= 0) {
      this.errorMessage = "Add atleast one item."
      return;
    }
    else {
      this.errorMessage = '';
    }
    if (this.selectedAddress === 0) {
      this.addError = "Select a delivery address"
      return;
    }
    this.spinnerService.show();
    var data = { 'orderName': this.orderName, 'addressId': this.selectedAddress, 'items': this.itemList };
    this.orderService.addOrder(data).subscribe(res => {
      this.spinnerService.hide();
      this.snackbar.open(res.message, "Ok");
      this.modalService.hide();
      this.sharedService.onClose.next(true);

    })
  }

  onClickEdit(item: any, index: any) {
    this.editedItemIndex = index;
    this.addItemForm = this.fb.group({
      itemName: [item.itemName],
      quantity: [item.quantity],
      price: [item.price],
    });
    this.updateBtn = true;
  }

  saveUpdateOrder() {
    if (this.orderName.length <= 0) {
      this.errorMessage = "Order Name is required."
      return;
    }
    if (this.itemList.length <= 0) {
      this.errorMessage = "Add atleast one item."
      return;
    }
    if (this.selectedAddress === 0) {
      this.addError = "Select a delivery address"
      return;
    }
    this.spinnerService.show();
    const data = { orderName: this.orderName, addressId: this.selectedAddress, deletedItemsId: this.deletedItems, items: this.itemList }
    this.orderService.updateOrder(data, this.order.orderId).subscribe(data => {
      this.spinnerService.hide();
      this.snackbar.open(data.message, "Ok");
      this.modalService.hide();
      this.sharedService.onClose.next(true);
    })
  }

  updateItem() {
    var item = this.addItemForm.value;
    item.itemId = this.itemList[this.editedItemIndex].itemId;

    if (!Validator.ValidatePrice("Quantity", item.quantity)) {
      return;
    }
    if (!Validator.ValidatePrice("Price", item.price)) {
      return;
    }
    if (item.itemName == null || item.itemName.length < 1) {
      item.itemName = "Item " + (this.itemList.length);
    }
    this.itemList[this.editedItemIndex] = item;

    this.addItemForm.reset();
    this.updateBtn = false;
  }

  close() {
    this.sharedService.onClose.next(true);
    this.modalRf.hide();
  }

  addAddress() {
    var bsModalRef = this.modalService.show(
      AddAddressComponent,
      Object.assign(
        {},
        { class: 'modal-dialog-centered modal-lg' }
      )
    );
  }

  getAllAddress() {
    this.spinnerService.show();
    this.userService.getAllAddress().subscribe(res => {
      this.spinnerService.hide();
      this.addresses = res.data;
    })
  }

}

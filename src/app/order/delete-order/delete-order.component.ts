import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css']
})
export class DeleteOrderComponent implements OnInit {

  @Input() order:any;
  @Input() bsModalRef:any;

  constructor(private modalService:BsModalService) { }

  ngOnInit(): void {
  }
  
  cancel(){
    this.modalService.hide();
  }

}

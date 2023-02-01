import { Item } from "./item";

export class GetOrdersModel {
    orderId: number;
    orderName: string;
    placedDate: string;
    status: string;
    addressId:number;
    items:Item[];

    constructor(
        orderId: number,
        orderName: string,
        placedDate: string,
        status: string,
        addressId:number,
        items:Item[]
    ) {
        this.orderId = orderId;
        this.orderName = orderName;
        this.placedDate = placedDate;
        this.status = status;
        this.addressId=addressId;
        this.items=items;
    }


}
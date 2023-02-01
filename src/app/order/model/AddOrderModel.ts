import { Item } from "./item";

export interface AddOrderModel{
    orderName: string;
    addressId:number;
    items:Item[];
}
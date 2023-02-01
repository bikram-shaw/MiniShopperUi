import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/common/models/apiResponse';
import { environment } from 'src/environments/environment';
import { AddOrderModel } from '../model/AddOrderModel';
import { GetOrdersModel } from '../model/GetOrdersModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
   BaseUrl=environment.OrderServiceBaseUrl;
  constructor(private http:HttpClient) { }

  getAllOrder():Observable<ApiResponse<GetOrdersModel[]>>{
    return this.http.get<ApiResponse<GetOrdersModel[]>>(this.BaseUrl+"/Order/GetAllOrder");
  }

  addOrder(data:AddOrderModel):Observable<ApiResponse<string>>{
    return this.http.post<ApiResponse<string>>(this.BaseUrl+"/Order/AddOrder",data);
  }

  updateOrder(data:AddOrderModel,orderId:any):Observable<ApiResponse<string>>{
    return this.http.put<ApiResponse<string>>(this.BaseUrl+"/Order/UpdateOrder/"+orderId,data);
  }

  deleteOrder(orderId:number):Observable<ApiResponse<string>>{
    return this.http.delete<ApiResponse<string>>(this.BaseUrl+"/Order/DeleteOrder?orderId="+orderId);
  }

  getShopperOrders():Observable<ApiResponse<GetOrdersModel[]>>{
    return this.http.get<ApiResponse<GetOrdersModel[]>>(this.BaseUrl+"/Order/GetShopperOrder");
  }

  updateOrderStatus(orderId:any,status:any):Observable<ApiResponse<string>>{
    var data={orderId:orderId,status:status};
    return this.http.post<ApiResponse<string>>(this.BaseUrl+"/Order/UpdateOrderStatus",data);
  }
}

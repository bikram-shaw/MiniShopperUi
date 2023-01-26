import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  addOrder(data:any):Observable<any>{
    return this.http.post("",data);
  }
  getOrderItems(orderId:any):Observable<any>{
    return this.http.get("/"+orderId);
  }
}

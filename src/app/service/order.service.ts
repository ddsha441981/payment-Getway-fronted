import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 
  // AutoWiring HttpClient
  constructor(private _httpClient: HttpClient) { }


  //generate order
  public generateOrder(payment:any){
      return this._httpClient.post(`${baseUrl}/api/create-order/`,payment);
  }

  // Update payment on server
  public updatingPaymentServer(data:any){
    console.log("In service");
    return this._httpClient.post(`${baseUrl}/api/update-order/`,data);
  }

}

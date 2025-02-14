import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  userToken: string = localStorage.getItem('userToken')!;

  // online payment
  onLinePay(cartId: string, data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?http://localhost:4200/`,
      {
        shippingAddress: data,
      },
      { headers: { token: this.userToken } }
    );
  }

  // cash payment
  cashPay(cartId: string, data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/${cartId}`,
      {
        shippingAddress: data,
      },
      { headers: { token: this.userToken } }
    );
  }
}

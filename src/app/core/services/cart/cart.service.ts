import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  userToken: string = localStorage.getItem('userToken')!;

  // add to cart
  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/cart`,
      {
        productId: id,
      },
      { headers: { token: this.userToken } }
    );
  }

  // get to cart
  getUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`, {
      headers: { token: this.userToken! },
    });
  }

  // remove from cart

  removeItemFromCart(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
      headers: { token: this.userToken },
    });
  }

  // update cart
  updateCartProduct(id: string, count: number): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/api/v1/cart/${id}`,
      {
        count: count,
      },
      { headers: { token: this.userToken } }
    );
  }

  // clear cart
  ClearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
      headers: {
        token: this.userToken,
      },
    });
  }
}

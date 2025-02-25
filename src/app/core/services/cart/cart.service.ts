import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {
    this.platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(this.platformId)) {
      this.userToken = localStorage.getItem('userToken') || '';
    }
  }

  private platformId: Object;
  cartNumber: WritableSignal<number> = signal(0);
  userToken: string = '';

  // cartNumber: WritableSignal<number> = signal(0);
  // userToken: string = localStorage.getItem('userToken')!;

  // add to cart
  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      productId: id,
    });
  }

  // get to cart
  getUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  // remove from cart
  removeItemFromCart(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }

  // update cart
  updateCartProduct(id: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      count: count,
    });
  }

  // clear cart
  ClearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}

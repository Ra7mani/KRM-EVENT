import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http:HttpClient) { }



  

  addcoupon(  model:any , id: number): Observable<any> {
    return this.http.post(`${environment.url}/api/CouponCode/${id}`,model);
  }

  Verifcoupon(model :any,  id: any): Observable<any> {
    return this.http.post(`${environment.url}/api/CouponCode/verifyCouponCode/${id}`,model);
  }

  getcoupon(id:any):Observable<any>{
    return this.http.get(`${environment.url}/api/CouponCode/${id}`);
  }


  deletecoupon(model:any):Observable<any>{
    return this.http.delete(`${environment.url}/api/CouponCode/${model}`);
  }
  
}

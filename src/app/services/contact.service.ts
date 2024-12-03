import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) {}

  addcontact(model:any):Observable<any>{
    return this.http.post(`${environment.url}/api/Contact`,model);
  }

  getallcontact(model:any):Observable<any>{
    return this.http.get(`${environment.url}/api/Contact/GetAll`,model);
  }

  getcontactbyusername(UserName:any):Observable<any>{
    return this.http.get(`${environment.url}/api/Contact/GetContactsByUserName/${UserName}`);
  }

  deletecontact(model:any):Observable<any>{
    return this.http.delete(`${environment.url}/api/Contact?ContactId=${model}`);
  }


}

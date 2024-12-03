import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor( private http: HttpClient) { }




  addticket(model:any):Observable<any>{
    return this.http.post(`${environment.url}/api/Ticket`,model);
  }

  getticketbyclientid(id: any): Observable<any> {
    return this.http.get(`${environment.url}/api/Ticket/ByClient/${id}`);
}

getticketbyeventtid(id: any): Observable<any> {
  return this.http.get(`${environment.url}/api/Ticket/ByEvent/${id}`);
}




}

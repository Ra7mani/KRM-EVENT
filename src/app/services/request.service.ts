import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor( private http:HttpClient) { }

addrequest(model:any):Observable<any>{
  return this.http.post(`${environment.url}/api/EventRequest/MakeRequest`,model);
}

getallrequest(model:any):Observable<any>{
  return this.http.get(`${environment.url}/api/EventRequest/AllRequests?AnnouncerId=${model}`);
}
getrequestbyid(id:any):Observable<any>{
  return this.http.get(`${environment.url}/api/EventRequest/${id}`);
}

deleterequest(model:any):Observable<any>{
  return this.http.delete(`${environment.url}/api/EventRequest/${model}`);
}

 
  
}

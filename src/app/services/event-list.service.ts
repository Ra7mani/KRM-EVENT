import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class EventListService {

  constructor(private http : HttpClient) { }


  getalleventsbyannouncerid(model:any):Observable<any>{
    return this.http.get(`${environment.url}/api/Event/GetEvents?AnnouncerId=${model}`);
  }


 getalleventsbyCategoryName(model:any):Observable<any>{
    return this.http.get(`${environment.url}/api/Event/GetEvents?CategoryName=${model}`);
  }

  

  geteventtbyid(id:any):Observable<any>{
    return this.http.get(`${environment.url}/api/Event/${id}`);
  }


  getallevents():Observable<any>{
    return this.http.get(`${environment.url}/api/Event/GetEvents`);
  }
}

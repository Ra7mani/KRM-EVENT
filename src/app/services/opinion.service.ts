import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  constructor(private http:HttpClient) { }

  getopinionbyeventid(id: any): Observable<any> {
    return this.http.get(`${environment.url}/api/Opinion/byEvent?Eventid=${id}`);
}

  addopinion(model:any):Observable<any>{
    return this.http.post(`${environment.url}/api/Opinion`,model);
  }

  deleteopinion(model:any):Observable<any>{
    return this.http.delete(`${environment.url}/api/Opinion/${model}`);
  }


}

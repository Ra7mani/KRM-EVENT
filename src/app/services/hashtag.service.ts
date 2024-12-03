import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HashtagService {

  constructor(private http : HttpClient) { }


  getallhashtags():Observable<any>{
    return this.http.get(`${environment.url}/api/Hashtag`);
  }
  gethashtagstbyid(id:any):Observable<any>{
    return this.http.get(`${environment.url}/api/Hashtag/${id}`);
  }
}

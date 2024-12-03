import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor( private http :HttpClient) { }

  follow(id :any): Observable<any> {
    return this.http.post(`${environment.url}/api/Follow/${id}`,id);
  }


  unfollow(id :any): Observable<any> {
    return this.http.post(`${environment.url}/api/Follow/Unfollow/${id}`,id);
  }

  getfollowing(id:any): Observable<any> {
    return this.http.get(`${environment.url}/api/Follow/${id}/Following`);
  }
 
  getfollowers(id:any): Observable<any> {
    return this.http.get(`${environment.url}/api/Follow/${id}/Followers`);
  }
  isfollowing(id:any): Observable<any> {
    return this.http.post(`${environment.url}/api/Follow/isFollowing/${id}`,id);
  }
}

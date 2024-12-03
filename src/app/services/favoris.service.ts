import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  constructor(  private http:HttpClient) { }


  addtofavoris( eventId: number): Observable<any> {
    return this.http.post(`${environment.url}/api/Favorite/addToFavorite/${eventId}`,eventId);
  }
  


  deleteFromFavoris(id:any): Observable<any> {
    return this.http.post(`${environment.url}/api/Favorite/RemoveFromFavorite/${id}`,id);
  }
  
  
  


  getallfavoris():Observable<any>{
    return this.http.get(`${environment.url}/api/Favorite/GetAllFavorites`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

 
  
  getallcategories():Observable<any>{
    return this.http.get(`${environment.url}/api/Categories`);
  }
  getcategoriestbyid(id:any):Observable<any>{
    return this.http.get(`${environment.url}/api/Categories/${id}`);
  }
  
 
  
}

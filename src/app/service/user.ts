import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Iuser } from '../models/iuser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class User {
  httpHeaders = {}
constructor(private http:HttpClient){
this.httpHeaders = {
  headers:new HttpHeaders({
    'Content-Type':'application/json',
    // 'Authorization':token
  })
}
}
  AddnewUser(newUser:Iuser):Observable<Iuser>{   //if there a problem in new user
return this.http.post<Iuser>(`${environment.baseUrl}users`,newUser,this.httpHeaders).pipe(retry(2))
  }


}
//http://localhost:3000/users
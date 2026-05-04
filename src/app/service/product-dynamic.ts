import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Iproduct } from '../models/iproduct';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductDynamic {
constructor(private http:HttpClient){

}

getAllproduct():Observable<Iproduct[]>{
return this.http.get<Iproduct[]>(`${environment.baseUrl}products`)
}

getProductById(Id:number | string):Observable<Iproduct>{
  // queryParams
  return this.http.get<Iproduct>(`${environment.baseUrl}products/${Id}`)
}

filterByName(value:string):Observable<Iproduct[]> {
  return this.http.get<Iproduct[]>(`${environment.baseUrl}products?productName=${value}`)
}

addNewProduct(newProduct:Iproduct):Observable<Iproduct>{
  return this.http.post<Iproduct>(`${environment.baseUrl}products`, newProduct).pipe(retry(2))
}

updateProduct(id:number | string, updatedProduct:Iproduct):Observable<Iproduct>{
  return this.http.put<Iproduct>(`${environment.baseUrl}products/${id}`, updatedProduct).pipe(retry(2))
}

deleteProduct(id:number | string):Observable<Iproduct>{
  return this.http.delete<Iproduct>(`${environment.baseUrl}products/${id}`).pipe(retry(2))
}
}

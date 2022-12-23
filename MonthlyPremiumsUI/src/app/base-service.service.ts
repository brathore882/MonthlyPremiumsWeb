import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import config from '../assets/config.json';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected httpClient:HttpClient) { }

  getDeathPremium(params:HttpParams,url:string)
  {
    
  const headerOptions = new HttpHeaders();  
     headerOptions.set('Content-Type', 'application/json');
     return this.httpClient.get(url+'api/Premium/GetPremium', { params: params ,
    headers: headerOptions});
  }
}

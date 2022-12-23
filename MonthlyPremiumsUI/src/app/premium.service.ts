import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from "@angular/common/http";
import { BaseService } from './base-service.service';
import { CalculatePremium } from './Premium.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PremiumService extends BaseService{

  constructor(protected override httpClient:HttpClient)  {super(httpClient); }
  
  getPremium(params:HttpParams):Observable<any> {
    
    return this.getDeathPremium(params,"")
  }
}

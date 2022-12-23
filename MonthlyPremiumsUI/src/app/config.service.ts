import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
public get appConfig(): any {
  return this._appConfig;
}

public set appConfig(value: any) {
  this._appConfig = value;
}

private _appConfig: any;
  baseUrl!: string;

  constructor( private _httpClient: HttpClient) {
    console.log('constructor app-config-service'); 
    this.loadAppConfig();
}

public loadAppConfig(): Promise<any> { 
  return firstValueFrom(this._httpClient.get('../assets/config.json'))
  .then(result => {    
   this.appConfig = result;
   return Promise.resolve(result);});
  }


  public loadAppConfigData():Observable<any> { 
    return this._httpClient.get('../assets/config.json');   
    }

}

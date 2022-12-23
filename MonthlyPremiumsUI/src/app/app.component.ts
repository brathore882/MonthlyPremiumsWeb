import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CalculatePremium } from './Premium.model';
import { PremiumService } from './premium.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public birthdate: any;
  public age: number | undefined;
  public deathPremium: any;
  isSubmitted = false;
  submitted = false;

  Occupations = {'Cleaner':'Light Manual', 'Doctor':'Professional', 'Author':'White Collar', 'Farmer':'Heavy Manual'
  , 'Mechanic':'Heavy Manual', 'Florist':'Light Manual' }
  showAge: any ;
 
  constructor(public fb: FormBuilder,private httpPremiumService:PremiumService,private http: HttpClient) {}
  registrationForm = this.fb.group({
    OccupationType: ['', [Validators.required]],    
    SumInsured: ['', [Validators.required]],   
    DateofBirth: ['', [Validators.required]],
    Name: ['', [Validators.required]],
  });
  
  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }
  changeOccupation(e: any) {
    this.submitted = true;
    if (this.registrationForm.invalid) 
    {
      return;
    }else{
       
        
    this.calculateAge();

    this.postPremium(e);}
  
  }
   calculateAge() {
    
    if (this.age) {
      const convertAge = new Date(this.age);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
  }
  private postPremium(e: any) {
    let params = new HttpParams();
    params = params.append('Age', this.showAge);
    params = params.append('SumInsured', this.registrationForm.get('SumInsured')?.value);
    params = params.append('OccupatioRating', e.target.value);
    this.loadAppConfigData().subscribe(url=>{
      
      this.httpPremiumService.getDeathPremium(params,url.apiUrl).subscribe(
        data =>{ 
          this.deathPremium=data;
        }
        ); 
    })
    
  }
  public loadAppConfigData():Observable<any> { 
    return this.http.get('../assets/config.json');   
    }

  // Access formcontrols getter
  get OccupationType() {
    return this.registrationForm.get('OccupationType');
  }
  
}
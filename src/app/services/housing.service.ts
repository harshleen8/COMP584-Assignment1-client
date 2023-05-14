import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { IProperty } from '../model/iproperty';
import { Property } from '../model/property';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + '/api/City');
}

  getProperty(id: number): Observable<Property | undefined>  {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        //throw new Error('some error');
        return propertiesArray.find(p => p.Id === id);
      })
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<Property> = [];
        const localProperties = JSON.parse(localStorage['newProp'] || 'null');
        if(localProperties){
          for(const id in localProperties){
            if(SellRent){
            if(localProperties.hasOwnProperty(id) && localProperties[id].SellRent == SellRent){
              propertiesArray.push(localProperties[id]);
            }
          } else{
            propertiesArray.push(localProperties[id]);
          }
          }
        }

        for (const id in data) {
          if(SellRent){
          if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            propertiesArray.push(data[id]);
          }
        }else{
          propertiesArray.push(data[id]);
        }
        }
        return propertiesArray;
      })
    );
    return this.http.get<Property[]>('data/properties.json');
  }
  addProperty(property: Property) {
    let newProp = [property];
    const id = localStorage.getItem('newProp');
    if(id){
      newProp = [property,
        ...JSON.parse(id)]
    }
    localStorage.setItem('newProp',JSON.stringify(newProp));
  }
  newPropID() {
    const pid = localStorage.getItem('PID');
    if (pid != null) {
      localStorage.setItem('PID', String(+pid + 1));
      return +pid;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

}

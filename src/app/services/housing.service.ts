import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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

  getProperty(id: number): Observable<Property | undefined> {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.Id === id);
      })
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<Property> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp') || 'null');

        if (localProperties) {
          for (const id in localProperties) {
            if (localProperties.hasOwnProperty(id)) {
              if (SellRent) {
                if (localProperties[id].SellRent === SellRent) {
                  propertiesArray.push(localProperties[id]);
                }
              } else {
                propertiesArray.push(localProperties[id]);
              }
            }
          }
        }

        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            if (SellRent) {
              if (data[id].SellRent === SellRent) {
                propertiesArray.push(data[id]);
              }
            } else {
              propertiesArray.push(data[id]);
            }
          }
        }

        return propertiesArray;
      })
    );
  }

  addProperty(property: Property) {
    const httpOptions = {
        headers: new HttpHeaders({
            Authorization: 'Bearer '+ localStorage.getItem('token')
        })
    };
    return this.http.post(this.baseUrl + '/api/property/add', property, httpOptions);
}

  newPropID() {
    const pid = localStorage.getItem('PID');

    if (pid !== null) {
      localStorage.setItem('PID', String(+pid + 1));
      return +pid;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { environment } from '../environment/environment.prod';

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
        return propertiesArray.find(p => p.id === id);
      })
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseUrl + '/getProperties');
  }

  addProperty(property: Property): Observable<any> {

    return this.http.post(this.baseUrl + '/api/property/add', property);
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

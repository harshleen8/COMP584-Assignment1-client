import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, filter, Observable, of, take } from 'rxjs';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

constructor(private router: Router, private housingService: HousingService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Property | Observable<Property> | Promise<Property> {
  const propId = route.params['id'];
  return this.housingService.getProperty(+propId)
    .pipe(
      catchError(() => {
        this.router.navigate(['/']);
        return of(null); // return an observable of undefined to satisfy the return type
      }),
      filter((property: any) => !!property), // filter out undefined property
      take(1), // take only the first emitted value
    );
}




}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { PropertyListComponent } from './property-list/property-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'property-card', component: PropertyCardComponent, pathMatch: 'full' },
  { path: 'property-list', component: PropertyListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

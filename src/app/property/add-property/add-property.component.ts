import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { map } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Properties } from './Property';

class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs!: TabsetComponent;
  addPropertyForm!: FormGroup;
  nextClicked!: boolean;
  property1 = new Property();
  property!: Properties;
  form!: FormGroup;
  id!: number;

  // Will come from masters
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']
  cityList!: any[];

  propertyView: IPropertyBase = {
    Id: 0,
    Name: '',
    Price: 0,
    SellRent: 0,
    PType: '',
    FType: '',
    BHK: 0,
    City: '',
    Address: ''
  };
  http: any;
  country: any;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private housingService: HousingService,
    private alertify: AlertifyService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup(
      {
        name: new FormControl(''),
        SellRent: new FormControl(''),
        PType: new FormControl(''),
        FType: new FormControl(''),
        Price: new FormControl(''),
        BHK: new FormControl(''),
      }
    );

   // this.loadData();

        this.CreateAddPropertyForm();
        this.housingService.getAllCities().subscribe(data => {
          this.cityList = data;
          console.log(data);
      });
  }
  // loadData(): void {
  //   let idParam = this.activatedRoute.snapshot.paramMap.get('id');
  //   let url = environment.baseUrl + `api/Properties/${idParam}`;
  //   this.http.get<Properties>(url).subscribe((result: any) => {
  //     this.property = result;
  //     this.form.patchValue(this.property);
  //   });
  // }

  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1' , Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        City: [null, Validators.required]
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required]
      }),

      AddressInfo: this.fb.group({
        Address: [null, Validators.required]
      }),
      });
  }





//#region <Getter Methods>
  // #region <FormGroups>
      get BasicInfo() {
        return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
      }

      get PriceInfo() {
        return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
      }

      get AddressInfo() {
        return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
      }
  // #endregion

  //#region <Form Controls>
      get SellRent() {
        return this.BasicInfo.controls['SellRent'] as FormControl;
      }

      get BHK() {
        return this.BasicInfo.controls['BHK'] as FormControl;
      }

      get PType() {
        return this.BasicInfo.controls['PType'] as FormControl;
      }

      get FType() {
        return this.BasicInfo.controls['FType'] as FormControl;
      }

      get Name() {
        return this.BasicInfo.controls['Name'] as FormControl;
      }

      get City() {
        return this.BasicInfo.controls['City'] as FormControl;
      }

      get Price() {
        return this.PriceInfo.controls['Price'] as FormControl;
      }

      get Address() {
        return this.AddressInfo.controls['Address'] as FormControl;
      }



  //#endregion
//#endregion

  onBack() {
    this.router.navigate(['/']);
  }
  // Inside AddPropertyComponent class

onFileChange(event: any) {
  const files = event.target.files;
  // Perform necessary logic with the selected files
}


  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();

      try {
        this.housingService.addProperty(this.property1).subscribe({
          next: (data)=> {
            console.log(data);
          },
          error: (error)=> {
            console.log(error);
          }
        });

        this.alertify.success('Congrats, your property listed successfully on our website');

        if (this.SellRent.value === '2') {
          this.router.navigate(['/rent-property']);
        } else {

          this.router.navigate(['/']);
        }
      } catch (error) {
        this.alertify.error('An error occurred while adding the property. Please try again later.');
      }
    } else {
      this.alertify.error('Please review the form and provide all valid entries');
    }
  }

  mapProperty(): void {
    if (this.addPropertyForm.valid) {
      this.property1.Id = this.housingService.newPropID();
      this.property1.SellRent = +this.addPropertyForm.get('BasicInfo.SellRent')?.value;
      this.property1.BHK = this.addPropertyForm.get('BasicInfo.BHK')?.value;
      this.property1.PType = this.addPropertyForm.get('BasicInfo.PType')?.value;
      this.property1.Name = this.addPropertyForm.get('BasicInfo.Name')?.value;
      this.property1.City = this.addPropertyForm.get('BasicInfo.City')?.value;
      this.property1.FType = this.addPropertyForm.get('BasicInfo.FType')?.value;
      this.property1.Price = this.addPropertyForm.get('PriceInfo.Price')?.value;
      this.property1.Address = this.addPropertyForm.get('AddressInfo.Address')?.value;
    }
  }





  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    return true;
  }

  selectTab(NextTabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[NextTabId].active = true;
    }
  }

}

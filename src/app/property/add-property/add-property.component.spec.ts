import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { AddPropertyComponent } from './add-property.component';


describe('AddPropertyComponent', () => {
  let component: AddPropertyComponent;
  let fixture: ComponentFixture<AddPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [AddPropertyComponent],
      providers: [HousingService, AlertifyService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create addPropertyForm with required controls', () => {
    expect(component.addPropertyForm.contains('BasicInfo')).toBeTrue();
    expect(component.addPropertyForm.contains('PriceInfo')).toBeTrue();
    expect(component.addPropertyForm.contains('AddressInfo')).toBeTrue();
    expect(component.addPropertyForm.contains('OtherInfo')).toBeTrue();

    const basicInfo = component.addPropertyForm.get('BasicInfo');
    expect(basicInfo?.get('SellRent')?.hasError('required')).toBeTrue();
    expect(basicInfo?.get('BHK')?.hasError('required')).toBeTrue();
    expect(basicInfo?.get('PType')?.hasError('required')).toBeTrue();
    expect(basicInfo?.get('FType')?.hasError('required')).toBeTrue();
    expect(basicInfo?.get('Name')?.hasError('required')).toBeTrue();
    expect(basicInfo?.get('City')?.hasError('required')).toBeTrue();

    const priceInfo = component.addPropertyForm.get('PriceInfo');
    expect(priceInfo?.get('Price')?.hasError('required')).toBeTrue();
    expect(priceInfo?.get('BuiltArea')?.hasError('required')).toBeTrue();

    const addressInfo = component.addPropertyForm.get('AddressInfo');
    expect(addressInfo?.get('Address')?.hasError('required')).toBeTrue();

    const otherInfo = component.addPropertyForm.get('OtherInfo');
    expect(otherInfo?.get('RTM')?.hasError('required')).toBeTrue();
  });


  it('should set nextClicked to true and navigate to /property-detail when all form tabs are valid and onSubmit is called', () => {
    spyOn(component.router, 'navigate');

    component.nextClicked = false;
    component.SellRent.setValue('1');
    component.BHK.setValue('2');
    component.PType.setValue('House');
    component.FType.setValue('Fully');
    component.Name.setValue('Test property');
    component.City.setValue('Test city');
    component.Price.setValue('100000');
    component.BuiltArea.setValue('100');
    component.Address.setValue('Test address');
    component.RTM.setValue('1');
    component.allTabsValid();
    component.onSubmit();

    expect(component.nextClicked).toBeTrue();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { of } from 'rxjs';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AddPropertyComponent } from './add-property.component';

describe('AddPropertyComponent', () => {
  let component: AddPropertyComponent;
  let fixture: ComponentFixture<AddPropertyComponent>;
  let housingService: HousingService;
  let alertifyService: AlertifyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPropertyComponent, TabsetComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [HousingService, AlertifyService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyComponent);
    component = fixture.componentInstance;
    housingService = TestBed.inject(HousingService);
    alertifyService = TestBed.inject(AlertifyService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the addPropertyForm', () => {
    expect(component.addPropertyForm).toBeDefined();
    expect(component.addPropertyForm.valid).toBeFalsy();
    expect(component.addPropertyForm.get('BasicInfo')).toBeTruthy();
    // Add more expectations for the form initialization
  });

  it('should retrieve all cities on component initialization', () => {
    const mockCities: string[] = ['City 1', 'City 2'];
    spyOn(housingService, 'getAllCities').and.returnValue(of(mockCities));

    component.ngOnInit();

    expect(housingService.getAllCities).toHaveBeenCalled();
    expect(component.cityList).toEqual(mockCities);
  });

  // Add more unit tests for other methods and functionalities of the component

});

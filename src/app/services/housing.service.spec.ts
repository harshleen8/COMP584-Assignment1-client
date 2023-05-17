import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HousingService } from './housing.service';
import { environment } from '../environment/environment';
import { Property } from '../model/property';

describe('HousingService', () => {
  let service: HousingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HousingService]
    });

    service = TestBed.inject(HousingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all cities', () => {
    const mockCities: string[] = ['City 1', 'City 2'];

    service.getAllCities().subscribe((cities: string[]) => {
      expect(cities.length).toBe(2);
      expect(cities).toEqual(mockCities);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/api/City`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);
  });

  it('should retrieve a property by ID', () => {
    const mockProperties: Property[] = [
      { Id: 1, Name: 'Property 1', SellRent: 0, PType: '', BHK: 0, FType: '', Price: 0, Address: '', City: '' },
      { Id: 2, Name: 'Property 2', SellRent: 1, PType: '', BHK: 0, FType: '', Price: 0, Address: '', City: '' }
    ];

    const propertyId = 2;

    service.getProperty(propertyId).subscribe((property: Property | undefined) => {
      expect(property).toBeDefined();
      expect(property?.Id).toBe(propertyId);
      expect(property?.Name).toBe('Property 2');
    });

    const req = httpMock.expectOne('data/properties.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProperties);
  });

  it('should retrieve all properties', () => {
    const mockProperties: Property[] = [
      { Id: 1, Name: 'Property 1', SellRent: 0, PType: '', BHK: 0, FType: '', Price: 0, Address: '', City: '' },
      { Id: 2, Name: 'Property 2', SellRent: 1, PType: '', BHK: 0, FType: '', Price: 0, Address: '', City: '' }
    ];


    service.getAllProperties().subscribe((properties: Property[]) => {
      expect(properties.length).toBe(2);
      expect(properties).toEqual(mockProperties);
    });

    const req = httpMock.expectOne('data/properties.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProperties);
  });

  it('should add a property', () => {
    const mockProperty: Property = {
      Id: 1, Name: 'New Property',
      SellRent: 0,
      PType: '',
      BHK: 0,
      FType: '',
      Price: 0,
      Address: '',
      City: ''
    };

    service.addProperty(mockProperty).subscribe((response: any) => {
      expect(response).toBeDefined();
      // Add further expectations for the response if needed
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/api/property/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProperty);
    req.flush({});
  });

  // Add more unit tests as needed for the remaining methods

});

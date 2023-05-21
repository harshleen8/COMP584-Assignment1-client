import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HousingService } from './housing.service';
import { environment } from '../environment/environment.prod';
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
      { id: 1, name: 'Property 1', sellRent: 0, PType: '', bhk: 0, FType: '', price: 0, address: '', City: '' },
      { id: 2, name: 'Property 2', sellRent: 1, PType: '', bhk: 0, FType: '', price: 0, address: '', City: '' }
    ];

    const propertyId = 2;

    service.getProperty(propertyId).subscribe((property: Property | undefined) => {
      expect(property).toBeDefined();
      expect(property?.id).toBe(propertyId);
      expect(property?.name).toBe('Property 2');
    });

    const req = httpMock.expectOne('data/properties.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProperties);
  });

  it('should retrieve all properties', () => {
    const mockProperties: Property[] = [
      { id: 1, name: 'Property 1', sellRent: 0, PType: '', bhk: 0, FType: '', price: 0, address: '', City: '' },
      { id: 2, name: 'Property 2', sellRent: 1, PType: '', bhk: 0, FType: '', price: 0, address: '', City: '' }
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
      id: 1, name: 'New Property',
      sellRent: 0,
      PType: '',
      bhk: 0,
      FType: '',
      price: 0,
      address: '',
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

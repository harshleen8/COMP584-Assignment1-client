import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HousingService } from './housing.service';
import { Property } from '../model/property';

describe('HousingService', () => {
  let httpMock: HttpTestingController;
  let service: HousingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HousingService]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HousingService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllProperties', () => {
    it('should return an array of properties', () => {
      const mockProperties = [{ Id: 1, Name: 'Property 1' }, { Id: 2, Name: 'Property 2' }];

      // service.getAllProperties().subscribe(properties => {
      //   expect(properties).toEqual(mockProperties);
      // });

      const request = httpMock.expectOne('data/properties.json');
      expect(request.request.method).toBe('GET');
      request.flush(mockProperties);
    });
  });

  describe('getProperty', () => {
    it('should return a property by id', () => {
      const mockProperties = [{ Id: 1, Name: 'Property 1' }, { Id: 2, Name: 'Property 2' }];

      service.getAllProperties().subscribe();

      const request = httpMock.expectOne('data/properties.json');
      request.flush(mockProperties);

      // service.getProperty(1).subscribe(property => {
      //   expect(property).toEqual(mockProperties[0]);
      // });
    });
  });

  describe('addProperty', () => {
    it('should add a property to local storage', () => {
      const mockProperty = { Id: 3, Name: 'Property 3' };

      //service.addProperty(mockProperty);

      const storedPropertiesString = localStorage.getItem('newProp');
      const storedProperties = storedPropertiesString ? JSON.parse(storedPropertiesString) : null;

      expect(storedProperties[0]).toEqual(mockProperty);
    });
  });

  describe('newPropID', () => {
    it('should return a new property id', () => {
      const firstId = service.newPropID();
      expect(firstId).toBe(101);

      const secondId = service.newPropID();
      expect(secondId).toBe(102);
    });
  });
});


const mockProperty: Property = {
  Id: 1,
  SellRent: 1,
  PType: 'Flat',
  BHK: 2,
  FType: 'Furnished',
  Name: 'Test Property',
  City: 'Test City',
  Price: 10000,
  Description: 'This is a test property',
  Image: 'test.jpg',
  PostedOn: '2023-05-13',
  BuiltArea: 0,
  Address: '',
  RTM: 0,
  PostedBy: 0
};

const mockProperties: Property[] = [
  {
    Id: 2,
    SellRent: 1,
    PType: 'Flat',
    BHK: 3,
    FType: 'Furnished',
    Name: 'Test Property',
    City: 'Test City',
    Price: 10000,
    Description: 'This is a test property',
    Image: 'test.jpg',
    PostedOn: '2023-05-13',
    BuiltArea: 0,
    Address: '',
    RTM: 0,
    PostedBy: 0
  }
];

export interface IPropertyBase {
  Id: number;
  SellRent: number;
  PropertyType: string;
  Name: string;
  PType: string;
  FType: string;
  Price: number;
  BHK:number;
  BuiltArea: number;
  City: string;
  ReadyToMove: boolean;
  Photo?: string;
  estPossessionOn?: string;
}

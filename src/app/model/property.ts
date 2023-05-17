import { IPropertyBase } from './ipropertybase';

export class Property implements IPropertyBase {
  Id!: number;
  SellRent!: number;
  Name!: string;
  PType!: string;
  BHK!: number;
  FType!: string;
  Price!: number;
  Address!: string;
  City!: string;
  Image?: string;
}

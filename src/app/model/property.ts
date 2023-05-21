import { IPropertyBase } from './ipropertybase';

export class Property implements IPropertyBase {
  id!: number;
  sellRent!: number;
  name!: string;
  PType!: string;
  bhk!: number;
  FType!: string;
  price!: number;
  address!: string;
  City!: string;
  Image?: string;
}

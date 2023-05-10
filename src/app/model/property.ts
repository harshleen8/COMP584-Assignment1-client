import { IPropertyBase } from './ipropertybase';

export class Property implements IPropertyBase {
  Id!: number;
  SellRent!: number;
  PropertyType!: string;
  Name!: string;
  PType!: string;
  FType!: string;
  Price!: number;
  BHK!: number;
  BuiltArea!: number;
  City!: string;
  ReadyToMove!: boolean;
  Photo?: string | undefined;
  estPossessionOn?: string | undefined;
  Address?: string;
  Address2?: string;
  FloorNo!:string;

    TotalFloor?: string;
    RTM!: boolean;
    AOP?: string;
    MainEntrance?: string;
    Security?: number;
    Gated?: boolean;
    Maintenance?: number;
    Possession?: string;
    Image?: string;
    Description?: string;



}
